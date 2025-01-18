export enum PaymentStatus {
    PENDING="PENDING",
    COMPLETE="COMPLETE",
    OVERPAID="OVERPAID",
    CANCELED="CANCELED",
}
export interface GetPaymentInfo {
    status: PaymentStatus;
    expectedDepositAmount: number;
    currentDepositAmount: number;
  }