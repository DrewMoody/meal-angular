import { NgModule } from '@angular/core';
import { StdLayoutComponent } from './std-layout.component';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator/navigator.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StdLayoutComponent, NavigatorComponent],
  imports: [CommonModule, MatIconModule],
  providers: [],
  exports: [StdLayoutComponent, NavigatorComponent],
})
export class StdLayoutModule {}
