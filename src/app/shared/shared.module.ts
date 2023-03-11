import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    UnderConstructionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    UnderConstructionComponent
  ]
})
export class SharedModule { }
