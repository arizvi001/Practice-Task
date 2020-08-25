import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myLoginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  });

  get username(){
    return this.myLoginForm.get('username');
  }

  get password(){
    return this.myLoginForm.get('password');
  }

  constructor(private fb:FormBuilder,private _myService:LoginService,private router: Router) { }

  onSubmit(){
    this._myService.loginUser(this.username.value,this.password.value)
    .subscribe(data=>this.router.navigate(['/']),
              error=>alert("Invalid Credentials")
    );
  }



  ngOnInit(): void {
  }

}
