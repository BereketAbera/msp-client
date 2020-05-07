import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {QrCodeData} from '../../model/qrCodeData';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-request-confirmation',
  templateUrl: './request-confirmation.component.html',
  styleUrls: ['./request-confirmation.component.scss']
})

export class RequestConfirmationComponent implements OnInit {
    
  constructor(private trnsService:TransactionService,
    public dialogRef: MatDialogRef<RequestConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QrCodeData) {}

  ngOnInit() {
    this.trnsService.getQRCodeForTransaction(this.data.transactionId).subscribe(qrData=>{
      if(qrData['success']){
        this.data = qrData['data'];
        this.data.success = true;
      }else{
        this.data = qrData;
        this.data.success = false;
      }
    })
  }
  isOk(){
    // console.log("this status " + this.data.status);
   return this.data.status == "OK";
  }
}
