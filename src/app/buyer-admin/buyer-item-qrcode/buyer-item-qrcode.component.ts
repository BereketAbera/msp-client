import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";

import { Transaction } from "../../model/transaction";
import { Supplier } from "../../model/supplier";
import { TransactionStatus } from "../../model/transactionStatus";
import { TransactionService } from "../../service/transaction.service";

import { SaveConfirmationDialogComponent } from "../../shared/save-confirmation-dialog/save-confirmation-dialog.component";
import { SaveProgressComponent } from "../../shared/save-progress/save-progress.component";

@Component({
  selector: "app-buyer-item-qrcode",
  templateUrl: "./buyer-item-qrcode.component.html",
  styleUrls: ["./buyer-item-qrcode.component.scss"],
})
export class BuyerItemQrcodeComponent implements OnInit {
  @ViewChild("qrImg") image;
  transaction;
  transStatus: TransactionStatus;
  supplier: Supplier;
  qrCode$;
  errors;
  showError: boolean = false;
  code = "xxx-xxx";
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private trnsService: TransactionService
  ) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get("id");
    this.route.data.subscribe(
      (data: {
        transaction: Transaction;
        supplier: Supplier;
        transStatus: TransactionStatus;
      }) => {
        this.transaction = data.transaction;
        if (
          this.transaction.codePool &&
          this.transaction.codePool.code &&
          this.transaction.codePool.code.length == 6
        )
          this.code =
            this.transaction.codePool.code.slice(0, 3) +
            "-" +
            this.transaction.codePool.code.slice(3, 6);
        this.supplier = data.supplier;
        this.transStatus = data.transStatus;
      }
    );
    /* this.trnsService.getQRCode(id).subscribe(image => {
      this.image.nativeElement.src = URL.createObjectURL(image)
    }); */
  }
  acceptProduct() {
    this.trnsService
      .getTransactionStatus(this.transaction.id)
      .subscribe((latestTrnsStatus) => {
        if (
          (latestTrnsStatus.status == "OK" && latestTrnsStatus.isScanneded) ||
          (latestTrnsStatus.status == "REJECTED" &&
            latestTrnsStatus.isScanneded &&
            latestTrnsStatus.canBeAccepted)
        ) {
          this.acceptOrder(true);
        } else if (
          latestTrnsStatus.status == "OK" &&
          !latestTrnsStatus.isScanneded
        ) {
          alert(
            "your QR Code is not scaned yet. Please ask the seller to scan your QR Code."
          );
        } else {
          alert("Sorry, this QR Code is already claimed,rejected or expired.");
        }
      });
  }
  rejectProduct() {
    this.trnsService
      .getTransactionStatus(this.transaction.id)
      .subscribe((latestTrnsStatus) => {
        if (latestTrnsStatus.status == "OK" && latestTrnsStatus.isScanneded) {
          this.acceptOrder(false);
        } else if (
          latestTrnsStatus.status == "OK" &&
          !latestTrnsStatus.isScanneded
        ) {
          alert(
            "your QR Code is not scaned yet. Please ask the seller to scan your QR Code."
          );
        } else {
          alert("Sorry, this QR Code is already claimed,rejected or expired.");
        }
      });
  }
  showIfRejected() {
    if (this.transStatus.status == "REJECTED") return true;
    return false;
  }
  showAcceptReject() {
    if (
      this.transStatus.status == "OK" ||
      (this.transStatus.status == "REJECTED" &&
        this.transStatus.isScanneded &&
        this.transStatus.canBeAccepted)
    )
      return true;
    return false;
  }
  showReject() {
    if (this.transStatus.status == "OK") return true;
    return false;
  }
  showAccept() {
    if (
      this.transStatus.status == "OK" ||
      (this.transStatus.status == "REJECTED" &&
        this.transStatus.isScanneded &&
        this.transStatus.canBeAccepted)
    )
      return true;
    return false;
  }
  showClaimedDate() {
    if (
      this.transStatus.status == "CLAIMED" ||
      this.transStatus.status == "REJECTED"
    )
      return true;
    return false;
  }
  get ORDERSTATUS() {
    if (this.transStatus.status == "REJECTED") return "Rejected";
    else if (this.transStatus.status == "EXPIRED") return "Expired";
    else if (this.transStatus.status == "CLAIMED") return "Picked Up";
    else return "Pending";
  }
  get CLAIMMSG() {
    if (this.transStatus.status == "REJECTED") return "Rejected at";
    return "Picked at";
  }
  acceptOrder(isOK: boolean) {
    let qt = "";
    let ordMsg = "";
    if (isOK) {
      qt = "you have agreed to accept this order.";
      ordMsg = "Thanks, you have succefuly accepted the order";
    } else {
      ordMsg = "Thanks, you have succefuly rejected the order";
      qt = "do you want to reject this product?";
    }
    const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
      width: "250px",
      height: "150px",
      data: { title: "", question: qt },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "yes") {
        const progressDialogRef = this.dialog.open(SaveProgressComponent, {
          width: "260px",
          height: "180px",
          data: { title: "", question: "" },
        });
        this.trnsService.acceptOrder(isOK, this.transaction.id).subscribe(
          (res) => {
            if (res["success"]) {
              progressDialogRef.close();
              let snackBarRef = this.snackBar.open(ordMsg, "", {
                duration: 2000,
              });
              snackBarRef.afterDismissed().subscribe(() => {
                this.router.navigate(["../../"], { relativeTo: this.route });
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
  close() {
    this.showError = false;
  }
}
