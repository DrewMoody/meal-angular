import { LongFormDate } from '../../../shared/models/time';
import { MealDay } from '../../../shared/models/meal';

export interface DashTime {
  moment: moment.Moment;
  relativeTime: string;
  longFormDate: LongFormDate;
}

export interface DashState extends DashTime {
  meals: MealDay;
}
