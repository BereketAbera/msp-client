import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Category } from "src/app/model/category";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PublicComponent implements OnInit {
  today = new Date().getFullYear();
  version = environment.version;
  progressBarActive: boolean = false;
  name: string = "";
  mobileSearchActive = false;
  mobileSearchValue = new FormControl("");
  desktopSearchValue = new FormControl("");
  @ViewChild("deskInput") deskInput: ElementRef;
  categories: Category[];
  categoryId: any;
  q: any;
  searchActive: any = false;
  signUpRoute = "/signup";

  constructor(
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((url: any) => {
      if (url.url && url.url.includes("/seller")) {
        this.signUpRoute = "/signup-seller";
      } else {
        if (this.router.url.toString().includes("/seller")) {
          this.signUpRoute = "/signup-seller";
        } else if (this.router.url.toString().includes("/buyer")) {
          this.signUpRoute = "/signup";
        } else {
          this.signUpRoute = "/common-signup";
        }
      }
      if (url.url && url.url.includes("/products")) {
        this.searchActive = true;
      } else {
        if (this.router.url.toString().includes("/products")) {
          this.searchActive = true;
        } else {
          this.searchActive = false;
        }
      }
    });
  }

  ngOnInit() {
    if (this.isLoggedIn()) this.name = this.authService.getName();
    this.getMyLocation();
    this.authService.progressBarActive.subscribe((value) => {
      this.progressBarActive = value;
    });

    this.route.data.subscribe((data: { categories: Category[] }) => {
      this.categories = data.categories;
    });

    this.route.queryParamMap.subscribe((res) => {
      this.categoryId = res.get("categoryId");
      this.q = res.get("q");
    });

    this.cdr.detectChanges();
  }

  getMyLocation() {}

  gotoAdmin() {
    this.router.navigate(["./tlgu-byr"]);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  searchClick() {
    this.mobileSearchActive = !this.mobileSearchActive;
  }

  searchValueChanged(name) {
    const queryParams: Params = {
      q: this[name].value == "" ? null : this[name].value,
      categoryId: this.categoryId ? this.categoryId : null,
    };
    this.deskInput.nativeElement.blur();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });

    this.mobileSearchActive = false;
  }

  categoryChanged(categoryId) {
    if (categoryId == "") return;
    if (this.categoryId == categoryId) {
      // this.categoryId = null;
      // this.router.navigate([], {
      //   relativeTo: this.route,
      //   queryParams: {},
      // });
      this.mobileSearchActive = false;
      return;
    } else {
      this.categoryId = categoryId;
    }
    const queryParams: Params = { categoryId: categoryId };
    this.deskInput.nativeElement.blur();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });
    this.mobileSearchActive = false;
  }
}
