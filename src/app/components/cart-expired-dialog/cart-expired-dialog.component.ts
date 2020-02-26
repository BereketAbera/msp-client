import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {PrdDtlDlgData} from '../../model/prd-dtl-dlg-data';
@Component({
  selector: 'app-cart-expired-dialog',
  templateUrl: './cart-expired-dialog.component.html',
  styleUrls: ['./cart-expired-dialog.component.css']
})
export class CartExpiredDialogComponent implements OnInit {
 constructor(
    public dialogRef: MatDialogRef<CartExpiredDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrdDtlDlgData) {}

ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
