export class UniswapPairSettings {
  slippage: number;
  deadlineMinutes: number;
  disableMultihops: boolean;

  constructor(settings?: {
    slippage?: number | undefined;
    deadlineMinutes?: number | undefined;
    disableMultihops?: boolean | undefined;
  }) {
    this.slippage = settings?.slippage || 0.005;
    this.deadlineMinutes = settings?.deadlineMinutes || 20;
    this.disableMultihops = settings?.disableMultihops || false;
  }
}
