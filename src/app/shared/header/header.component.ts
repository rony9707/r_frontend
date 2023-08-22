import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/services/userdata.service';
import swal from 'sweetalert2';

@Component({
  selector: 'appheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userData: UserdataService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }



  //SubTitle hover code
  subTitle_Header = 'Welcome to the realm'
  letters = "abcdefghijklmnopqrstuvwxyz";
  interval: any = null;
  count = 0
  subTitle(event: any) {
    this.count = this.count + 1
    if (this.count > 5) {
      let iteration = 0;

      clearInterval(this.interval);

      this.interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return this.letters[Math.floor(Math.random() * 26)]
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(this.interval);
        }

        iteration += 1 / 3;
      }, 30);

    }
  }

  username:any
  goToUserProfile(){

    this.userData.users().subscribe((data:any)=>{
      this.username=`${data.username}`
      this.router.navigate(['/user',this.username])
    },
    (err)=>{
      this.router.navigate(['/login'])

      swal.fire({
        title: "Not Logged in",
        text: "Login required for application access.",
        icon: "info",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true, // Show progress bar
        showConfirmButton: false // Hide the "OK" button
      });
    }
    )
    
  }

}
