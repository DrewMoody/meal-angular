import { NgModule } from '@angular/core';
import { StdLayoutComponent } from './std-layout.component';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator/navigator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AddFoodModule } from '../add-food/add-food.module';

@NgModule({
  declarations: [StdLayoutComponent, NavigatorComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, AddFoodModule],
  providers: [],
  exports: [StdLayoutComponent, NavigatorComponent],
})
export class StdLayoutModule {}
