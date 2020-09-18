import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Picture } from "../../model/picture";
import { UploadService } from "../../service/upload.service";
import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
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
    // window.scrollTo(0, 0);
    this.route.data.subscribe((data: { pictures: Picture[] }) => {
      this.pictures = data.pictures;
      // this.prepareOddEvenPicture();
    });
  }

  delete(picture: Picture) {
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "220px",
      height: "180px",
      data: { title: "", question: "Do you want to delete this picture?" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" },
        });
        this.uploadService.removeImage(picture.id).subscribe(
          (res) => {
            if (res["success"]) {
              progressDialogRef.close();
              this.uploadService.listImages().subscribe((newPictures) => {
                this.pictures = newPictures;
                // this.prepareOddEvenPicture();
              });
              this.router.navigate(["./"], { relativeTo: this.route });
              let snackBarRef = this.snackBar.open("Successfuly Deleted", "", {
                duration: 5000,
              });
              snackBarRef.afterDismissed().subscribe(() => {
                this.uploadService.listImages().subscribe((newPictures) => {
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
          (err) => {
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
