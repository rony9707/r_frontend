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
    this.browserRefresh = browserRefresh;
    //console.log('refreshed?:', browserRefresh);
    let GetTheme = JSON.parse(localStorage.getItem("PageTheme") || '{}');
    if (GetTheme === "Light Mode") {
      document.body.classList.add('light-theme');
    }
    else if (GetTheme === "Dark Mode") {
      document.body.classList.add();
    }
    else {
      document.body.classList.add('light-theme');//If someone deletes data from local stroage fix
    }
  }

  //Code for back button
  back() {
    window.history.back();
  }

  //theme
  theme = JSON.parse(localStorage.getItem("PageTheme") || '{}');







  toggleDarkTheme(): void {
    var setTheme = document.body;
    setTheme.classList.toggle('light-theme');
    var theme;
    if (setTheme.classList.contains('light-theme')) {
      theme = "Light Mode";
      this.theme = "Light Mode"
    }
    else {
      theme = "Dark Mode";
      this.theme = "Dark Mode"
    }
    localStorage.setItem("PageTheme", JSON.stringify(theme));
  }


}






