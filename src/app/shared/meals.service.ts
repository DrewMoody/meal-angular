import { Injectable } from '@angular/core';
import { MealDay, MealItem, MealEntry } from './meal-types';
import { TimeService } from './time.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import {
  MealsState,
  MealsServiceActions as Actions,
  MealsServiceAction as Action,
  MealsServiceReducer,
} from './meals-service-types';
import { StoreSubject } from './store';
import { calculateMealItem, generateMealDay } from './meal-helpers';

const MEALS_ID = 'meals';

const INIT_MEALS_STATE: MealsState = {
  mealsByDay: {},
};

@Injectable({
  providedIn: 'root',
})
export class MealsService extends StoreSubject<MealsState, Action> {
  constructor(private timeService: TimeService) {
    super();
  }

  initialize(): void {
    const mealsByDay = this.getMealsFromStorage();
    this.initStore({ ...INIT_MEALS_STATE, mealsByDay });
  }

  getDay(daysFromToday?: number): moment.Moment {
    return this.timeService.getDay(daysFromToday);
  }

  getMealsByDay(day: string): Observable<MealDay> {
    return this.getStateProp('mealsByDay').pipe(
      map((mealsByDay) => mealsByDay[day]),
      distinctUntilChanged()
    );
  }

  private getMealsFromStorage(): { [x: number]: MealDay } {
    return JSON.parse(localStorage.getItem(MEALS_ID)) || {};
  }

  private saveMealsToStorage(meals: { [x: number]: MealDay }): void {
    localStorage.setItem(MEALS_ID, JSON.stringify(meals));
  }

  /**
   * ACTIONS
   */

  setMealsForDay(day: string, meals: MealDay): void {
    console.log(meals);
    this.dispatch({ type: Actions.SetMealDay, day, meals });
  }

  setMealItem(day, entry: MealEntry, meal: MealItem): void {
    this.dispatch({ type: Actions.SetMealItem, day, entry, meal });
  }

  /**
   * REDUCERS
   */

  protected reducer(state: MealsState, action: Action): MealsState {
    return {
      ...state,
      mealsByDay: this.mealsByDay(state.mealsByDay, action),
    };
  }

  /**
   * TODO: reducer should NOT be managing the save action
   */
  private mealsByDay: MealsServiceReducer<'mealsByDay'> = (state, action) => {
    let updatedMeals: { [x: string]: MealDay };
    switch (action.type) {
      case Actions.SetMealDay:
        updatedMeals = {
          ...state,
          [action.day]: action.meals,
        };
        break;
      case Actions.SetMealItem:
        const mealDay: MealDay = state[action.day] || generateMealDay();
        updatedMeals = {
          ...state,
          [action.day]: {
            ...mealDay,
            meals: {
              ...mealDay.meals,
              [action.entry]: calculateMealItem(action.meal),
            },
          },
        };
        break;
      default:
        return state;
    }
    this.saveMealsToStorage(updatedMeals);
    return updatedMeals;
  };
}
