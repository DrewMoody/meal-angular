import { NgModule } from '@angular/core';
import { MealWidgetComponent } from './meal-widget.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [MealWidgetComponent],
  imports: [CommonModule, MatIconModule, MatExpansionModule],
  providers: [],
  exports: [MealWidgetComponent],
})
export class MealWidgetModule {}
