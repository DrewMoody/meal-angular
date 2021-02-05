export interface UserInfo {
  name: string;
  dailyGoal: number;
}

export interface UserState {
  user: UserInfo;
}

export type UserServiceReducer<K extends keyof UserState> = (
  state: UserState[K],
  action: UserServiceAction
) => UserState[K];

export type UserServiceAction = UserAction;

export enum UserServiceActions {
  SetUser,
}

export interface UserAction {
  type: UserServiceActions.SetUser;
  user: UserInfo;
}
