export enum TimeActions {
  SetTime,
  AdjustTime,
}

export interface SetTimeAction {
  type: TimeActions.SetTime;
  time: moment.Moment;
}

export interface AdjustTimeAction {
  type: TimeActions.AdjustTime;
  daysFromCurrentDay: number;
}

export type TimeAction = SetTimeAction | AdjustTimeAction;
