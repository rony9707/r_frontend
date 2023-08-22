import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private router: Router,
    private userData: UserdataService
  ) {
    console.log("Register Component Loaded")
  }

  ngOnInit(): void { }

  toolTip = "Password must be between 8 to 16 characters, must have at least one lowercase character, one uppercase character, one number and one special character."

  //Form Code
  //FormGroup and FormControl Validators Code
  registerForm = new FormGroup({
    firstName: new FormControl('Agnibha', [Validators.required]),
    lastName: new FormControl('Chowdhury', [Validators.required]),
    username: new FormControl('rony9707', [Validators.required]),
    password: new FormControl(
      'Qwerty123.', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,16}')]),
    confirmPassword: new FormControl('Qwerty123.', [Validators.required]),
    showPassword: new FormControl(''),
    email: new FormControl('chowdhury.agnibha.98@gmail.com', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('8013921775', [Validators.required]),
    gender: new FormControl('Male'), //Checked Male in html
    dob: new FormControl('1997-02-07', [Validators.required])
  })

  //Age Object
  ageObj = {
    age: 0
  }

  dateObj = {
    dtecre: "",
    dteLastLogin: "",
    dtemod: ""
  }


  //Register Butoon Code
  date = new Date();//For age calculation
  registerUser() {

    let currentYear: any = this.datePipe.transform(this.date, "yyyy");
    let userYear: any = this.datePipe.transform(this.registerForm.value.dob, "yyyy");

    let currentMM: any = this.datePipe.transform(this.date, "MM");
    let userMM: any = this.datePipe.transform(this.registerForm.value.dob, "MM");

    let currentDD: any = this.datePipe.transform(this.date, "dd");
    let userDD: any = this.datePipe.transform(this.registerForm.value.dob, "dd");

    let currentMMDD = currentMM + currentDD;
    let userMMDD = userMM + userDD;

    this.ageObj.age = currentYear - userYear;


    if (currentMMDD > userMMDD) {
      this.ageObj.age = this.ageObj.age - 1
    } else {
      this.ageObj.age
    }

    const timestamp = Date.now();
    const dateString = new Date(timestamp).toString();

    this.dateObj.dtecre = dateString;
    this.dateObj.dteLastLogin = dateString;
    this.dateObj.dtemod = dateString;
    // console.log("Current Month:" + currentMM, "User Month:" + userMM)
    // console.log(currentMM + currentDD)
    // console.log(userMM + userDD)
    // console.log("Current Date:" + currentDD, "User Date:" + userDD)
    // console.log(ageYear)

    if (!this.registerForm.valid) {
      swal.fire({
        title: "Validation Error",
        text: "Please ensure all mandatory fields are correctly filled out.",
        icon: "info",
        showConfirmButton: true // Display the confirmation button
      });
    }
    else if (this.ageObj.age < 18) {
      swal.fire({
        title: "Age Verification",
        text: "You must be at least 18 years old to proceed.",
        icon: "info",
        showConfirmButton: true // Display the confirmation button
      });
    }
    else if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      // console.log(this.registerForm.value.firstName + "'s age is: " + this.ageObj.age);

      //Sent to Backend to insert data in db
      let sentDataToBackend = Object.assign(this.registerForm.value, this.ageObj, this.dateObj);
      console.log(sentDataToBackend)
      this.userData.registerUser(sentDataToBackend)
        .subscribe(
          (res) => {
            this.router.navigate(['/user',sentDataToBackend.username])
            swal.fire({
              title: "Registration Successful",
              text: "Your profile has been successfully created. Kindly review your email for confirmation.",
              icon: "success",
              timer: 2500, // Auto close after 2 seconds
              timerProgressBar: true, // Show progress bar
              showConfirmButton: false // Hide the "OK" button
            });
            localStorage.setItem('token', res.token)
          },
          (err) => {
            swal.fire("Error", err.error.message)
          }
        )

    }
  }

  //Code for input field validator text 
  get firstNameValidator() {
    return this.registerForm.get('firstName')
  }

  get lastNameValidator() {
    return this.registerForm.get('lastName')
  }

  get usernameValidator() {
    return this.registerForm.get('username')
  }

  get mainPasswordValidator() {
    return this.registerForm.get('password')
  }

  get PasswordFieldValidator() {
    return this.registerForm.get('confirmPassword')
  }



  get emailValidator() {
    return this.registerForm.get('email')
  }

  get phoneNumberValidator() {
    return this.registerForm.get('phoneNumber')
  }

  get dobValidator() {
    return this.registerForm.get('dob')
  }


  //password field click
  passwordfield(): void {
    let mainPassword: any = document.getElementById("mainPasswordID")?.getAttribute('type')
    let confirmPassword: any = document.getElementById("confirmPasswordID")?.getAttribute('type')
    if (mainPassword === 'text' && confirmPassword === 'text' && this.registerForm.value.showPassword == true) {
      document.getElementById("mainPasswordID")?.setAttribute('type', 'password')
      document.getElementById("confirmPasswordID")?.setAttribute('type', 'password')
    }
    else if (mainPassword === 'password' && confirmPassword === 'password' && this.registerForm.value.showPassword == false) {
      document.getElementById("mainPasswordID")?.setAttribute('type', 'text')
      document.getElementById("confirmPasswordID")?.setAttribute('type', 'text')
    }
  }


  //Check password and confirm password compare
  checkPassword(evt: string): void {
    let mainPassword: string = this.registerForm.value.password
    let confirmPassword: string = evt
    if (mainPassword === confirmPassword) {
      document.getElementById("confirmPasswordTextID")?.classList.add('confirmPasswordTextDisplayCSS')
    }
    else {
      document.getElementById("confirmPasswordTextID")?.classList.remove('confirmPasswordTextDisplayCSS')
    }
    // console.log(confirmPassword)
  }

  //ImageClick Code
  clickImgCount = 0
  imgClick() {
    this.clickImgCount++
    if (this.clickImgCount == 5) {
      document.getElementById("Image")?.classList.add('confirmPasswordTextDisplayCSS')
      document.getElementById("Image1")?.classList.remove('imageHide')
    }
  }

  //Function which will help to type only alphabets and numbers
  onlyAlphabetsAndNumbers(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  //Function which will help to type only alphabets
  onlyAlphabets(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  //Function which will help to type only and numbers
  onlyNumbers(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 47 && charCode < 58)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }



}
