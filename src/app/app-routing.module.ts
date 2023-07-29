import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './home/about-me/about-me.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: AboutMeComponent,
    path: 'mySelf'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],  /*angular scrool to top during route without animation */
  exports: [RouterModule]
})
export class AppRoutingModule { }
