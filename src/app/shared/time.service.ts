import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor() {}

  getDay(daysFromToday: number = 0): moment.Moment {
    return moment().add(daysFromToday, 'days');
  }

  getRelativeFormattedTime(date: moment.Moment): string {
    return date.calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'L',
    });
  }

  formatMomentUTC(date: moment.Moment): string {
    return date.format('YYYY-MM-DD');
  }

  getMomentFromFormattedUTCDate(date: string): moment.Moment {
    const { year, month, day } = this.parseFormattedUTCDate(date);
    return moment([year, month, day]);
  }

  parseFormattedUTCDate(
    date: string
  ): { year: number; month: number; day: number } {
    return {
      year: Number(date.slice(0, 4)),
      month: Number(date.slice(5, 7)),
      day: Number(date.slice(8)),
    };
  }
}
