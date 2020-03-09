import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  AfterViewChecked,
  ElementRef
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { timer } from "rxjs/observable/timer";
import { ProductService } from "../../service/product.service";
import { Product } from "../../model/product";
import { AuthService } from "../../service/auth.service";
import * as moment from "moment";
import { FeaturedDataSource } from "../../service/featured-data-source";
import { Category } from "../../model/category";

import { WindowRef } from "../../service/window.service";

import { BannerCtrlDirective } from "../bannerCtrl/banner-ctrl.directive";
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("anchor") anchor: ElementRef<HTMLElement>;
  products: any = [];
  products1: any = [];
  products2: any = []
    ; isUP: boolean = false;
  caragories: Category[];
  page = 1;
  pageSize = 6;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  subCatagory: number | string = 0;
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  //ds:FeaturedDataSource = new FeaturedDataSource(this.prdctService,0);
  companies;
  productProject=[]
  constructor(
    private winRef: WindowRef,
    private router: Router,
    private route: ActivatedRoute,
    private prdctService: ProductService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.caragories = data.categories;
      this.loadFirstTime();
      this.loadJobs();
      //console.log("shops " + data.shops.length);
    });
    //this.products1 = this.products;

  }

  
  loadFirstTime() {
    //console.log(elementPosition,bottomPosition)

    this.prdctService.listCompaniesProducts(1).subscribe(
      company => {
        // console.log(company,'company')
        this.companies = company;
        this.page = this.page+1;
        // this.companies.map(item =>{
        //   this.fetchProductForCompany(item.userId,item.companyName)
        // })

      }
    )

    // this.prdctService
    //   .listProductsHomeA(
    //     this.distance,
    //     this.lat,
    //     this.lng,
    //     this.subCatagory,
    //     "",
    //     "desc",
    //     this.page,
    //     this.pageSize
    //   )
    //   .subscribe(
    //     respPrdts => {
    //       // console.log(respPrdts);
    //       //@ts-ignore
    //       this.products.push(...respPrdts);
    //       //this.shouldLoad = true;
    //       // this.page = 1;
    //       this.products2 = this.products.slice(0, 6)
    //       this.products1 = this.products.slice(2, 7)
    //     },
    //     err => console.log(err)
    //   );
  }

  buttonClickScroll(){
    var rightPosition = window.innerHeight + window.pageYOffset;
    // console.log(rightPosition)
    var elementPosition = this.anchor
        ? this.anchor.nativeElement.offsetTop
        : 0;
    var toPosition = window.innerWidth + window.pageXOffset+1;
    window.scrollTo(elementPosition -10, rightPosition)
  }
  loadJobs() {
    window.onscroll = () => {
      var bottomPosition = window.innerHeight + window.pageYOffset;
      var elementPosition = this.anchor
        ? this.anchor.nativeElement.offsetTop
        : 0;
      // console.log(elementPosition,bottomPosition);    
      if (
        bottomPosition > elementPosition &&
        this.shouldLoad &&
        !this.reachedPageEnd
      ) {
        console.log(this.page)
        this.shouldLoad = false;
        this.prdctService.listCompaniesProducts(this.page).subscribe(
          company => {
            //@ts-ignore
            this.companies.push(...company);
            this.page = this.page+1;
          }
        )
       
        // this.prdctService
        //   .listProductsHomeA(
        //     this.distance,
        //     this.lat,
        //     this.lng,
        //     this.subCatagory,
        //     "",
        //     "desc",
        //     this.page,
        //     this.pageSize
        //   )
        //   .subscribe(
        //     respPrdts => {
        //       if (this.products) {
        //         this.shouldLoad = respPrdts.length > 0 ? true : false;
        //         if (respPrdts.length > 0) {
        //           this.products.push(...respPrdts);
        //           //this.shouldLoad = true;
        //           this.page = this.page + 1;
        //         }
        //       }
        //     },
        //     err => console.log(err)
        //   );
      }
     };
  }
  ngAfterViewChecked() { }
  isIE() {
    const match = this.winRef.nativeWindow.navigator.userAgent.search(
      /(?:Edge|MSIE|Trident\/.*; rv:)/
    );
    let isIE = false;

    if (match !== -1) {
      isIE = true;
    }

    return isIE;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  searchByLocation(distance: number) {
    this.distance = distance;
    this.lat = this.authService.currentLat;
    this.lng = this.authService.currentLong;
    this.page = 0;
    this.products = [];
    this.loadFirstTime();
  }
  searchByCtgry(id: number | string) {
    this.subCatagory = id;
    this.page = 0;
    this.products = [];
    this.loadFirstTime();
  }
  gotoCart() {
    this.router.navigate(["cart"]);
  }
}
