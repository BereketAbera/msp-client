import { stringify } from "querystring";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from "@angular/core";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-company-products",
  templateUrl: "./company-products.component.html",
  styleUrls: ["./company-products.component.scss"],
})
export class CompanyProductsComponent implements OnInit {
  @Input() company;
  @Input() index;
  @Input() query;
  @Input() categoryId: number;
  catId: number;
  q = "";
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
  showAnimate = false;
  shown = false;
  navigate = false;
  constructor(private prdctService: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName == "query" || propName == "categoryId") {
        let chng = changes[propName];
        let cur = JSON.stringify(chng.currentValue);
        if (cur) {
          if (propName == "categoryId") {
            this.catId = parseInt(cur.replace(/"/g, ""));
          } else {
            this.q = cur;
          }
          this.getCompanyProducts();
        }
      }
    }
  }

  ngOnInit() {
    this.getCompanyProducts();
  }

  getCompanyProducts() {
    this.prdctService
      .getListOfProducts(
        this.distance,
        this.lat,
        this.lng,
        this.catId,
        "",
        "desc",
        this.page,
        this.pageSize,
        this.company.sellerProfileId,
        this.query ? this.query : this.q
      )
      .subscribe((resp) => {
        // console.log(resp,'product')
        if (resp && Object.keys(resp).length != 0) {
          this.products = resp;

          this.shown = true;
          if (Object.keys(resp).length >= 3) {
            this.navigate = true;
          } else {
            this.navigate = false;
          }
        } else if (resp && Object.keys(resp).length == 0) {
          this.products = [];
        } else {
          this.navigate = false;
        }
      });
  }

  nextClickScroll(id) {
    // console.log(id,'id')
    this.showAnimate = true;
    let elm = document.getElementById(`contanier_prods-${id}`);
    elm.scrollLeft += elm.offsetWidth;
  }

  previousClickScroll(id) {
    this.showAnimate = true;
    let elm = document.getElementById(`contanier_prods-${id}`);
    elm.scrollLeft -= elm.offsetWidth;
  }
}
