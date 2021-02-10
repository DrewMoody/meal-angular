import { MealDay, MealItem, MealEntry, FoodItem } from '../models/meal';

export interface MealsState {
  mealsByDay: { [key: string]: MealDay };
}

export type MealsServiceReducer<K extends keyof MealsState> = (
  state: MealsState[K],
  action: MealsServiceAction
) => MealsState[K];

export type MealsServiceAction =
  | MealDayAction
  | MealItemAction
  | FoodItemAction;

export enum MealsServiceActions {
  SetMealDay,
  SetMealItem,
  SetFoodItem,
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

export interface FoodItemAction {
  type: MealsServiceActions.SetFoodItem;
  day: string;
  entry: MealEntry;
  food: FoodItem;
}
