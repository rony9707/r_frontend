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

}
