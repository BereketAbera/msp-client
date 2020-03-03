import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Chart } from 'chart.js';
var SellerDashboardComponent = /** @class */ (function () {
    function SellerDashboardComponent(route, fb) {
        this.route = route;
        this.fb = fb;
        this.sdate = new Date(moment().subtract(6, "M").format("YYYY-MM-DD"));
        this.eData = new Date();
        this.revenuForm = this.fb.group({
            startDate: [this.sdate, Validators.required],
            endDate: [this.eData, Validators.required],
        });
    }
    SellerDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data
            .subscribe(function (data) {
            _this.summary = data.summary;
            _this.revenuReport = data.rvnuRprt;
            _this.lables = _this.revenuReport.map(function (value) {
                return value.year + "|" + value.month;
            });
            _this.revenus = _this.revenuReport.map(function (value) {
                return +value.revenu;
            });
            _this.drawRevenuChart();
        });
    };
    SellerDashboardComponent.prototype.drawRevenuChart = function () {
        this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'line',
            data: {
                labels: this.lables,
                datasets: [{
                        label: 'Revenue',
                        data: this.revenus,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    };
    SellerDashboardComponent.prototype.onSubmit = function () {
    };
    tslib_1.__decorate([
        ViewChild('lineChart'),
        tslib_1.__metadata("design:type", Object)
    ], SellerDashboardComponent.prototype, "chartRef", void 0);
    SellerDashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-seller-dashboard',
            templateUrl: './seller-dashboard.component.html',
            styleUrls: ['./seller-dashboard.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, FormBuilder])
    ], SellerDashboardComponent);
    return SellerDashboardComponent;
}());
export { SellerDashboardComponent };
//# sourceMappingURL=seller-dashboard.component.js.map