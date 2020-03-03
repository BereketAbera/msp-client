import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {Transaction} from '../../model/transaction';

@Component({
  selector: 'app-seller-order-detail',
  templateUrl: './seller-order-detail.component.html',
  styleUrls: ['./seller-order-detail.component.scss']
})
export class SellerOrderDetailComponent implements OnInit {
  order:Transaction;
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { order: Transaction}) => {
      this.order = data.order;
      
    
    });
  }
  gotoSellerTrans(){
    this.router.navigate(["../"],{relativeTo:this.route});
  }

}
