

import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmationData} from '../../model/confirmation-data'
@Component({
  selector: 'app-save-progress',
  templateUrl: './save-progress.component.html',
  styleUrls: ['./save-progress.component.css']
})
export class SaveProgressComponent{

  constructor(
    public dialogRef: MatDialogRef<SaveProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
