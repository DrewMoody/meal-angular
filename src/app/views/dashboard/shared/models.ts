import { LongFormDate } from '../../../shared/time/time-types';
import { MealDay } from '../../../shared/meals/meal-types';

export interface DashTime {
  moment: moment.Moment;
  relativeTime: string;
  longFormDate: LongFormDate;
}

export interface DashState extends DashTime {
  meals: MealDay;
}
