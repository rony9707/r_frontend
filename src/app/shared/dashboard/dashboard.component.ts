import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { browserRefresh } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public _userDataService: UserdataService
  ) { }

  //Browser refresh code for dark and light theme
  browserRefresh: boolean | undefined

  ngOnInit(): void {
    //Browser refresh code for dark and light theme
    if (this.browserRefresh = browserRefresh) {
      //console.log('refreshed?:', browserRefresh);
      let GetTheme = JSON.parse(localStorage.getItem("PageTheme") || '{}');
      const checkbox: any = document.getElementById('darkmode-toggle');
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
    }
    else {
      theme = "Dark Mode";
      this.theme = "Dark Mode"
      checkedBox = true
      checkbox.check = checkedBox
    }

    localStorage.setItem("PageTheme", JSON.stringify(theme));
    localStorage.setItem("checkedBox", JSON.stringify(checkedBox));

    //* *NOTES
    // Light= false
    // Dark= True

  }


  //Logout Button
  logout(): void {
    // this.http.post('http://localhost:3000/api/logout', {},
    //   { withCredentials: true })
    //   .subscribe(() => {
    //     swal.fire({
    //       title: "Log out",
    //       text: "You are successfully logged out",
    //       icon: "success",
    //       timer: 1000, // Auto close after 2 seconds
    //       timerProgressBar: true, // Show progress bar
    //       showConfirmButton: false // Hide the "OK" button
    //     });
    //     localStorage.removeItem('token')
    //   })
   

      this._userDataService.logoutUser()
      .subscribe(() => {
        swal.fire({
          title: "Log out",
          text: "You are successfully logged out",
          icon: "success",
          timer: 1000, // Auto close after 2 seconds
          timerProgressBar: true, // Show progress bar
          showConfirmButton: false // Hide the "OK" button
        });
      })
  }

}








