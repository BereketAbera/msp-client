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
  @ViewChild("anchor", { static: false }) anchor: ElementRef<HTMLElement>;
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
  address: any;
  constructor(private prdctService: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.address = JSON.parse(localStorage.getItem("client_address"));
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

    // console.log(this.company);
  }

  ngOnInit() {
    // console.log(this.company);
    this.getCompanyProducts();
  }

  getCompanyProducts() {
    if (this.address) {
      this.lat = this.address.Latitude;
      this.lng = this.address.Longitude;
    }
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
        this.company.storeId,
        this.query ? this.query : this.q
      )
      .subscribe((resp) => {
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
