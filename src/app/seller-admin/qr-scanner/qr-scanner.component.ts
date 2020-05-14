import { Component, ViewChild, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FormControl } from "@angular/forms";

import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs/operators";

import { RequestResultComponent } from "../request-result/request-result.component";
import { RequestConfirmationComponent } from "../request-confirmation/request-confirmation.component";
import { RequestCodeConfirmationComponent } from "../request-code-confirmation/request-code-confirmation.component";
import jsQR from "jsqr";

import { TransactionService } from "../../service/transaction.service";
import { AuthService } from "../../service/auth.service";

import { QrCodeData } from "../../model/qrCodeData";

@Component({
  selector: "app-qr-scanner",
  templateUrl: "./qr-scanner.component.html",
  styleUrls: ["./qr-scanner.component.scss"],
})
export class QrScannerComponent implements OnInit {
  video: any;
  @ViewChild("mycode") myCodeElementHTML: any;
  @ViewChild("canvasElementHTML") canvasElementHTML: any;
  canvas: any;
  canvasElement: any;
  isScanning: boolean = false;
  displayChk: string = "none";
  disInvalidPrdct: string = "none";
  displayScanner: string = "block";
  transactionId: number = 0;
  showError: boolean = false;
  errMsg = "";
  errors = [];
  code = new FormControl("");
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    //if(!this.authService.accountCanScan())
    //this.showError = true;
    const typeahead = fromEvent(
      this.myCodeElementHTML.nativeElement,
      "keyup"
    ).pipe(
      map((e: KeyboardEvent) => (<HTMLInputElement>event.target).value),
      filter((text) => text.length > 2)
    );

    typeahead.subscribe((data) => {});
  }
  onKeydownEvent(event: KeyboardEvent): void {
    if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105)
    ) {
      if (this.code.value.length == 3)
        this.code.setValue(this.code.value + "-");
    }
  }
  showResult(msg) {
    const dialogRef = this.dialog.open(RequestResultComponent, {
      width: "250px",
      height: "300px",
      data: { title: "Status", question: msg },
    });
  }
  openConfirmation(qrData: QrCodeData) {}
  close() {
    this.showError = false;
    this.displayScanner = "block";
  }
  startScanner() {
    this.video.play();
    this.isScanning = true;

    setTimeout(requestAnimationFrame, 100, () => this.tick());
  }
  checkOrderStatus() {
    let msg = "";
    this.transactionService
      .getOrderSeller(this.transactionId)
      .subscribe((transaction) => {
        if (transaction.status == 1) {
          this.showResult("You can now give the product to the buyer.");
        } else if (transaction.status == 2) {
          this.showResult(
            "The buyer has rejected the product.\n You will not get paid. Try to resolve the problem and ask the Buyer to press Accept Product Button before he leaves."
          );
        } else {
          this.showResult(
            "The buyer has not pressed Accept or Reject button on his phone yet.\n Do not release product unless you receive an Acceptance status."
          );
        }
      });
  }
  stopScanner() {
    this.video.pause();
    this.isScanning = false;
  }
  drawLine(begin, end, color) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }
  // Use facingMode: environment to attemt to get the front camera on phones
  checkCode() {
    //this.stopScanner()

    let ordCoded = `${this.code.value}`;
    let ordCode = ordCoded.replace("-", "");
    let dialogRef = this.dialog.open(RequestCodeConfirmationComponent, {
      data: { code: ordCode },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionService
          .processTransactionQRCdCode({
            code: parseInt(ordCode),
            qrCode: result.qrCode,
          })
          .subscribe((result) => {
            if (result["success"]) {
              this.transactionId = result["transactionId"];
              this.displayChk = "block";
              this.displayScanner = "none";
              //console.log("You can now give the item to the buyer.");
            } else {
              this.showError = true;
              this.errors = result["messages"];
              this.displayScanner = "none";
            }
          });
      }
    });
  }
  accountCanScan() {
    return this.authService.accountCanScan();
  }
  tick() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      //this.canvasElement.height = this.video.videoHeight;
      //this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      var imageData = this.canvas.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      var code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        this.drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          "#FF3B58"
        );
        this.drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          "#FF3B58"
        );
        this.drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          "#FF3B58"
        );
        this.drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          "#FF3B58"
        );

        //outputData.parentElement.hidden = false;
        //outputData.innerText = code.data;
        try {
          var cstInfo = JSON.parse(code.data);
          if (cstInfo) {
            this.transactionId = cstInfo.transactionId;
            this.isScanning = false;
            let dialogRef = this.dialog.open(RequestConfirmationComponent, {
              data: cstInfo,
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                this.isScanning = false;
                this.video.pause();
                this.transactionService
                  .processTransactionQRCode(cstInfo)
                  .subscribe((result) => {
                    if (result["success"]) {
                      this.displayChk = "block";
                      this.displayScanner = "none";
                      //  console.log("You can now give the item to the buyer.");
                    } else {
                      this.showError = true;
                      this.errors = result["messages"];
                      this.displayScanner = "none";
                    }
                  });
              } else {
                if (this.isScanning) requestAnimationFrame(() => this.tick());
              }
            });
          } else {
            alert("Not a valid customer!!!1");
            this.isScanning = false;
          }
        } catch (err) {
          alert("Not a valid customer!!!2");
          this.isScanning = false;
        }
      } else {
        if (this.isScanning) requestAnimationFrame(() => this.tick());
      }
    }
  }
}
