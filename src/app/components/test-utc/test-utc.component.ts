import { Component, ChangeDetectionStrategy,OnInit,ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import { timer } from 'rxjs/observable/timer';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product'
import {AuthService} from '../../service/auth.service';
import * as moment from 'moment';
import {FeaturedDataSource} from '../../service/featured-data-source';
import {Category} from '../../model/category';

import {WindowRef} from '../../service/window.service';

import {BannerCtrlDirective} from '../bannerCtrl/banner-ctrl.directive';

@Component({
  selector: 'app-test-utc',
  templateUrl: './test-utc.component.html',
  styleUrls: ['./test-utc.component.scss']
})
export class TestUtcComponent implements OnInit{
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;
  products:Product[]  = [];
  isUP:boolean = false;
  caragories:Category[];
  page=0;
  pageSize = 5
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  subCatagory:number|string = 0;
  lat:number = 0;
  lng:number = 0;
  distance:number = 0;
  utcTime:string;
  //ds:FeaturedDataSource = new FeaturedDataSource(this.prdctService,0);
  
  constructor(private winRef:WindowRef,private router:Router, private route: ActivatedRoute,private prdctService:ProductService,private authService:AuthService) { }
  ngOnInit() {
    this.utcTime = "'" + this.getUTC() + "'";
    this.route.data
      .subscribe((data: { categories: Category[] }) => {
        this.caragories = data.categories;
        this.loadFirstTime();
        this.loadJobs();
        
        //console.log("shops " + data.shops.length);
      });
      
  }
  loadFirstTime() {
   
      
      //console.log(elementPosition,bottomPosition)
      
        this.prdctService.listProductsHomeUTC(this.utcTime, this.distance,this.lat,this.lng,this.subCatagory,"", "desc",this.page, this.pageSize).subscribe(
          respPrdts => {
            this.products.push(...respPrdts)
                //this.shouldLoad = true;
                this.page =1;
              
          },
          err => console.log(err)
        );
     
  }
  loadJobs() {
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor ? this.anchor.nativeElement.offsetTop : 0;
      //console.log(elementPosition,bottomPosition)
      if (bottomPosition > elementPosition && this.shouldLoad && !this.reachedPageEnd) {
        this.shouldLoad = false;
        this.prdctService.listProductsHomeUTC(this.utcTime,this.distance,this.lat,this.lng,this.subCatagory,"", "desc",this.page, this.pageSize).subscribe(
          respPrdts => {

            if (this.products) {

              this.shouldLoad = respPrdts.length > 0 ? true : false;

              if (respPrdts.length > 0) {

                this.products.push(...respPrdts)
                //this.shouldLoad = true;
                this.page = this.page + 1;
               
              }

            }
          },
          err => console.log(err)
        );
      }
    }
  }
  ngAfterViewChecked(){

    }
  isIE() {
    const match = this.winRef.nativeWindow.navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
    let isIE = false;

    if (match !== -1) {
        isIE = true;
    }

    return isIE;
}
  isLoggedIn(){
    
    return this.authService.isLoggedIn();
  }
  searchByLocation(distance:number){
    this.distance = distance;
    this.lat = this.authService.currentLat;
    this.lng = this.authService.currentLong;
    this.page = 0;
    this.products  = [];
    this.loadFirstTime();  
  }
  searchByCtgry(id:number|string){
 
     this.subCatagory = id; 
     this.page = 0;
     this.products  = [];
     this.loadFirstTime();   
  }
  searchUTC(utcString:string){
    this.utcTime = utcString;
    this.page = 0;
    this.products  = [];
    this.loadFirstTime();  
  }
  getUTC(){
    return moment.utc().format("YYYY-MM-DD HH:mm:ss");
  }
  gotoCart(){
    this.router.navigate(['cart']);
  }

}

