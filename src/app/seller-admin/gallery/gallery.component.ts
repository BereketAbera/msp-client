import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { UploadService } from "../../service/upload.service";

import { Picture } from "../../model/picture";
import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"]
})
export class GalleryComponent implements OnInit {
  pictures: Picture[];
  picturesOdd: Picture[] = new Array();
  picturesEven: Picture[] = new Array();
  errors;
  showError: boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { pictures: Picture[] }) => {
      this.pictures = data.pictures;
      // this.prepareOddEvenPicture();
    });
  }
  // prepareOddEvenPicture() {
  //   if (this.picturesEven.length > 0) this.picturesEven = [];
  //   if (this.picturesOdd.length > 0) this.picturesOdd = [];
  //   for (var x = 0; x < this.pictures.length; x++) {
  //     if (x === 0) {
  //       this.picturesEven.push(this.pictures[x]);
  //     } else if (x % 2 === 0) {
  //       this.picturesEven.push(this.pictures[x]);
  //     } else {
  //       this.picturesOdd.push(this.pictures[x]);
  //     }
  //   }
  // }
  delete(picture: Picture) {
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "220px",
      height: "180px",
      data: { title: "", question: "Do you want to delete this picture?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" }
        });
        this.uploadService.removeImage(picture.id).subscribe(
          res => {
            if (res["success"]) {
              progressDialogRef.close();
              let snackBarRef = this.snackBar.open("Successfuly Deleted", "", {
                duration: 2000
              });
              snackBarRef.afterDismissed().subscribe(() => {
                this.uploadService.listImages().subscribe(newPictures => {
                  this.pictures = newPictures;
                  // this.prepareOddEvenPicture();
                });
                this.router.navigate(["./"], { relativeTo: this.route });
              });
              //this.router.navigate(["../"], { relativeTo: this.route });
            } else {
              progressDialogRef.close();
              this.showError = true;
              this.errors = res["messages"];
            }
          },
          err => {
            progressDialogRef.close();
          }
        );
      }
    });
  }
  gotoUploadPage() {
    this.router.navigate(["./upldimg"], { relativeTo: this.route });
  }
}
