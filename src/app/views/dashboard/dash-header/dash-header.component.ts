import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MealDay } from 'src/app/shared/meals/meal-types';
import { timer, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { LongFormDate } from '../../../shared/time/time-types';

@Component({
  selector: 'mpa-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashHeaderComponent implements OnInit {
  @Input() mealDay: MealDay;
  @Input() longFormDate: LongFormDate;
  goalCals: number = 1800;

  constructor() {}

  ngOnInit(): void {}
}
