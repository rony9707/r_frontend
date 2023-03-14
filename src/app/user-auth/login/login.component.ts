import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// var shajs: any = require('sha.js')



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None //To change font size of mattooltip
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) {

  }
  ngOnInit() {
  }

  //pasword Cut,Copy and Paste
  DisableCut(event: any) {
    event.preventDefault();
  }

  DisableCopy(event: any) {
    event.preventDefault();
  }

  DisablePaste(event: any) {
    alert("You can't paste in this input");
    event.preventDefault();
  }

  //password field click
  passwordfield(): void {
    let passwordTypeAttribute: any = document.getElementById("password-field-id")?.getAttribute('type')
    // console.log(typeof (passwordTypeAttribute))
    if (passwordTypeAttribute === 'text') {
      document.getElementById("password-field-id")?.setAttribute('type', 'password')
      document.getElementById("togglePassword")?.classList.remove('bi-eye')
      document.getElementById("togglePassword")?.classList.add('bi-eye-slash')
    }
    else {
      document.getElementById("password-field-id")?.setAttribute('type', 'text')
      document.getElementById("togglePassword")?.classList.remove('bi-eye-slash')
      document.getElementById("togglePassword")?.classList.add('bi-eye')
    }
  }


  //Add Delay to button
  // setInterval: any
  // login() {
  //   this.setInterval = setTimeout(() => {
  //     this.route.navigateByUrl('register')
  //   }, 1000);
  //   this.setInterval = setTimeout(() => {
  //     document.getElementById("login-id")?.classList.toggle('disabled-a')
  //   }, 400);

  // }


  //Form Code
  //FormGroup and FormControl Validators Code
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  //Get value of the form code
  loginUser() {
    //console.log(shajs('sha256').update(this.loginForm.value.password).digest('hex'));
    console.warn(this.loginForm.value);
  }


  //Code for input field validator text 
  get usernameValidator() {
    return this.loginForm.get('username')
  }

  get passwordValidator() {
    return this.loginForm.get('password')
  }



  //Code for popup modal
  ispopUpShow: boolean = false

  clickHandler() {
    this.ispopUpShow = true;
    document.getElementById("blur")?.classList.add('blur');
  }

  closePop() {
    this.ispopUpShow = false;
    document.getElementById("blur")?.classList.remove('blur')
  }


  //Code for closing modal by clicking outside of the modal
  ClickedOut(event) {
    if (event.target.className === "hover_bkgr_fricc" || event.target.className === "hover_bkgr_fricc ng-star-inserted") {
      this.ispopUpShow = false;
      document.getElementById("blur")?.classList.remove('blur')
    }
  }


  //Forget Password Form
  forgetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  //Get value of the forget password code
  forgetPasswordEmail() {
    console.warn(this.forgetPassword.value)
  }

  //Code for input field validator text 
  get forgetPassEmailValidator() {
    return this.forgetPassword.get('email')
  }




}
