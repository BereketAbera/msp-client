import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { merge } from "rxjs/observable/merge";
import { tap } from "rxjs/operators";
import { RefersDataSource } from "../../service/refers-data-source.service";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-refer-status",
  templateUrl: "./refer-status.component.html",
  styleUrls: ["./refer-status.component.scss"],
})
export class ReferStatusComponent implements OnInit, AfterViewInit {
  dataSource: RefersDataSource;
  qrCode;
  balance: number = 0;
  displayedColumns = ["email", "type", "isUsed", "createdAt"];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("input") input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // window.scrollTo(0, 0);
    this.dataSource = new RefersDataSource(this.userService);
    this.dataSource.loadRefers("", "asc", 0, 5);
    // console.log(this.dataSource)
  }
  getType(type: number) {
    if (type == 2) return "Seller";
    return "Buyer";
  }
  isRegistered(isRegistered: boolean) {
    if (isRegistered) return "Yes";
    return "No";
  }
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadTransactionsPage()))
      .subscribe();
  }

  loadTransactionsPage() {
    this.dataSource.loadRefers(
      "",
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    window.scroll(0, 0);
  }
}
