import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared.module';
import { HeaderComponent } from '../components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { NgModel, FormsModule } from '@angular/forms';
import {
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthComponent,
    PagesComponent,
    LoginComponent,
    HeaderComponent,
    AuthComponent,
    ProfileComponent
  ],
  exports: [AuthComponent, LoginComponent, HeaderComponent, ProfileComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule
  ]
})
export class PagesModule {}
