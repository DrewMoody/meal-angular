import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

export type Action = {
  type: any;
};

/**
 * NOTE: initial asyncState MUST complete (not be an active stream).
 * It's better to initialize blank, do async work service side,
 * then use dispatch updates as they become available
 */
export abstract class StoreSubject<S, A extends Action> {
  private store!: ReplaySubject<A>;
  private state!: Observable<S>;
  /** Default state is state that gets updated manually in case of need to revert changes */
  protected defaultState!: S;

  protected initStore(
    syncState: S | Partial<S>,
    asyncState?: Observable<Partial<S>>[]
  ): void {
    this.store = new ReplaySubject<A>();
    const initStoreVals = (initState: S) => {
      this.defaultState = initState;
      return this.store.asObservable().pipe(
        startWith({ type: 'INIT' } as A),
        scan<A, S>(
          (acc, curr, i) => (i === 0 ? initState : this.reducer(acc, curr)),
          initState
        )
      );
    };

    this.state =
      asyncState && asyncState.length
        ? forkJoin(asyncState).pipe(
            map<Partial<S>[], S>(
              (x) =>
                x.reduce((acc, curr) => ({ ...acc, ...curr }), syncState) as S
            ),
            switchMap((initState) => initStoreVals(initState)),
            shareReplay(1)
          )
        : initStoreVals(syncState as S).pipe(shareReplay(1));
  }

  dispatch(action: A, updateDefault = false): void {
    if (!!updateDefault) {
      this.updateDefaultState(action);
    }

    this.store.next(action);
  }

  updateDefaultState(action: A): void {
    this.defaultState = this.reducer(this.defaultState, action);
  }

  getState(): Observable<S> {
    return this.state;
  }

  getStateProp<K extends keyof S>(key: K): Observable<S[K]> {
    return this.state.pipe(
      map((state) => state[key]),
      distinctUntilChanged()
    );
  }

  /**
   * should call initStore
   */
  abstract initialize(): void;

  protected abstract reducer(state: S, action: A): S;
}
