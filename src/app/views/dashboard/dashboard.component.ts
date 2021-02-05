import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { MealsService } from '../../shared/meals/meals.service';
import { TimeService } from 'src/app/shared/time/time.service';
import { MealDay, MealEntry } from 'src/app/shared/meals/meal-types';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  scan,
  map,
  startWith,
  switchMap,
  tap,
  shareReplay,
} from 'rxjs/operators';
import {
  generateMealDay,
  generateFoodItem,
  generateCalorieInformation,
} from '../../shared/meals/meal-helpers';
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
    private timeService: TimeService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.mealsService.initialize();
    this.day = new BehaviorSubject('none');

    this.day$ = this.day.asObservable().pipe(
      scan((acc: moment.Moment, curr: string) => {
        switch (curr) {
          case 'previous':
            return acc.subtract(1, 'days');
          case 'next':
            return acc.add(1, 'days');
          default:
            return acc;
        }
      }, this.timeService.getDay()),
      startWith(this.timeService.getDay()),
      map((moment) => ({
        moment,
        relativeTime: this.timeService.getRelativeFormattedTime(moment),
        longFormDate: this.timeService.getLongFormDate(moment),
      })),
      shareReplay(1)
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

    const genMeal = generateMealDay();

    this.mealsService.setMealsForDay(
      this.timeService.formatMomentUTC(this.timeService.getDay()),
      {
        ...genMeal,
        meals: {
          ...genMeal.meals,
          [MealEntry.Breakfast]: {
            id: 'Test',
            foodItems: [
              generateFoodItem('green beans'),
              generateFoodItem('red beans'),
            ],
            calorieInformation: generateCalorieInformation(),
          },
        },
      }
    );

    const test = generateFoodItem('green beans');
    test.calorieInformation.calories = 100;
    test.calorieInformation.protein = 25;

    this.mealsService.setMealItem(
      this.timeService.formatMomentUTC(this.timeService.getDay()),
      MealEntry.Breakfast,
      {
        id: 'Breakfast',
        foodItems: [test, test, test],
        calorieInformation: generateCalorieInformation(),
      }
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
    this.day.next('previous');
  }

  onChevronRightClick(): void {
    this.day.next('next');
  }
}
