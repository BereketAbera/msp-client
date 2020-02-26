
export interface QrCodeData {
    transactionId?:number;
    firstName?:string;
    lastName?:string;
    email?:string;
    productName?:string;
    normalPrice?:number;
    discountPrice?:number;
    quantity?:Number;
    status?:string;
    qrCode?:string;
    claimedDate?:Date
    claimEndDate?:Date;
    message?:string;
    success?:boolean;
    code?:number;
  }