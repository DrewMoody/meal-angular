import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MealWidgetModule } from 'src/app/components/meal-widget/meal-widget.module';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { ProgressRingComponent } from './progress-ring/progress-ring.component';

@NgModule({
  declarations: [DashboardComponent, DashHeaderComponent, ProgressRingComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MealWidgetModule,
  ],
})
export class DashboardModule {}
