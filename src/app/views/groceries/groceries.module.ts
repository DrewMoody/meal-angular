import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroceriesRoutingModule } from './groceries-routing.module';
import { GroceriesComponent } from './groceries.component';


@NgModule({
  declarations: [GroceriesComponent],
  imports: [
    CommonModule,
    GroceriesRoutingModule
  ]
})
export class GroceriesModule { }
