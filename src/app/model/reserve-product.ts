export class ReserveProduct {
  ordruid: string;
  prdid: number;
  name: string;
  qty: number;
  description: string;
  unitPrice: number;
  disPrice: number;
  regPrice: number;
  mspMarkup: number;
  imagePath: string;
  utcTime: string;
  lat: number;
  lng: number;
  takeOut?: boolean;
  specialRequirements?: string;
}
