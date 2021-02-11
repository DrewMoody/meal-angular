import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StdLayoutModule } from './components/std-layout/std-layout.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddFoodModule } from './components/add-food/add-food.module';
import { MessageDialogModule } from './components/message-dialog/message-dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StdLayoutModule,
    MatMomentDateModule,
    AddFoodModule,
    MessageDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
