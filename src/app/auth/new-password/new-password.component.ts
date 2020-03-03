import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { filter} from 'rxjs/operators';
import { UserService } from '../../service/user.service';

import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  @Output() registeredByr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  token = "";
  showError: boolean = false;
  passwordRestForm = this.fb.group({
    token: [this.token],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required],
   

  });

  constructor(public route:ActivatedRoute, public dialog: MatDialog, private userService: UserService, private fb: FormBuilder, private router: Router) {

  }
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("this is test"); // {order: "popular"}

      this.token = params.tk;
      console.log(this.token); // popular
     
        this.router.navigate['/invtkn'];
    });
  }
  onSubmit() {
   
      return this.userService.registerUser(this.passwordRestForm.value).subscribe(
        res => {
          if (res['success']) {

            const dialogRef = this.dialog.open(RegistrationCompleteComponent, {
              width: '350px',

            });
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
                this.router.navigate(['/login/buyer']));
            });


            //this.registeredByr.emit("Buyer")   
            //this.router.navigate(['/login/buyer']);
          } else {
            this.showError = true;
            this.errors = res['messages'];
          }
        }
      )
    
  }
  openTerms() {

  }
  openPrivacy() {

  }
  
}
