
import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmationData} from '../../model/confirmation-data'
@Component({
  selector: 'app-request-result',
  templateUrl: './request-result.component.html',
  styleUrls: ['./request-result.component.scss']
})
export class RequestResultComponent{

  constructor(
    public dialogRef: MatDialogRef<RequestResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
