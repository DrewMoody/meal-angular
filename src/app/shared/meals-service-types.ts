import { MealDay, MealItem, MealEntry } from './meal-types';

export interface MealsState {
  mealsByDay: { [key: string]: MealDay };
}

export type MealsServiceReducer<K extends keyof MealsState> = (
  state: MealsState[K],
  action: MealsServiceAction
) => MealsState[K];

export type MealsServiceAction = MealDayAction | MealItemAction;

export enum MealsServiceActions {
  SetMealDay,
  SetMealItem,
}

export interface MealDayAction {
  type: MealsServiceActions.SetMealDay;
  day: string;
  meals: MealDay;
}

export interface MealItemAction {
  type: MealsServiceActions.SetMealItem;
  day: string;
  entry: MealEntry;
  meal: MealItem;
}
