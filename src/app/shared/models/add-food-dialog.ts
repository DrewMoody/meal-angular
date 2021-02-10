import { FoodItem, MealEntry, MealItem } from './meal';

export interface AddFoodData {
  date?: moment.Moment;
  meal?: MealEntry;
}

export interface AddFoodResult {
  date?: moment.Moment;
  meal: MealEntry;
  food: FoodItem;
}
