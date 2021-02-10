export interface CalorieInformation {
  servingSize: string;
  calories: number;
  fat: number;
  carbs: number;
  netCarbs: number;
  protein: number;
}

export interface Ingredient {
  id: string;
  name: string;
  calorieInformation: CalorieInformation;
}

export interface FoodItem extends Ingredient {
  ingredients: Ingredient[];
  recipe: string[];
}

export interface MealItem {
  id: string;
  foodItems: FoodItem[];
  calorieInformation: CalorieInformation;
}

export enum MealEntry {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snacks = 'snacks',
}

export interface MealDay {
  meals: Record<MealEntry, MealItem>;
  calorieInformation: CalorieInformation;
}
