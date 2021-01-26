import { ContractContext as RouterContractContext } from '../ABI/types/uniswap-router';
import { ContractContext } from '../common/contract-context';
import { Token } from '../tokens/models/token';
import { UniswapFactoryContext } from './models/uniswap-factory-context';

export class UniswapFactory {
  private _uniswapRouterContract = this._uniswapFactoryContext.ethersProvider.getContract<RouterContractContext>(
    JSON.stringify(ContractContext.routerAbi),
    ContractContext.routerAddress
  );

  constructor(private _uniswapFactoryContext: UniswapFactoryContext) {}

  /**
   * The to token
   */
  public get toToken(): Token {
    return this._uniswapFactoryContext.toToken;
  }

  /**
   * The from token
   */
  public get fromToken(): Token {
    return this._uniswapFactoryContext.fromToken;
  }

  public getTokenTradeAmount(): void {
    // to do!
  }

  public findBestRoute(routes: string[]): void {
    // to do!
  }

  public trade(): void {
    // to do!
  }

  public allowance(ethereumAddress: string): void {
    // to do!
  }

  public generateApproveUniswapAllowanceData(): void {
    // to do!
  }
}
