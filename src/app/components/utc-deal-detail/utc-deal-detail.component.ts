import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import { Product } from '../../model/product'

import { DataStorageService } from '../../service/data-storage.service';

import {CartService} from '../../service/cart.service';
import { ReserveProduct } from '../../model/reserve-product';
import {Order} from '../../model/order';
import {Markup} from '../../model/markup';

import {CartExpiredDialogComponent} from '../cart-expired-dialog/cart-expired-dialog.component';

import * as moment from 'moment';

@Component({
  selector: 'app-utc-deal-detail',
  templateUrl: './utc-deal-detail.component.html',
  styleUrls: ['./utc-deal-detail.component.scss']
})
export class UtcDealDetailComponent implements OnInit {
  product: Product;
  markup:Markup;
  utcTime:string;
  buyForm = this.fb.group({
    quantity: ["1", Validators.required]
  });
  constructor(public dialog: MatDialog,private cartService:CartService,  private dsSerive: DataStorageService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { product: Product,mspMarkup: Markup}) => {
        this.product = data.product;
        this.markup = data.mspMarkup;
        this.product.quantityOnHand = this.getTodaysQuantityOnHand();
        var date = new Date();
        let offerEndTime = new Date(moment(this.product.offerEndTime).format('YYYY-MM-DD HH:mm:ss'));
        let offerStartTime = new Date(moment(this.product.offerStartTime).format('YYYY-MM-DD HH:mm:ss'));
        let newEndDate =  new Date((new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate(),offerEndTime.getHours(),offerEndTime.getMinutes(),0);
        let newStartDate =  new Date((new Date()).getFullYear(),(new Date()).getMonth(),(new Date()).getDate(),offerStartTime.getHours(),offerStartTime.getMinutes(),0);
        if(this.product.shop.state != "AZ"){
          this.showFarFarmYouDialog();
        }else if(newEndDate.getTime() <= (new Date()).getTime()){
          this.showDeadlineDialog();
        }else if(newStartDate.getTime() > (new Date()).getTime()){
          this.showReservationNotStartedDialog();
        }
        this.utcTime = this.route.snapshot.params.utctime;
      });
  }
  gotoCart(){
    this.router.navigate(['../../cart'])
  }
  cancel(){
    this.router.navigate(['../test']);
  }
  showResetDialog(){
    Promise.resolve().then(() => { 
		const dialogRef = this.dialog.open(CartExpiredDialogComponent,{
			width: '250px',
			data: {title: "Cart Time Expired", message: "Sorry, your shopping cart time limit of ten minutes has expired"}
		  });
		dialogRef.afterClosed().subscribe(result => {
			  this.cartService.resetCart();
			  this.router.navigate(['../']);
      });
    })
  }
  showFarFarmYouDialog(){
    Promise.resolve().then(() => { 
		const dialogRef = this.dialog.open(CartExpiredDialogComponent,{
			width: '250px',
			data: {title: "", message: "Sorry, store too far from you."}
		  });
		dialogRef.afterClosed().subscribe(result => {
			   this.router.navigate(['../']);
      });
    });
  }
  showDeadlineDialog(){
    Promise.resolve().then(() => { 
		const dialogRef = this.dialog.open(CartExpiredDialogComponent,{
			width: '250px',
			data: {title: "", message: "Sorry, Reservation Deadline has expired. Check back again tomorrow."}
		  });
		dialogRef.afterClosed().subscribe(result => {
			  this.cartService.resetCart();
			  this.router.navigate(['../']);
      });
    });
  }
  showReservationNotStartedDialog(){
    Promise.resolve().then(() => { 
		const dialogRef = this.dialog.open(CartExpiredDialogComponent,{
			width: '250px',
			data: {title: "", message: "Sorry, Reservation not started yet."}
		  });
		dialogRef.afterClosed().subscribe(result => {
			  this.cartService.resetCart();
			  this.router.navigate(['../']);
      });
    });
	}
  addToCart(){
    if(this.cartService.isCartExpired()){
      this.cartService.resetCart();
		}
    let a: Order;
    if (this.product.quantityOnHand >= this.buyForm.get('quantity').value && this.buyForm.get('quantity').value > 0 ) {
     
      a = JSON.parse(localStorage.getItem('msp_cart_items')) || new Order();
      let reserveProduct = new ReserveProduct();
      reserveProduct.ordruid = a.guid;
      reserveProduct.prdid = this.product.id;
      reserveProduct.qty = this.buyForm.get('quantity').value;
      reserveProduct.utcTime = this.utcTime;
      this.cartService.addToCartTest(reserveProduct).subscribe(rsrvdPrd=>{
        if(rsrvdPrd['success']){
          reserveProduct.name = this.product.name;
          reserveProduct.imagePath = this.product.imagePath;
          reserveProduct.description = this.product.description;
          reserveProduct.unitPrice = this.product.discountPrice;
          reserveProduct.regPrice = this.product.normalPrice;
          reserveProduct.disPrice = this.product.discountPrice;
          reserveProduct.mspMarkup = this.markup.mspMarkup;
          reserveProduct.ordruid = rsrvdPrd['guid'];
          this.cartService.addToLocalCart(reserveProduct,rsrvdPrd['guid']);
          this.router.navigate(['../../cart'])
        }else
           alert(rsrvdPrd['messages']);

      })
    } else {
      alert("quantiy can not be less than 0 or greater than " + this.product.quantityOnHand);
    }
  }
  getTodaysQuantityOnHand(){
    var dwn = (new Date()).getDay(); 
    
        if(dwn == 1){
          //query = query + " modInit > 0 and modToday > 0 "
         return this.product.modToday;
       }else if(dwn == 2){
         //query = query + " tueInit > 0 and tueToday > 0 "
         return this.product.tueToday;
       }else if(dwn == 3){
         //query = query + " wedInit > 0 and wedToday > 0 "
         return this.product.wedToday;
       }else if(dwn == 4){
         //query = query + " thuInit > 0 and thuToday > 0 "
         return this.product.thuToday;
       }else if(dwn == 5){
         //query = query + " friInit > 0 and friToday > 0 "
         return this.product.friToday;
       }else if(dwn == 6){
         //query = query + " satInit > 0 and satToday > 0 "
         return this.product.satToday;
  
       }else {
         //query = query + " sunInit > 0 and sunToday > 0 "
         return this.product.sunToday;
  
       }
      
  }
  gotoBuyerAdmin() {
    if (this.product.quantityOnHand >= this.buyForm.get('quantity').value && this.buyForm.get('quantity').value > 0 ) {
      console.log(this.buyForm.get('quantity').value);
      this.dsSerive.selectedProductInfo = {
        productId: this.product.id,
        quantity: this.buyForm.get('quantity').value
      }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "productId": this.product.id,
          "quantity": this.buyForm.get('quantity').value
        }
      };
      this.router.navigate(['/tlgu-byr/payment', this.product.id], navigationExtras);
    } else {
      alert("quantiy can not be less than 0 or greater than " + this.product.quantityOnHand);
    }
  }
  onSubmit() {



  }
}


