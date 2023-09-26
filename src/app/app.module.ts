import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationDialogModule } from './common/dialog/confirmation-dialog/confirmation-dialog.module';
import { UserService } from './pages/users/model/user.service';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UsersModule,
    HttpClientModule,
    ConfirmationDialogModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
