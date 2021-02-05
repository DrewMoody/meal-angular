export interface CalorieInformation {
  servingSize: string;
  calories: number;
  fat: number;
  carbs: number;
  netCarbs: number;
  protein: number;
}

export interface FoodItem {
  id: string;
  name: string;
  ingredients: FoodItem[];
  recipe: string[];
  calorieInformation: CalorieInformation;
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
