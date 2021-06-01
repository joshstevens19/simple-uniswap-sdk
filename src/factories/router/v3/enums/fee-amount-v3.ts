export enum FeeAmount {
  LOW = 500,
  MEDIUM = 3000,
  HIGH = 10000,
}

export const feeToPercent = (feeAmount: FeeAmount) => {
  switch (feeAmount) {
    case FeeAmount.LOW:
      return 0.005;
    case FeeAmount.MEDIUM:
      return 0.003;
    case FeeAmount.HIGH:
      return 0.01;
  }
};
