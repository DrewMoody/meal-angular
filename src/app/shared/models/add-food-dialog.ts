import { FoodItem, MealEntry, MealItem } from './meal';

export interface AddFoodData {
  date?: moment.Moment;
  meal?: MealEntry;
  food?: FoodItem;
}

export interface AddFoodResult {
  date?: moment.Moment;
  meal: MealEntry;
  food: FoodItem;
}
