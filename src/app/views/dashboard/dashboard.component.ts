import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MealsService } from '../../shared/meals/meals.service';
import { TimeService } from 'src/app/shared/time/time.service';
import { MealDay, MealEntry, MealItem } from 'src/app/shared/models/meal';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { generateMealDay } from '../../shared/helpers/meal';
import { KeyValue } from '@angular/common';
import { DashTime, DashState } from './shared/models';

@Component({
  selector: 'mpa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  day: BehaviorSubject<'previous' | 'none' | 'next'>;
  day$: Observable<DashTime>;
  dashState$: Observable<DashState>;

  constructor(
    private mealsService: MealsService,
    private timeService: TimeService
  ) {}

  ngOnInit(): void {
    this.mealsService.initialize();

    this.day$ = this.timeService.getCurrentDay$().pipe(
      map((moment) => ({
        moment,
        relativeTime: this.timeService.getRelativeFormattedTime(moment),
        longFormDate: this.timeService.getLongFormDate(moment),
      }))
    );

    this.dashState$ = this.day$.pipe(
      switchMap((day) =>
        this.mealsService
          .getMealsByDay(this.timeService.formatMomentUTC(day.moment))
          .pipe(
            map<MealDay, DashState>((meals: MealDay | undefined) => ({
              ...day,
              meals: meals || generateMealDay(),
            }))
          )
      )
    );
  }

  /**
   * Used to prevent Angular from sorting
   */
  keepKeyValueOriginalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  onChevronLeftClick(): void {
    this.timeService.adjustCurrentDay(-1);
  }

  onChevronRightClick(): void {
    this.timeService.adjustCurrentDay(1);
  }

  trackMeals(i: number, item: { key: MealEntry; value: MealItem }) {
    return item.key;
  }
}
