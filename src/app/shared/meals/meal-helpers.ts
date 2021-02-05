import {
  CalorieInformation,
  FoodItem,
  MealItem,
  MealDay,
  MealEntry,
} from './meal-types';
import { v4 } from 'uuid';

export function generateCalorieInformation(): CalorieInformation {
  return {
    servingSize: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    netCarbs: 0,
    protein: 0,
  };
}

export function generateFoodItem(name: string): FoodItem {
  return {
    id: v4(),
    name,
    ingredients: [],
    recipe: [],
    calorieInformation: generateCalorieInformation(),
  };
}

export function generateMealItem(name: string): MealItem {
  return {
    id: v4(),
    foodItems: [],
    calorieInformation: generateCalorieInformation(),
  };
}

export function generateMealDay(): MealDay {
  return {
    meals: {
      [MealEntry.Breakfast]: generateMealItem('Breakfast'),
      [MealEntry.Lunch]: generateMealItem('Lunch'),
      [MealEntry.Dinner]: generateMealItem('Dinner'),
      [MealEntry.Snacks]: generateMealItem('Snacks'),
    },
    calorieInformation: generateCalorieInformation(),
  };
}

/**
 * Takes a meal item and calculates its calorie information
 * Used prior to adding or editing setting a meal to state
 */
export function calculateMealItem(meal: MealItem): MealItem {
  return {
    ...meal,
    calorieInformation: meal.foodItems.reduce((acc, curr) => {
      const { calorieInformation: currCals } = curr;
      return {
        servingSize: '',
        calories: acc.calories + currCals.calories,
        fat: acc.fat + currCals.fat,
        carbs: acc.carbs + currCals.carbs,
        netCarbs: acc.netCarbs + currCals.netCarbs,
        protein: acc.protein + currCals.protein,
      };
    }, generateCalorieInformation()),
  };
}
