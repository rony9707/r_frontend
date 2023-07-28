import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  toolTip = "Password must be between 8 to 16 characters, must have at least one lowercase character, one uppercase character, one number and one special character."

  //Form Code
  //FormGroup and FormControl Validators Code
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    mainPassword: new FormControl(
      '', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{8,16}')]),
    confirmPassword: new FormControl('', [Validators.required]),
    showPassword: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    gender: new FormControl('Male'), //Checked Male in html
    dob: new FormControl('', [Validators.required])
  })


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

    let ageYear = currentYear - userYear;
    if (currentMMDD > userMMDD) {
      ageYear = ageYear - 1
    } else {
      ageYear
    }

    // console.log("Current Month:" + currentMM, "User Month:" + userMM)
    // console.log(currentMM + currentDD)
    // console.log(userMM + userDD)
    // console.log("Current Date:" + currentDD, "User Date:" + userDD)
    // console.log(ageYear)

    if (!this.registerForm.valid) {
      alert('Please fill all required fields correctly.');
    }
    else if (ageYear < 18) {
      alert('You are still not above 18');
    }
    else if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log(this.registerForm.value.firstName + "'s age is: " + ageYear);
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
    return this.registerForm.get('mainPassword')
  }

  get PasswordFieldValidator() {
    return this.registerForm.get('confirmPassword')
  }

  get confirmPasswordValidator() {
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
    let mainPassword: string = this.registerForm.value.mainPassword
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
