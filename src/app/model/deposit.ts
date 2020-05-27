import { PaymentInfo } from "./paymentInfo";
export interface Deposit {
  id: number;
  depositeDate: Date;
  amount: number;
  paymentInfo: any;
  paymentInfoId: any;
  type: any;
}
