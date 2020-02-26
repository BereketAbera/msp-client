import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {Deposit} from '../../model/deposit';

@Component({
  selector: 'app-buyer-deposit-detail',
  templateUrl: './buyer-deposit-detail.component.html',
  styleUrls: ['./buyer-deposit-detail.component.css']
})
export class BuyerDepositDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router) { }
  deposit:Deposit;
  ngOnInit() {
    this.route.data
      .subscribe((data: { deposit: Deposit}) => {
        this.deposit = data.deposit;
      
      });
  }
  gotoBuyerTrans(){
    
    this.router.navigate(["../../trnsctns"],{relativeTo:this.route});
        
  }
}
