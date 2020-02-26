import {Shop} from './shop';
export class Product {
    id:number;
    name:string;
    unit:string;
    categoryId:number;
    shop:Shop;
    normalPrice:number;
    discountPrice:number;
    discountPersent:number;
    quantity:number;
    quantityOnHand:number;
    offerStartTime:Date;
    offerStartDate:Date;
    offerEndTime:Date;
    pickupStartTime:Date;
    pickupEndTime:Date;
    offerEndDate:Date;
    talguuMarkup:number;
    showNow:boolean;
    modToday:number;
    tueToday:number;
    thuToday:number;
    wedToday:number;
    friToday:number;
    satToday:number;
    sunToday:number;
    imagePath:string;
    imageInfo:any;
    description:string;
    city:string;
    address:string;
    shopName:string;
}
