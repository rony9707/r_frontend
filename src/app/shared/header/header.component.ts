import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appheader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //siteTitle = 'Just A Normal Header'
  subTitle = 'Welcome to my domain'


}
