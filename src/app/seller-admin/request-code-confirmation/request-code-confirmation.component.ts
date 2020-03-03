import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {QrCodeData} from '../../model/qrCodeData';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-request-code-confirmation',
  templateUrl: './request-code-confirmation.component.html',
  styleUrls: ['./request-code-confirmation.component.scss']
})

export class RequestCodeConfirmationComponent implements OnInit {
    
  constructor(private trnsService:TransactionService,
    public dialogRef: MatDialogRef<RequestCodeConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QrCodeData) {}

  ngOnInit() {
    this.trnsService.getCdCodeForTransaction(this.data.code).subscribe(qrData=>{
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
    console.log("this status " + this.data.status);
   return this.data.status == "OK";
  }
}

