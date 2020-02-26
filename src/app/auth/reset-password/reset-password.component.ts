import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  errors;
  showError: boolean = false;

  resetForm = this.fb.group({
    email: ["",[Validators.required, Validators.email]],
    
  });

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }
  close(){
    this.showError = false;
  }
  onSubmit() {
    return this.authService.reqPwdRest(this.resetForm.value).subscribe(
      res=>{
        alert("Password reset instructions have been sent to your account email.");
        this.router.navigate(['/']);
      },
      error=>{
        this.showError = true;
        this.errors = error.messages;
      }
    )
  }
  getErrorMessage() {
    return this.resetForm.get('email').hasError('required') ? 'You must enter a value' :
    this.resetForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
}
