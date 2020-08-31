import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MealDay } from 'src/app/shared/meal-types';
import { timer, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'mpa-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashHeaderComponent implements OnInit {
  @Input() mealDay: MealDay;
  @Input() set moment(moment: moment.Moment) {
    this.formattedDate = {
      day: moment.format('dddd'),
      date: moment.format('MMMM Do'),
    };
  }
  formattedDate: {
    day: string;
    date: string;
  };
  test: Observable<number>;

  constructor() {
    this.test = timer(0, 2000).pipe(
      map((x) => x * 10),
      takeWhile((x) => x <= 100)
    );
  }

  ngOnInit(): void {}
}
