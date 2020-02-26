export interface DailySale{
    id:number,
    name:string,
    offeredQty:number,
    soldQty:number,
    picked:number,
    discountedPercentage:number,
    purchaseTime:Date,
    normalPrice:number
}