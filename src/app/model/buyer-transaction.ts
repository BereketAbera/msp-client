export interface BuyerTransaction {
  transactionId: number;
  transactionDate: Date;
  credit: number;
  debit: number;
  type: string;
}
