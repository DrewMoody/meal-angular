import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MealDay } from 'src/app/shared/models/meal';
import { LongFormDate } from '../../../shared/models/time';

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
