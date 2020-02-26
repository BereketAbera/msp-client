import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {UserService} from '../../service/user.service'
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-refer-buyer',
  templateUrl: './refer-buyer.component.html',
  styleUrls: ['./refer-buyer.component.css']
})
export class ReferBuyerComponent implements OnInit {

  emails = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(private userService:UserService) { }
  addEmail(){
    if(this.emailFormControl.valid && (this.emails.indexOf(this.emailFormControl.value)< 0)){
      this.userService.isEmailUsed(this.emailFormControl.value).subscribe(rslt=>{
        if(!rslt['isUsed']){
        this.emails.push(this.emailFormControl.value);
        this.emailFormControl.reset();
        }else{
          alert("Sorry, Email already used.");
        }
      });
    }
  }
  remove(email:string){
    let indx = this.emails.indexOf(email);
    if(indx >= 0)
     this.emails.splice(indx);
  }
  inviteUsers(){
    this.userService.inviteBuyers(this.emails).subscribe(rsp=>{
      alert("Invitation sent to users");
      this.emails = [];
    })
  }
  ngOnInit() {
  }


}
