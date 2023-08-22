import { Component, OnInit } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  username: any;
  // authenticated: any = false
  constructor(
    private userData: UserdataService,
    private route: ActivatedRoute,
    private route1: Router,
    private location: Location
  ) { }
  public usernameID;
  ngOnInit(): void {

    // Get data from backend and show in frontend
    this.userData.users().subscribe((data: any) => {
      this.username = `${data.username}`

      //compare route with username so that 404 works when username is changed

          //Gets the name of the dynamic route
      let usernameIDParam = this.route.snapshot.paramMap.get('usernameID');
      this.usernameID = usernameIDParam
      if (this.usernameID != this.username) {
        this.route1.navigate(['**'])
        this.location.replaceState(`/user/${this.username}`);
      }
    },
      (err) => {
      }
    )






  }




}
