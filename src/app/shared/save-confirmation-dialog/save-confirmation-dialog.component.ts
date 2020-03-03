import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmationData} from '../../model/confirmation-data'
@Component({
  selector: 'app-save-confirmation-dialog',
  templateUrl: './save-confirmation-dialog.component.html',
  styleUrls: ['./save-confirmation-dialog.component.scss']
})
export class SaveConfirmationDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<SaveConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


