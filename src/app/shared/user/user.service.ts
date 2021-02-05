import { Injectable } from '@angular/core';
import { StoreSubject } from '../store';
import {
  UserState,
  UserServiceReducer,
  UserServiceAction as Action,
  UserServiceActions as Actions,
  UserInfo,
} from './user-service-types';

const USER_STORAGE_ID = 'USER_INFO';

const INIT_USER_STATE: UserState = {
  user: {
    name: 'Drew',
    dailyGoal: 1800,
  },
};

@Injectable({
  providedIn: 'root',
})
export class UserService extends StoreSubject<UserState, Action> {
  constructor() {
    super();
  }

  initialize(): void {
    const user = this.getUserStateFromStorage();
    this.initStore({ ...INIT_USER_STATE, ...user });
  }

  private getUserStateFromStorage(): UserState {
    return JSON.parse(localStorage.getItem(USER_STORAGE_ID)) || {};
  }

  private saveUserStateToStorage(userState: UserState): void {
    localStorage.setItem(USER_STORAGE_ID, JSON.stringify(userState));
  }

  /**
   * ACTIONS
   */

  setUser(user: UserInfo): void {
    this.dispatch({ type: Actions.SetUser, user });
  }

  /**
   * REDUCERS
   */

  /**
   * TODO: reducer should NOT be managing the storage action
   */

  protected reducer(state: UserState, action: Action): UserState {
    const updatedState = {
      ...state,
      user: this.user(state.user, action),
    };
    this.saveUserStateToStorage(updatedState);
    return updatedState;
  }

  user: UserServiceReducer<'user'> = (state, action) => {
    switch (action.type) {
      case Actions.SetUser:
        return action.user;
      default:
        return state;
    }
  };
}
