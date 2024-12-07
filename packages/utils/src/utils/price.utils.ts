import { DexNumber } from '@dex-toolkit/number'
import type { PoolReserve, Token } from '@dex-toolkit/types'
import type { Address } from '@ethereum-multicall/types'

import { isSameAddress } from './address.utils'
import { DexError, ErrorCodes } from '../errors'

/**
 * Calculates the price of a token in terms of another token based on pool reserves.
 *
 * @param token The token to price
 * @param baseToken The token to price against (e.g., USDT)
 * @param poolReserves The reserves of the pool
 * @returns The price of the token in terms of the base token
 */
export function calculateTokenPrice(
  token: Token,
  baseToken: Token,
  poolReserves: PoolReserve,
): DexNumber {
  const { token0, token1 } = poolReserves

  if (
    !isSameAddress(token0.address, token.contractAddress) &&
    !isSameAddress(token1.address, token.contractAddress)
  ) {
    throw new DexError(
      'Token not found in pool reserves',
      ErrorCodes.tokenNotFoundInReserves,
    )
  }

  if (
    !isSameAddress(token0.address, baseToken.contractAddress) &&
    !isSameAddress(token1.address, baseToken.contractAddress)
  ) {
    throw new DexError(
      'Base token not found in pool reserves',
      ErrorCodes.tokenNotFoundInReserves,
    )
  }

  const tokenReserve = isSameAddress(token0.address, token.contractAddress)
    ? token0.reserve
    : token1.reserve
  const baseTokenReserve = isSameAddress(
    token0.address,
    baseToken.contractAddress,
  )
    ? token0.reserve
    : token1.reserve

  return baseTokenReserve.dividedBy(tokenReserve)
}

/**
 * Fetches the price of a token using a route through multiple pools if necessary.
 *
 * @param token The token to price
 * @param baseToken The token to price against (e.g., USDT)
 * @param allPoolReserves All available pool reserves
 * @param maxHops Maximum number of hops to consider (default: 3)
 * @returns The price of the token in terms of the base token
 */
export function getTokenPrice(
  token: Token,
  baseToken: Token,
  allPoolReserves: PoolReserve[],
  maxHops: number = 3,
): DexNumber {
  // Direct pair exists
  const directPool = allPoolReserves.find(
    (pool) =>
      (isSameAddress(pool.token0.address, token.contractAddress) &&
        isSameAddress(pool.token1.address, baseToken.contractAddress)) ||
      (isSameAddress(pool.token1.address, token.contractAddress) &&
        isSameAddress(pool.token0.address, baseToken.contractAddress)),
  )

  if (directPool) {
    return calculateTokenPrice(token, baseToken, directPool)
  }

  // No direct pair, search for routes
  function findRoute(
    currentToken: Token,
    route: PoolReserve[],
    depth: number,
  ): DexNumber | null {
    if (depth >= maxHops) return null

    for (const pool of allPoolReserves) {
      // Skip if we've already used this pool
      if (route.includes(pool)) continue

      // Determine if current token matches either side of the pool
      if (
        !isSameAddress(pool.token0.address, currentToken.contractAddress) &&
        !isSameAddress(pool.token1.address, currentToken.contractAddress)
      ) {
        continue
      }

      // Determine next token based on current token's position
      const nextToken = isSameAddress(
        pool.token0.address,
        currentToken.contractAddress,
      )
        ? ({ contractAddress: pool.token1.address } as Token)
        : ({ contractAddress: pool.token0.address } as Token)

      // Found path to base token
      if (isSameAddress(nextToken.contractAddress, baseToken.contractAddress)) {
        return route.reduce(
          (acc, poolInPath) => {
            const price = calculateTokenPrice(
              { contractAddress: poolInPath.token0.address } as Token,
              { contractAddress: poolInPath.token1.address } as Token,
              poolInPath,
            )
            return acc.multipliedBy(price)
          },
          calculateTokenPrice(currentToken, nextToken, pool),
        )
      }

      // Continue searching
      const result = findRoute(nextToken, [...route, pool], depth + 1)
      if (result !== null) return result
    }

    return null
  }

  const price = findRoute(token, [], 0)
  if (price !== null) return price

  throw new DexError(
    'No route found to calculate token price',
    ErrorCodes.noRoutesFound,
  )
}

/**
 * Updates the multicall context to include reserve fetching for price calculation.
 *
 * @param context The existing multicall context
 * @param token The token to price
 * @param baseToken The token to price against (e.g., USDT)
 * @param factoryAddress The factory contract address
 * @returns Updated multicall context
 */
export function addReservesFetchToMulticallContext(
  context: any, // Replace 'any' with your actual MulticallContext type
  token: Token,
  baseToken: Token,
  factoryAddress: Address,
): any {
  // Replace 'any' with your actual MulticallContext type
  // This is a simplified version. You'll need to adjust based on your actual multicall implementation
  context.calls.push({
    reference: `getReserves-${token.contractAddress}-${baseToken.contractAddress}`,
    methodName: 'getPair',
    methodParameters: [token.contractAddress, baseToken.contractAddress],
    contractAddress: factoryAddress,
  })

  return context
}
