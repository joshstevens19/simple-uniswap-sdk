export enum FeeAmount {
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

export const feeToPercent = (feeAmount: FeeAmount) => {
  switch (feeAmount) {
    case FeeAmount.LOW:
      return 0.0005;
    case FeeAmount.MEDIUM:
      return 0.003;
    case FeeAmount.HIGH:
      return 0.01;
  }
};

export const percentToFeeAmount = (percent: number) => {
  switch (percent) {
    case 0.0005:
      return FeeAmount.LOW;
    case 0.003:
      return FeeAmount.MEDIUM;
    case 0.01:
      return FeeAmount.HIGH;
    default:
      return FeeAmount.MEDIUM;
  }
};
