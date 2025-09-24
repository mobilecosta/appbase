import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './features/login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
     HttpClientModule,
    FormsModule,
    PoModule
  ]
})
export class AppModule { }
