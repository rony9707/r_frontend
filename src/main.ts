import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//Mouse Pointer Code
const blob: any = document.getElementById("blob");


window.onpointermove = event => {
  const { pageX, pageY } = event;

  blob.animate({
    left: `${pageX}px`,
    top: `${pageY}px`
  }, { duration: 2500, fill: "forwards" });
}

window.addEventListener('scroll', function () {
  var scrollY = window.scrollY;
  // console.log(scrollY)
});
