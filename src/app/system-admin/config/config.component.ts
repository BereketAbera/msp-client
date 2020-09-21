import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from "src/app/service/admin.service";
import { ConfigurationService } from "src/app/service/configuartion.service";
import { EditConfigModalComponent } from "../edit-config-modal/edit-config-modal.component";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"],
})
export class ConfigComponent implements OnInit {
  confg;
  // editmode: boolean = false;
  constructor(
    private adminsService: AdminService,
    private configService: ConfigurationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //  console.log(this.configService.configData);
    this.confg = this.configService.configData;
    // this.adminsService.getActiveConfiguration().subscribe(data => {
    //   // console.log(data);
    //   if (data) {
    //     this.confg = data;
    //   }
    // })
  }

  editConfig(key, value, label) {
    // this.adminsService.updateActiveConfiguration(body).subscribe(data=>{
    //   console.log(data)
    // })
    const dialogRef = this.dialog.open(EditConfigModalComponent, {
      width: "300px",
      // height: '250px',
      disableClose: true,
      autoFocus: true,
      data: { key, value, label },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.event === "editted") {
        let code = result.data.message;
        let snackBarRef = this.snackBar.open("Config is editted", "Dismiss", {
          duration: 2700,
        });
        this.confg = result.data;
      }
    });
  }
}
