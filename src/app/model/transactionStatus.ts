export interface TransactionStatus {
  status: string;
  claimedDate: Date;
  claimStartDate: Date;
  claimEndDate: Date;
  isScanneded: boolean;
  scannededAt: Date;
  canBeAccepted: boolean;
}
