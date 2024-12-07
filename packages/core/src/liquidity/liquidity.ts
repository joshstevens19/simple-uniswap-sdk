import type {
  AddLiquidityParams,
  AddLiquidityParamsV2,
  AddLiquidityParamsV3,
  DexProtocol,
  InternalLiquidityContext,
  LiquidityContext,
  LiquidityDirection,
  LiquiditySubscription,
  ObservableLiquidityContext,
  RemoveLiquidityParams,
  RemoveLiquidityParamsV2,
  RemoveLiquidityParamsV3,
  TradeFormat,
  TradeFormatOptions,
  TradeFormatValue,
} from '@dex-toolkit/types'
import {
  assertDexTag,
  assertProtocol,
  compareLiquidityContexts,
  deserializeLiquidityContext,
  DexError,
  ErrorCodes,
  formatLiquidityContext,
  formatLiquidityParams,
  isAddLiquidityParamsV2,
  isAddLiquidityParamsV3,
  isLiquidityDirectionAdd,
  isLiquidityDirectionRemove,
  isRemoveLiquidityParamsV2,
  isRemoveLiquidityParamsV3,
  protocolMap,
} from '@dex-toolkit/utils'
import { ethers } from 'ethers'
import { finalize, Observable, Subject } from 'rxjs'
import { v4 as generateId } from 'uuid'

import {
  LiquidityAbstract,
  type LiquidityProtocolArgs,
} from './liquidity.abstract'
import { LiquidityProtocolV2 } from './liquidity.protocol.v2'
import { LiquidityProtocolV3 } from './liquidity.protocol.v3'
import { TokenContract } from '../token-contract'
import { parseTokenListFromTokenListContext } from '../token-list'

/**
 * Represents a liquidity management abstraction for interacting with DEX liquidity pools.
 * This class supports adding and removing liquidity in both V2 and V3 protocols.
 *
 * @template TFormat The type of format used for numeric values in the class methods.
 */
export class Liquidity<
  TFormat extends TradeFormat = 'dexnumber',
