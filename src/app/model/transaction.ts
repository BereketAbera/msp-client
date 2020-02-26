export class Transaction {
    id:number;
    productId:number;
    quantity:number;
    status:number;
    purchaseTime:string;
    pickupStartTime:string;
    pickupEndTime:string;
    discountedPrice:number;
    isScanneded:boolean;
    product:any;
}
