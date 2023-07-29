import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { browserRefresh } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor() { }
  //Browser refresh code for dark and light theme
  browserRefresh: boolean | undefined

  ngOnInit(): void {

    //this will call the updateDate in each second  
    // setInterval(() => {
    //   let GetTheme = JSON.parse(localStorage.getItem("PageTheme") || '{}');
    //   if (GetTheme === "Light Mode") {
    //     document.body.classList.add('light-theme');
    //   }
    //   else {
    //     document.body.classList.add();
    //   }
    // }, 5);

    //Browser refresh code for dark and light theme
    if (this.browserRefresh = browserRefresh) {
      //console.log('refreshed?:', browserRefresh);
      let GetTheme = JSON.parse(localStorage.getItem("PageTheme") || '{}');
      const checkbox: any = document.getElementById('darkmode-toggle');
      console.log(checkbox)
      if (GetTheme === "Light Mode") {
        document.body.classList.add('light-theme');
        document.getElementById('darkmode-toggle')
        checkbox.checked = false
      }
      else if (GetTheme === "Dark Mode") {
        document.body.classList.add();
        checkbox.checked = true
      }
      else {
        document.body.classList.add('dark-theme');//If someone deletes data from local stroage fix
      }
    }
  }

  //Code for back button
  back() {
    window.history.back();
  }

  //theme value taken from local session
  theme: any = JSON.parse(localStorage.getItem("PageTheme") || '{}');

  //checkedOrNot value taken from local session
  checkedOrNot: any = JSON.parse(localStorage.getItem("checkedBox") || '{}');


  toggleDarkTheme(): void {
    var setTheme = document.body;
    setTheme.classList.toggle('light-theme');
    var theme;
    var checkedBox;
    const checkbox: any = document.getElementById('darkmode-toggle');
    if (setTheme.classList.contains('light-theme')) {
      theme = "Light Mode";
      this.theme = "Light Mode"
      checkedBox = false
      checkbox.check = checkedBox
      console.log(checkbox.checked)
    }
    else {
      theme = "Dark Mode";
      this.theme = "Dark Mode"
      checkedBox = true
      checkbox.check = checkedBox
      console.log(checkbox.checked)
    }

    localStorage.setItem("PageTheme", JSON.stringify(theme));
    localStorage.setItem("checkedBox", JSON.stringify(checkedBox));

    //* *NOTES
    // Light= false
    // Dark= True
    
  }

}








