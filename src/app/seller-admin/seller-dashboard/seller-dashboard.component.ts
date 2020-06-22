import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";
import * as moment from "moment";
import { UserService } from "src/app/service/user.service";
import { RevenuRprt } from "../../model/revenuRprt";
import { SellerSummary } from "../../model/sellerySummary";

@Component({
  selector: "app-seller-dashboard",
  templateUrl: "./seller-dashboard.component.html",
  styleUrls: ["./seller-dashboard.component.scss"],
})
export class SellerDashboardComponent implements OnInit {
  @ViewChild("lineChart", { static: true }) private chartRef;
  chart: any;
  summary: SellerSummary;
  actualRevenuReport: RevenuRprt[];
  estimateRvnuRprt: RevenuRprt[];
  lables: string[];
  actualRevenu: number[];
  estimateRevenu: number[];

  // sdate = new Date(moment().subtract(6, "M").format("YYYY-MM-DD"));

  reservedPercentage: any = 0;
  fullCircle: any = 0;
  totalRevenue: any = 0;
  // eData = new Date();
  // revenuForm = this.fb.group({
  //   startDate: [this.sdate, Validators.required],
  //   endDate: [this.eData, Validators.required],
  // });
  sDate = new FormControl();
  eDate = new FormControl(new Date());
  sDateValue = "";
  eDateValue = "";

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.route.queryParamMap.subscribe((params) => {
    //   this.sDateValue = params.get("sDate");
    //   this.eDateValue = params.get("eDate");

    //   this.filterDashboard();
    // });
    this.route.data.subscribe(
      (data: {
        summary: SellerSummary;
        rvnuRprt: {
          actualRvnuRprt: RevenuRprt[];
          estimateRvnuRprt: RevenuRprt[];
        };
      }) => {
        // console.log(data.summary);
        this.summary = data.summary;
        if (this.summary.totalQty > 0) {
          this.reservedPercentage = Math.ceil(
            (this.summary.totalReservedQty / this.summary.totalQty) * 100
          );
        }

        this.actualRevenuReport = data.rvnuRprt.actualRvnuRprt;
        this.estimateRvnuRprt = data.rvnuRprt.estimateRvnuRprt;
        this.revenuChart();
      }
    );
  }

  revenuChart() {
    this.lables = this.actualRevenuReport.map((value) => {
      return value.year + "|" + value.month + "|" + value.day;
    });
    // console.log(this.revenuReport);
    this.actualRevenu = this.actualRevenuReport.map((value) => {
      return +value.revenu;
    });
    this.estimateRevenu = this.estimateRvnuRprt.map((value) => {
      return +value.revenu;
    });

    this.drawRevenuChart();
  }

  filterDashboard() {
    let startDate = moment(this.sDate.value).isValid
      ? moment(this.sDate.value).format("MM/DD/YYYY")
      : null;
    let endDate = moment(this.eDate.value).isValid
      ? moment(this.eDate.value).format("MM/DD/YYYY")
      : null;
    if (!startDate || !endDate) {
      return;
    }

    this.userService
      .getSellerSummary(startDate, endDate)
      .subscribe((response) => {
        this.summary = response;
        if (this.summary.totalQty > 0) {
          this.reservedPercentage = Math.ceil(
            (this.summary.totalReservedQty / this.summary.totalQty) * 100
          );
        }
      });
    this.userService
      .getRevenuReport(startDate, endDate)
      .subscribe((response: any) => {
        this.actualRevenuReport = response.actualRvnuRprt;
        this.estimateRvnuRprt = response.estimateRvnuRprt;
        this.revenuChart();
      });
  }

  drawRevenuChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "line",
      data: {
        labels: this.lables,
        datasets: [
          {
            label: "Actual Revenue",
            data: this.actualRevenu,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132,1)"],
            borderWidth: 1,
          },
          {
            label: "Estimated Revenue",
            data: this.estimateRevenu,
            backgroundColor: ["rgba(76, 187, 185, 0.2)"],
            borderColor: ["rgba(76, 187, 185,1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  onSubmit() {}

  count(number, prop) {
    let interval = setInterval(() => {
      if (number > this[prop]) {
        return this[prop]++;
      } else {
        this[prop] = number;
        clearInterval(interval);
      }
    }, 1000 / number);
  }

  goToSellSummary() {
    this.router.navigate(["./slssmry"], { relativeTo: this.route });
  }

  // setUrlValues(sObj) {
  //   let keys = Object.keys(sObj);
  //   let pObj = {};
  //   keys.map((key) => {
  //     pObj[key] = sObj[key];
  //   });
  //   const queryParams: Params = {
  //     ...pObj,
  //   };

  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: queryParams,
  //     queryParamsHandling: "merge",
  //   });
  // }

  // submitFilter() {
  //   if (moment(this.sDate.value).isValid && moment(this.eDateValue).isValid) {
  //     let obj = {
  //       sDate: moment(this.sDate.value).format("MM/DD/YYYY"),
  //       eDate: moment(this.eDate.value).format("MM/DD/YYYY"),
  //     };
  //     this.setUrlValues(obj);
  //   }
  // }
}
