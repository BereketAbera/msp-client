import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { EditConfigModalComponent } from '../edit-config-modal/edit-config-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  confg;
  editmode: boolean = false;
  constructor(private adminsService: AdminService,private dialog:MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.adminsService.getActiveConfiguration().subscribe(data => {
      // console.log(data);
      if (data) {
        this.confg = data;
      }
    })
  }

  editConfig(key,value) {
 
    this.editmode = true;
    // this.adminsService.updateActiveConfiguration(body).subscribe(data=>{
    //   console.log(data)
    // })
    const dialogRef = this.dialog.open(EditConfigModalComponent, {
      width: '300px',
      // height: '250px',
      disableClose: true,
      autoFocus: true,
       data: { key,value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.event === 'editted') {
        let code = result.data.message;
        let snackBarRef = this.snackBar.open('Config is editted', 'Dismiss', {duration: 2700});
        this.confg = result.data;
      }
    });

  }

}
