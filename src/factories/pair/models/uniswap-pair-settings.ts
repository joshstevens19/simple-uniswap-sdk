export class UniswapPairSettings {
  slippage: number;
  deadlineMinutes: number;

  constructor(settings?: {
    slippage?: number | undefined;
    deadlineMinutes?: number | undefined;
  }) {
    this.slippage = settings?.slippage || 0.005;
    this.deadlineMinutes = settings?.deadlineMinutes || 20;
  }
}
