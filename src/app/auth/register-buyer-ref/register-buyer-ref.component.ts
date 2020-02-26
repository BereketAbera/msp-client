import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../service/user.service';

import { RegistrationCompleteComponent } from '../registration-complete/registration-complete.component';

@Component({
  selector: 'app-register-buyer-ref',
  templateUrl: './register-buyer-ref.component.html',
  styleUrls: ['./register-buyer-ref.component.css']
})
export class RegisterBuyerRefComponent implements OnInit {

  @Output() registeredByr: EventEmitter<any> = new EventEmitter();
  hide = true;
  errors;
  showError: boolean = false;
  tk:string;
  referedEmail = "";
  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: ["", Validators.required],
    password: ["", Validators.required],
    agreed: [false, Validators.required],
    role: ["BUYER", Validators.required],

  });

  constructor(private route: ActivatedRoute,public dialog: MatDialog, private userService: UserService, private fb: FormBuilder, private router: Router) {

  }
  close() {
    this.showError = false;
  }
  ngOnInit() {
    this.route.queryParams
    .filter(params => params.tk)
    .subscribe(params => {
      this.tk = params.tk;
      this.userService.getReferedEmail(this.tk).subscribe(rslt=>{
        this.registrationForm.get('email').setValue(rslt['email']);
      });
     });
  }
  onSubmit() {
    if (this.registrationForm.get('agreed').value) {
      let usrInfo = this.registrationForm.value;
      usrInfo.tk = this.tk;
      return this.userService.registerByrUser(this.registrationForm.value).subscribe(
        res => {
          if (res['success']) {
            this.router.navigate(['/login']);
          } else {
            this.showError = true;
            this.errors = res['messages'];
          }
        }
      )
    } else {
      this.showError = true;
      this.errors = ["Please agree to the buyer's terms of use and privacy."];
    }
  }
  openTerms() {

  }
  openPrivacy() {

  }
  getErrorMessage() {
    return this.registrationForm.get('email').hasError('required') ? 'You must enter a value' :
      this.registrationForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }
}
