import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  name: string;
  address: string;
  distance: number;
  shopInfo: string;
  city:string;
  constructor(private router: Router, private prdService: ProductService) {
    //his.name = this.product.name;
  }
  navdetail(product: Product) {
    this.router.navigate(["/deal", product.id]);
  }
  ngOnInit() {
    //if(this.product){
      //this.prdService.getShopInfo(this.product.id, 40.712776, -74.005974).subscribe(rslt => {
        //this.address = rslt.address;
        //this.distance = rslt.distance;
        //this.city = rslt.city;
        //this.shopInfo = this.city + " " + this.distance + " mi";
      //});
    //}
    //console.log(this.product.id);
  }
  getShopInfo(prdId:number){
    
    this.prdService.getShopInfo(prdId, 40.712776, -74.005974).subscribe(rslt => {
      this.address = rslt.address;
      this.distance = rslt.distance;
      this.shopInfo = this.address + " " + this.distance + " mi";
    });
    
  }
  ngAfterViewChecked() {

  }

}
