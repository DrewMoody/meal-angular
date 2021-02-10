import { Injectable } from '@angular/core';
import { MealDay, MealItem, MealEntry, FoodItem } from '../models/meal';
import { TimeService } from '../time/time.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  MealsState,
  MealsServiceActions as Actions,
  MealsServiceAction as Action,
  MealsServiceReducer,
} from './meals-service-models';
import { StoreSubject } from '../store';
import {
  calculateMealDay,
  calculateMealItem,
  generateMealDay,
} from '../helpers/meal';

const MEALS_ID = 'meals';

const INIT_MEALS_STATE: MealsState = {
  mealsByDay: {},
};

/**
 * Key for mealsByDay is string MM/DD/YYYY
 */

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

  // TODO: This doesn't seem to belong here...
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

  protected saveMealsToStorage(meals: { [x: number]: MealDay }): void {
    console.log(meals);
    localStorage.setItem(MEALS_ID, JSON.stringify(meals));
  }

  /**
   * ACTIONS
   */

  setMealsForDay(day: string, meals: MealDay): void {
    this.dispatch({ type: Actions.SetMealDay, day, meals });
  }

  setMealItem(day: string, entry: MealEntry, meal: MealItem): void {
    this.dispatch({ type: Actions.SetMealItem, day, entry, meal });
  }

  setFoodItem(day: string, entry: MealEntry, food: FoodItem): void {
    this.dispatch({ type: Actions.SetFoodItem, day, entry, food });
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

  private mealsByDay: MealsServiceReducer<'mealsByDay'> = (state, action) => {
    const mealDay: MealDay = state[action.day] || generateMealDay();

    let updatedMeals: { [x: string]: MealDay };

    switch (action.type) {
      case Actions.SetMealDay:
        updatedMeals = {
          ...state,
          [action.day]: action.meals,
        };
        break;
      case Actions.SetMealItem:
        const meals = {
          ...mealDay.meals,
          [action.entry]: calculateMealItem(action.meal),
        };
        calculateMealDay(mealDay);
        updatedMeals = {
          ...state,
          [action.day]: calculateMealDay({ ...mealDay, meals }),
        };
        break;
      case Actions.SetFoodItem:
        const entry: MealItem = calculateMealItem({
          ...mealDay.meals[action.entry],
          foodItems: [...mealDay.meals[action.entry].foodItems, action.food],
        });
        updatedMeals = {
          ...state,
          [action.day]: calculateMealDay({
            ...mealDay,
            meals: { ...mealDay.meals, [action.entry]: entry },
          }),
        };
        break;
      default:
        return state;
    }
    this.saveMealsToStorage(updatedMeals);
    return updatedMeals;
  };

  /** TODO: Explore why tap is running before `this` is available? Seems to be RxJS bug. Temporarily reverting to running side effects on reducer */
  sideEffects(state: MealsState) {
    // if (this.saveMealsToStorage != undefined) {
    //   this.saveMealsToStorage(state.mealsByDay);
    // }
  }
}
