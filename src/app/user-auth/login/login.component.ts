import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })


  //Get value of the form code
  loginUser() {
    console.warn(this.loginForm.value)
  }


  //Code for input field validator text 
  get usernameValidator() {
    return this.loginForm.get('username')
  }

  get passwordValidator() {
    return this.loginForm.get('password')
  }








}
