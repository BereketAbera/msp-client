import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-company-products',
  templateUrl: './company-products.component.html',
  styleUrls: ['./company-products.component.scss']
})
export class CompanyProductsComponent implements OnInit {
  @Input() company;
  @ViewChild("anchor") anchor: ElementRef<HTMLElement>;
  page = 0;
  pageSize = 6;
  shouldLoad: boolean = true;
  reachedPageEnd: boolean = false;
  subCatagory: number | string = 0;
  lat: number = 0;
  lng: number = 0;
  distance: number = 0;
  products;
  shown=false;
  navigate =false;
  constructor(private prdctService:ProductService) { }

  ngOnInit() {
    // console.log(this.company,'comps');
    
    this.prdctService.getListOfProducts(this.distance,
      this.lat,
      this.lng,
      this.subCatagory,
      "",
      "desc",
      this.page,
      this.pageSize, 
      this.company.userId).subscribe(
        resp => {
          // console.log(resp,'product')
          if(resp && Object.keys(resp).length != 0){
            this.products  = resp;
            this.shown =true;
            if(Object.keys(resp).length >= 2){
              this.navigate = true;
            }
          }else{
            this.shown = false;
          }
          
        }
      )
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

  fetchProductForCompany(userId,name) {
    // console.log(userId,this.productProject,'loaded')
    return this.prdctService.getListOfProducts(this.distance,
      this.lat,
      this.lng,
      this.subCatagory,
      "",
      "desc",
      this.page,
      this.pageSize, 
      userId).subscribe(
        resp => {
          // console.log(resp,'product')
          this.products  = resp;
          // this.productProject.push({company:name,product:resp})
          return resp;
          // console.log(resp,'product')
        }
      )
  }

}