> extends LiquidityAbstract<TFormat> {
  protected _liquidityV2?: LiquidityProtocolV2<TFormat>

  protected _liquidityV3?: LiquidityProtocolV3<TFormat>

  protected _lastProcessedBlock: number = 0

  protected _watchingBlocks: boolean = false

  protected _format: TradeFormatOptions<TFormat>

  protected _subscriptions: Map<string, LiquiditySubscription<TFormat>> =
    new Map()

  protected _listener: ethers.providers.Listener

  constructor(args: LiquidityProtocolArgs<TFormat>) {
    super(args)

    const {
      tokenA,
      tokenAContract,
      tokenB,
      tokenBContract,
      dexContext,
      dexProvider,
      walletAddress,
      format,
      multiPriceContext,
      tokenListContext,
      tokens,
    } = args ?? {}

    const tokenList = parseTokenListFromTokenListContext({
      dexProvider: this._dexProvider,
      tokenListContext,
    })

    const protocolContext: LiquidityProtocolArgs<TFormat> = {
      tokenA,
      tokenAContract: this._tokenAContract ?? tokenAContract,
      tokenB,
      tokenBContract: this._tokenBContract ?? tokenBContract,
      walletAddress,
      dexProvider,
      dexContext,
      settings: this._settings,
      format,
      multiPriceContext,
      tokenListContext: tokenList,
      tokens: this._tokens ?? tokens,
    }

    if (
      Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV2,
      ) &&
      this._settings?.protocolSettings?.protocolV2?.enabled
    ) {
      this._liquidityV2 = new LiquidityProtocolV2(protocolContext)
    }

    if (
      Object.values(this._dexConfigsByDex).some(
        (dexConfig) => dexConfig.protocols.protocolV3,
      ) &&
      this._settings?.protocolSettings?.protocolV3?.enabled
    ) {
      this._liquidityV3 = new LiquidityProtocolV3(protocolContext)
    }

    if (!this._liquidityV2 && !this._liquidityV3) {
      throw new DexError(
        'Must have a compatible `protocol` enabled in settings',
        ErrorCodes.functionArgumentError,
      )
    }

    this._format = format ?? { type: 'readable' as TFormat }

    this._listener = (blockNumber) => this.handleNewBlock(blockNumber)
  }

  // ------------------------
  // Getters
  // ------------------------

  /**
   * Getter method for retrieving the token factory for token A.
   *
   * @returns The factory responsible for operations on token A.
   */
  public get tokenAContract(): TokenContract {
    return this._tokenAContract
  }

  /**
   * Getter method for retrieving the token factory for token B.
   *
   * @returns The factory responsible for operations on token B.
   */
  public get tokenBContract(): TokenContract {
    return this._tokenBContract
  }

  /**
   * Getter method for retrieving the liquidity protocol V2 instance.
   *
   * @returns The liquidity protocol V2 instance, if it exists; otherwise, undefined.
   */
  public get protocolV2(): LiquidityProtocolV2<TFormat> | undefined {
    return this._liquidityV2
  }

  /**
   * Getter method for retrieving the liquidity protocol V3 instance.
   *
   * @returns The liquidity protocol V3 instance, if it exists; otherwise, undefined.
   */
  public get protocolV3(): LiquidityProtocolV3<TFormat> | undefined {
    return this._liquidityV3
  }

  // ------------------------
  // Actions
  // ------------------------

  /**
   * Adds liquidity to a DEX.
   * This method generates the necessary liquidity context and starts monitoring block changes.
   */
  public async addLiquidity(
    params: AddLiquidityParams<'decimal'>,
  ): Promise<LiquidityContext<TFormat>> {
    const { dexTag, protocol } = params

    assertDexTag(dexTag)
    assertProtocol(protocol)

    if (!Object.values(protocolMap).includes(protocol)) {
      throw new DexError(
        'Invalid protocol provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const formattedParams = formatLiquidityParams({
      protocol: params.protocol,
      liquidityDirection: 'add',
      tokenA: this._tokenA,
      tokenB: this._tokenB,
      params,
    })

    const context = await this.generateContext({
      protocol: params.protocol,
      liquidityDirection: 'add',
      params: formattedParams,
    })

    return {
      ...formatLiquidityContext(context, this._format),
      ...this.createObservable(context, params),
      execute: this.createExecuteFunction(context),
    }
  }

  /**
   * Removes liquidity from a DEX.
   * This method generates the necessary liquidity context and starts monitoring block changes.
   */
  public async removeLiquidity(
    params: RemoveLiquidityParams<'decimal'>,
  ): Promise<LiquidityContext<TFormat>> {
    const { dexTag, protocol } = params

    assertDexTag(dexTag)
    assertProtocol(protocol)

    if (!Object.values(protocolMap).includes(protocol)) {
      throw new DexError(
        'Invalid protocol provided',
        ErrorCodes.functionArgumentError,
      )
    }

    const formattedParams = formatLiquidityParams({
      protocol: params.protocol,
      liquidityDirection: 'remove',
      tokenA: this._tokenA,
      tokenB: this._tokenB,
      params,
      lpTokenDecimals: this._nativeWrappedTokenInfo.decimals,
    })

    const context = await this.generateContext({
      protocol: params.protocol,
      liquidityDirection: 'remove',
      params: formattedParams,
    })

    return {
      ...formatLiquidityContext(context, this._format),
      ...this.createObservable(context, params),
      execute: this.createExecuteFunction(context),
    }
  }

  // ------------------------
  // Liquidity Context Generation
  // ------------------------

  /**
   * Generate the liquidity context based on the protocol and direction.
   *
   * @param params - The parameters for the liquidity operation.
   * @param params.id - The quote ID.
   * @param params.protocol - The protocol to use for the liquidity.
   * @param params.liquidityDirection - The direction of the liquidity operation.
   * @param params.params - The parameters for the liquidity operation.
   *
   * @returns A promise that resolves to the LiquidityContext.
   *
   * @throws DexError if the protocol is not supported or if the liquidity context could not be generated.
   */
  protected async generateContext<
    TProtocol extends DexProtocol,
    TDirection extends LiquidityDirection,
  >({
    id,
    protocol,
    liquidityDirection,
    params,
  }: {
    id?: string
    protocol: TProtocol
    liquidityDirection: TDirection
    params: TProtocol extends 'protocolV2'
      ? TDirection extends 'add'
        ? AddLiquidityParamsV2<'dexnumber'>
        : RemoveLiquidityParamsV2<'dexnumber'>
      : TProtocol extends 'protocolV3'
        ? TDirection extends 'add'
          ? AddLiquidityParamsV3<'dexnumber'>
          : RemoveLiquidityParamsV3<'dexnumber'>
        : never
  }): Promise<InternalLiquidityContext<'dexnumber'>> {
    assertProtocol(protocol)

    const quoteId = id || generateId()

    try {
      if (isLiquidityDirectionAdd(liquidityDirection)) {
        if (
          this._liquidityV2 &&
          protocol === 'protocolV2' &&
          isAddLiquidityParamsV2(params)
        ) {
          return this._liquidityV2.generateAddContextV2(params, quoteId)
        } else if (
          this._liquidityV3 &&
          protocol === 'protocolV3' &&
          isAddLiquidityParamsV3(params)
        ) {
          return this._liquidityV3.generateAddContextV3(params, quoteId)
        } else {
          throw new DexError(
            'Invalid protocol or parameters for adding liquidity',
            ErrorCodes.functionArgumentError,
          )
        }
      } else if (isLiquidityDirectionRemove(liquidityDirection)) {
        if (
          this._liquidityV2 &&
          protocol === 'protocolV2' &&
          isRemoveLiquidityParamsV2(params)
        ) {
          return this._liquidityV2.generateRemoveContextV2(params, quoteId)
        } else if (
          this._liquidityV3 &&
          protocol === 'protocolV3' &&
          isRemoveLiquidityParamsV3(params)
        ) {
          return this._liquidityV3.generateRemoveContextV3(params, quoteId)
        } else {
          throw new DexError(
            'Invalid protocol or parameters for removing liquidity',
            ErrorCodes.functionArgumentError,
          )
        }
      } else {
        throw new DexError(
          'Invalid liquidity direction',
          ErrorCodes.functionArgumentError,
        )
      }
    } catch (error) {
      throw new DexError(
        'Error generating liquidity context',
        ErrorCodes.internalError,
        { error: error instanceof Error ? error.message : 'Unknown error' },
      )
    }
  }

  // ------------------------
  // Balances
  // ------------------------

  /**
   * Retrieves the balance of token A for the current wallet.
   *
   * @template TFormatOverride - The type of format to override the classes format
   *
   * @param format - The format in which the balance value is returned.
   *
   * @returns A promise resolving to the balance of token A.
   */
  public async getTokenABalanceOf<TFormatOverride extends TFormat = TFormat>(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<TradeFormatValue<TFormatOverride>> {
    return this._tokenAContract.balanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })
  }

  /**
   * Retrieves the balance of token B for the current wallet.
   *
   * @template TFormatOverride - The type of format to override the classes format.
   *
   * @param format - The format in which the balance value is returned.
   *
   * @returns A promise resolving to the balance of token B.
   */
  public async getTokenBBalanceOf<TFormatOverride extends TFormat = TFormat>(
    format?: TradeFormatOptions<TFormatOverride>,
  ): Promise<TradeFormatValue<TFormatOverride>> {
    return this._tokenBContract.balanceOf({
      walletAddress: this._walletAddress,
      format: format || this._format,
    })
  }

  // ------------------------
  // Liquidity Watcher (Block Listener)
  // ------------------------

  /**
   * Manually triggers a requote for a specific subscription.
   * This allows forcing an update of liquidity quotes outside the normal block-based update cycle.
   *
   * @param id - The unique identifier of the subscription to requote
   * @param currentBlockNumber - Optional current block number to include in the update
   * @throws {DexError} If the subscription cannot be processed
   *
   * @example
   * ```typescript
   * // Force an immediate requote for a specific subscription
   * await liquidity.requote("subscription-123", 15372648);
   * ```
   */
  public async requote(id: string, currentBlockNumber?: number): Promise<void> {
    const subscription = this._subscriptions.get(id)

    if (subscription?.isActive) {
      await this.processSubscriptionUpdate(subscription, currentBlockNumber)
    }
  }

  /**
   * Starts watching for new blocks on the blockchain.
   * This sets up an event listener for block updates and manages the watching state.
   * Only starts watching if not already watching blocks.
   *
   * @remarks
   * This is an internal mechanism used to trigger quote updates based on new blocks.
   * The watcher is automatically managed based on active subscriptions.
   */
  protected watchBlocks(): void {
    if (!this._watchingBlocks) {
      this._dexProvider.provider.on('block', this._listener)
      this._watchingBlocks = true
      this._lastProcessedBlock = 0
    }
  }

  /**
   * Stops watching for new blocks on the blockchain.
   * This removes the block event listener and updates the watching state.
   * Only stops watching if currently watching blocks.
   *
   * @remarks
   * This is automatically called when there are no more active subscriptions
   * to prevent unnecessary block processing.
   */
  protected unwatchBlocks(): void {
    if (this._watchingBlocks) {
      this._dexProvider.provider.off('block', this._listener)
      this._watchingBlocks = false
      this._lastProcessedBlock = 0
    }
  }

  /**
   * Sets up a subscription for liquidity quote updates.
   * Creates a new subscription entry with the provided subject and context,
   * and starts block watching if needed.
   *
   * @param params - The subscription setup parameters
   *
   * @remarks
   * The context is cloned to prevent external modifications affecting the internal state.
   * Block watching is started unless explicitly disabled in settings.
   */
  protected setupLiquiditySubscription({
    subject,
    context,
    originParams,
  }: Omit<LiquiditySubscription<TFormat>, 'isActive'>): void {
    const {
      id,
      dexTag,
      protocol,
      version,
      liquidityDirection,
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo,
      shareOfPool,
      expectedShareOfPool,
      prices,
      slippage,
      deadline,
      expectedLiquidity,
      minLiquidity,
      enableTransactions,
      transaction,
    } = context

    const clonedContext = structuredClone({
      id,
      dexTag,
      protocol,
      version,
      liquidityDirection,
      tokenAInfo,
      tokenBInfo,
      lpTokenInfo,
      shareOfPool,
      expectedShareOfPool,
      prices,
      slippage,
      deadline,
      expectedLiquidity,
      minLiquidity,
      enableTransactions,
      transaction,
    })

    this._subscriptions.set(id, {
      subject,
      context: clonedContext,
      isActive: true,
      originParams,
    })

    if (!this._watchingBlocks && !this._settings.disableObserver) {
      this.watchBlocks()
    }
  }

  /**
   * Creates an observable for liquidity quote updates with proper cleanup handling.
   * Sets up the subscription and returns an observable that will emit quote updates,
   * along with an unsubscribe function for manual cleanup.
   *
   * @param context - The initial liquidity context in DexNumber format
   * @returns An object containing:
   * - observer$: The Observable that emits quote updates
   * - unsubscribe: Function to manually clean up the subscription
   *
   * @remarks
   * The observable automatically handles cleanup when unsubscribed using RxJS finalize operator.
   * The context is maintained internally in DexNumber format for accurate comparisons.
   */
  protected createObservable(
    context: InternalLiquidityContext<'dexnumber'>,
    originParams:
      | AddLiquidityParams<'decimal'>
      | RemoveLiquidityParams<'decimal'>,
  ): {
    observer$: Observable<ObservableLiquidityContext<TFormat>>
    unsubscribe: () => void
  } {
    const subject = new Subject<ObservableLiquidityContext<TFormat>>()

    // Set up subscription with DexNumber format internally
    this.setupLiquiditySubscription({
      subject,
      context,
      originParams,
    })

    return {
      observer$: subject.pipe(
        finalize(() => {
          this.cleanupTradeSubscription(context.id)
        }),
      ),
      unsubscribe: () => {
        this.cleanupTradeSubscription(context.id)
      },
    }
  }

  /**
   * Creates a function to execute the liquidity operation.
   * This function handles approvals and main transactions, returning the receipts of each.
   *
   * @param context - The liquidity context to execute
   * @returns A function that executes the liquidity operation
   */
  protected createExecuteFunction(
    context: InternalLiquidityContext<'dexnumber'>,
  ):
    | undefined
    | (({
        approvalConfirmations,
        transactionConfirmations,
      }: {
        approvalConfirmations?: number
        transactionConfirmations?: number
      }) => Promise<{
        approvalReceipts?: ethers.ContractReceipt[]
        transactionReceipt?: ethers.ContractReceipt
      }>) {
    if (!this._dexProvider.signer) {
      return undefined
    }

    return async ({
      approvalConfirmations = 1,
      transactionConfirmations = 1,
    }: {
      approvalConfirmations?: number
      transactionConfirmations?: number
    }) => {
      if (!this._dexProvider.signer) {
        throw new DexError(
          'No signer available. Must provide a signer via dexProvider to execute transactions.',
          ErrorCodes.functionArgumentError,
        )
      }

      // Get the latest subscription data if it exists
      const subscription = this._subscriptions.get(context.id)
      const latestContext = subscription?.context ?? context

      const results: {
        approvalReceipts?: ethers.ContractReceipt[]
        transactionReceipt?: ethers.ContractReceipt
      } = {}

      try {
        // Handle approval transactions
        if (
          latestContext.enableTransactions &&
          Object.keys(latestContext.enableTransactions).length > 0
        ) {
          const approvalPromises: Promise<ethers.ContractReceipt>[] = []

          // Handle TokenA approval
          if (latestContext.enableTransactions.tokenA) {
            approvalPromises.push(
              this._dexProvider.signer
                .sendTransaction(latestContext.enableTransactions.tokenA)
                .then((response) => response.wait(approvalConfirmations)),
            )
          }

          // Handle TokenB approval
          if (latestContext.enableTransactions.tokenB) {
            approvalPromises.push(
              this._dexProvider.signer
                .sendTransaction(latestContext.enableTransactions.tokenB)
                .then((response) => response.wait(approvalConfirmations)),
            )
          }

          // Handle LP token approval
          if (latestContext.enableTransactions.lpToken) {
            approvalPromises.push(
              this._dexProvider.signer
                .sendTransaction(latestContext.enableTransactions.lpToken)
                .then((response) => response.wait(approvalConfirmations)),
            )
          }

          // Wait for all approval transactions to complete
          if (approvalPromises.length > 0) {
            results.approvalReceipts = await Promise.all(approvalPromises)
          }
        }

        // Execute main liquidity transaction using latest context data
        if (latestContext.transaction) {
          const response = await this._dexProvider.signer.sendTransaction(
            latestContext.transaction,
          )
          results.transactionReceipt = await response.wait(
            transactionConfirmations,
          )
        } else {
          throw new DexError(
            'No liquidity transaction available to execute',
            ErrorCodes.internalError,
          )
        }

        return results
      } catch (error) {
        throw new DexError(
          'Failed to execute liquidity transaction',
          ErrorCodes.transactionError,
          {
            context: {
              liquidityDirection: latestContext.liquidityDirection,
              dexTag: latestContext.dexTag,
              protocol: latestContext.protocol,
            },
          },
          error instanceof Error ? error : undefined,
        )
      }
    }
  }

  /**
   * Cleans up a subscription and its resources.
   * Completes the subject, removes the subscription from tracking,
   * and stops block watching if no more active subscriptions exist.
   *
   * @param id - The unique identifier of the subscription to clean up
   *
   * @remarks
   * This is called automatically when:
   * - The observable is unsubscribed
   * - The unsubscribe function is called manually
   * - The subscription is invalidated
   */
  protected cleanupTradeSubscription(id: string): void {
    const subscription = this._subscriptions.get(id)
    if (subscription) {
      subscription.isActive = false
      subscription.subject.complete()
      this._subscriptions.delete(id)
    }

    // If no more active subscriptions, stop watching blocks
    if (!Array.from(this._subscriptions.values()).some((sub) => sub.isActive)) {
      this.unwatchBlocks()
    }
  }

  /**
   * Retrieves the RxJS Subject for a specific quote subscription.
   *
   * @param id - The unique identifier of the subscription
   * @returns The Subject associated with the subscription
   * @throws {DexError} If the subscription is not found
   *
   * @remarks
   * This should never throw in normal operation as subscriptions are created
   * before they're accessed. If it throws, it indicates an internal state issue.
   */
  protected getTradeSubscription(
    id: string,
  ): LiquiditySubscription<TFormat>['subject'] {
    const subscription = this._subscriptions.get(id)

    if (!subscription) {
      throw new DexError(
        'Quote subscription not found',
        ErrorCodes.internalError,
        { id },
      )
    }

    return subscription.subject
  }

  /**
   * Destroys and cleans up all active subscriptions.
   * This provides a way to completely shut down all quote monitoring and free associated resources.
   *
   * @remarks
   * This method:
   * - Completes all subscription subjects
   * - Removes all subscriptions from tracking
   * - Stops the block watcher
   * - Clears all internal subscription state
   */
  public destroy(): void {
    // Complete and clean up all subscriptions
    for (const [id] of this._subscriptions) {
      this.cleanupTradeSubscription(id)
    }

    this._subscriptions.clear()
    this.unwatchBlocks()
  }

  /**
   * Processes an update for a single subscription, generating and emitting new quotes if needed.
   * This is the core update mechanism that generates new liquidity quotes when conditions change.
   *
   * @param subscription - The subscription to process
   * @param currentBlockNumber - Optional block number for the update
   *
   * @remarks
   * The process includes:
   * 1. Checking if the subscription is still active and observed
   * 2. Generating a new context with current data
   * 3. Comparing with previous context to detect changes
   * 4. Formatting and emitting updates if changes are detected
   *
   * The context is maintained in DexNumber format internally for accurate comparisons,
   * but formatted to the user's chosen format before emission.
   *
   * @throws {DexError} If there's an error generating or processing the new context
   */
  protected async processSubscriptionUpdate(
    subscription: LiquiditySubscription<TFormat>,
    currentBlockNumber?: number,
  ): Promise<void> {
    if (!subscription.isActive || !subscription.subject.observed) {
      subscription.isActive = false
      return
    }

    const { subject, context, originParams } = subscription
    const { id, protocol, liquidityDirection } = context

    const formattedParams = formatLiquidityParams({
      protocol,
      liquidityDirection,
      tokenA: this._tokenA,
      tokenB: this._tokenB,
      params: originParams,
    })

    // Generate new context in DexNumber format
    const newContext = await this.generateContext({
      id,
      protocol,
      liquidityDirection,
      params: formattedParams,
    })

    // Compare using DexNumber format
    const isSame = compareLiquidityContexts(
      deserializeLiquidityContext(context),
      newContext,
    )

    if (!isSame) {
      // Format the context according to the user's chosen format before emitting
      const formattedContext = formatLiquidityContext(newContext, this._format)

      subject.next({
        blockNumber: currentBlockNumber,
        latestQuote: formattedContext,
      })
    }
  }

  /**
   * Handles updates when a new block is mined on the blockchain.
   * This is the main entry point for processing subscription updates based on new blocks.
   *
   * @param currentBlockNumber - The number of the new block
   *
   * @remarks
   * The handler includes several optimizations:
   * - Skips processing if there are no active subscriptions
   * - Supports block skipping to reduce update frequency (configured via settings)
   * - Only processes active subscriptions
   * - Processes all active subscriptions in parallel
   *
   * Block skipping behavior:
   * - If observerBlockSkip > 0, updates only occur every N blocks
   * - This helps reduce processing load for applications that don't need
   *   updates on every block
   *
   * Error handling:
   * - Throws if there's an error processing the block
   * - Automatically cleans up block watching if no active subscriptions remain
   *
   * @throws {DexError} If there's an error processing subscription updates
   */
  protected async handleNewBlock(currentBlockNumber: number): Promise<void> {
    // If no active subscriptions, don't process
    if (!this._subscriptions.size) {
      return
    }

    try {
      if (this._settings.observerBlockSkip > 0) {
        // Only process if enough blocks have passed
        if (
          this._lastProcessedBlock === 0 ||
          currentBlockNumber >=
            this._lastProcessedBlock + this._settings.observerBlockSkip
        ) {
          this._lastProcessedBlock = currentBlockNumber
        } else {
          // Skip this block
          return
        }
      }

      // Only process active subscriptions
      const activeSubscriptions = Array.from(
        this._subscriptions.entries(),
      ).filter(([, sub]) => sub.isActive)

      await Promise.all(
        activeSubscriptions.map(([, subscription]) =>
          this.processSubscriptionUpdate(subscription, currentBlockNumber),
        ),
      )
    } catch (error) {
      throw new DexError(
        'Error processing new block',
        ErrorCodes.internalError,
        error as Error,
      )
    }

    // Clean up if no active subscriptions
    if (!Array.from(this._subscriptions.values()).some((sub) => sub.isActive)) {
      this.unwatchBlocks()
    }
  }
}
