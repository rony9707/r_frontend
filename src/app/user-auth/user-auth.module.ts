import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ClickOutsideDirective
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserAuthModule { }
