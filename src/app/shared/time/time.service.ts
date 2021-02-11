import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, scan, shareReplay, tap } from 'rxjs/operators';
import { LongFormDate } from '../models/time';
import { TimeAction, TimeActions } from './time-service-models';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  /** Escape hatch for non-observable form. This is a CLONE of the observable */
  private _currentDay: moment.Moment;
  private readonly currentDay: BehaviorSubject<TimeAction> = new BehaviorSubject(
    { type: TimeActions.SetTime, time: moment() }
  );
  private readonly currentDay$: Observable<moment.Moment> = this.currentDay.pipe(
    scan((acc, curr) => this.reducer(acc, curr), moment()),
    tap((currentDay) => (this._currentDay = currentDay.clone())),
    shareReplay(1)
  );

  constructor() {}

  /** Escape hatch to get non-observable copy. TODO: Consider refactor */
  getCurrentDay() {
    return this._currentDay;
  }

  /** Returns clone to avoid accidental mutation */
  getCurrentDay$() {
    return this.currentDay$.pipe(map((currentDay) => currentDay.clone()));
  }

  setCurrentDay(time: moment.Moment) {
    this.currentDay.next({ type: TimeActions.SetTime, time });
  }

  adjustCurrentDay(daysFromCurrentDay: number) {
    this.currentDay.next({ type: TimeActions.AdjustTime, daysFromCurrentDay });
  }

  reducer(state: moment.Moment, action: TimeAction) {
    switch (action.type) {
      case TimeActions.SetTime:
        return action.time;
      case TimeActions.AdjustTime:
        return state.add(action.daysFromCurrentDay, 'days');
      default:
        return state;
    }
  }

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

  getLongFormDate = (date: moment.Moment): LongFormDate => ({
    day: date.format('dddd'),
    date: date.format('MMMM Do'),
  });

  formatMomentUTC(date: moment.Moment): string {
    return date.format('MM/DD/YYYY');
  }

  getMomentFromFormattedUTCDate(date: string): moment.Moment {
    const { year, month, day } = this.parseFormattedUTCDate(date);
    return moment([year, month, day]);
  }

  parseFormattedUTCDate(
    date: string
  ): { year: number; month: number; day: number } {
    return {
      year: Number(date.slice(6)),
      month: Number(date.slice(0, 2)),
      day: Number(date.slice(3, 5)),
    };
  }
}
