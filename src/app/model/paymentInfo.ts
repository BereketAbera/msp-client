import { CreditCard } from "../model/creditCard";
export interface PaymentInfo {
  ordrGuid: string;
  balance: number;
  total: number;
  savings: number;
  savedCreditCard: boolean;
  creditCards: CreditCard[];
}
