import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-edit-config-modal',
  templateUrl: './edit-config-modal.component.html',
  styleUrls: ['./edit-config-modal.component.scss']
})
export class EditConfigModalComponent implements OnInit {
  editForm: FormGroup;
  error: string;
  loading: boolean;
  key;
  constructor(public dialogRef: MatDialogRef<EditConfigModalComponent>,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data, 
    private adminService: AdminService) {
      this.editForm = this.formBuilder.group({
        configF: [this.data.value, Validators.compose([Validators.required])]
      })
     }

  ngOnInit() {
  }
  get f() {
    return this.editForm.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.error = '';
    
    if(this.editForm.invalid) {
      return;
    }
    this.loading = true;
    let val={}
    // let val = {...this.editForm.get('configF').value, id: this.data.key};
    this.key=this.data.key;
    val[this.data.key]=this.editForm.get("configF").value;
    // console.log(val)
    this.adminService.updateActiveConfiguration(val).subscribe(
      data => {
        //  console.log(data)
        this.loading = false;
        this.dialogRef.close({event:'editted', data});
      },
      error => {
        this.loading = false;
        this.error = error.error.message || 'could not update configuation. try again!';
      }
    );
  }

}
