import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

import {Chart} from 'chart.js'

import {SellerSummary} from '../../model/sellerySummary';
import {RevenuRprt} from '../../model/revenuRprt';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;    
  chart: any;
  summary:SellerSummary;
  revenuReport:RevenuRprt[];
  lables:string[];
  revenus:number[];

  sdate = new Date(moment().subtract(6,"M").format("YYYY-MM-DD"));
  eData = new Date();
  revenuForm = this.fb.group({
    startDate: [this.sdate, Validators.required],
    endDate: [this.eData, Validators.required],
   });


  constructor( private route: ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { summary: SellerSummary,rvnuRprt:RevenuRprt[]}) => {
      this.summary = data.summary;
      this.revenuReport = data.rvnuRprt;
      this.lables = this.revenuReport.map(value=>{
        return value.year + "|" + value.month;
      })
      this.revenus = this.revenuReport.map(value=>{
        return +value.revenu;
      })
      
      this.drawRevenuChart();
      });
  }
  drawRevenuChart(){
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
          labels:this.lables,
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
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  }
  onSubmit(){
      
  }

}
