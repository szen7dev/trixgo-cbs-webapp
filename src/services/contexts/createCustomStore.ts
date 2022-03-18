/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useReducer, useRef } from 'react';

export type State = object;

/**
 * @deprecated Use the builtin `Partial<T>` instead of `PartialState<T>`.
 * Additionally turn on `--exactOptionalPropertyTypes` tsc flag.
 * `PartialState` will be removed in next major
 */
export type PartialState<
  T extends object,
  K1 extends keyof T = keyof T,
  K2 extends keyof T = K1,
  K3 extends keyof T = K2,
  K4 extends keyof T = K3
> =
  | (Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T)
  | ((state: T) => Pick<T, K1> | Pick<T, K2> | Pick<T, K3> | Pick<T, K4> | T);
export type StateListener<T> = (state: T, previousState: T) => void;
export type GetState<T extends object> = () => T;
export type SetState<T extends object> = {
  <
    K1 extends keyof T,
    K2 extends keyof T = K1,
    K3 extends keyof T = K2,
    K4 extends keyof T = K3
  >(
    partial: PartialState<T, K1, K2, K3, K4>,
    replace?: boolean
  ): void;
};
export type StateSelector<T extends object, U> = (state: T) => U;
export type EqualityChecker<T> = (state: T, newState: T) => boolean;
export type Subscribe<T> = (listener: StateListener<T>) => () => void;
export type Destroy = () => void;
export type StoreApi<T extends object> = {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: Subscribe<T>;
  destroy: Destroy;
};
export type StateCreator<
  T extends object,
  CustomSetState = SetState<T>,
  CustomGetState = GetState<T>,
  CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = (set: CustomSetState, get: CustomGetState, api: CustomStoreApi) => T;

function createStore<
  TState extends object,
  CustomSetState,
  CustomGetState,
  CustomStoreApi extends StoreApi<TState>
>(
  createState: StateCreator<
    TState,
    CustomSetState,
    CustomGetState,
    CustomStoreApi
  >
): CustomStoreApi;

function createStore<TState extends object>(
  createState: StateCreator<TState, SetState<TState>, GetState<TState>, any>
): StoreApi<TState>;

function createStore<
  State extends object,
  CustomSetState,
  CustomGetState,
  CustomStoreApi extends StoreApi<State>
>(
  createState: StateCreator<
    State,
    CustomSetState,
    CustomGetState,
    CustomStoreApi
  >
): CustomStoreApi {
  let state: State;
  const listeners: Set<StateListener<State>> = new Set();

  const setState: SetState<State> = (partial, replace) => {
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === 'function'
        ? (partial as (state: State) => State)(state)
        : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace
        ? (nextState as State)
        : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState: GetState<State> = () => state;

  const subscribe = (listener: StateListener<State>) => {
    listeners.add(listener);

    // unsubscribe
    return () => listeners.delete(listener);
  };
  const destroy: Destroy = () => listeners.clear();

  const api = { subscribe, getState, setState, destroy };
  state = createState(
    setState as unknown as CustomSetState,
    getState as unknown as CustomGetState,
    api as unknown as CustomStoreApi
  );

  return api as unknown as CustomStoreApi;
}

export type UseBoundStore<
  T extends object,
  CustomStoreApi extends StoreApi<T> = StoreApi<T>
> = {
  (): T;
  <U>(selector: StateSelector<T, U>): U;
} & CustomStoreApi;

function createCustomStore<TState extends object>(
  createState:
    | StateCreator<TState, SetState<TState>, GetState<TState>, any>
    | StoreApi<TState>
): UseBoundStore<TState, StoreApi<TState>>;
function createCustomStore<
  State extends object,
  CustomSetState,
  CustomGetState,
  CustomStoreApi extends StoreApi<State>
>(
  createState:
    | StateCreator<State, CustomSetState, CustomGetState, CustomStoreApi>
    | CustomStoreApi
): UseBoundStore<State, CustomStoreApi> {
  const api: CustomStoreApi =
    typeof createState === 'function' ? createStore(createState) : createState;

  const useStore: any = <StateSlice>(
    selector: StateSelector<State, StateSlice> = api.getState as any,
    equalityFn: EqualityChecker<StateSlice> = Object.is
  ) => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0) as [never, () => void];

    const state = api.getState(); // Get state from store
    const stateRef = useRef(state); // Bind init state to ref
    const selectorRef = useRef(selector); // Bind init selector to ref
    const equalityFnRef = useRef(equalityFn); // Bind init equalityFn to ref
    const erroredRef = useRef(false);

    const currentSliceRef = useRef<StateSlice>();

    // Check if currentSliceref is undefined (first render)
    if (currentSliceRef.current === undefined) {
      currentSliceRef.current = selector(state);
    }

    // Declare variable to store previous slice
    let newStateSlice: StateSlice | undefined;
    let hasNewStateSlice = false;

    // The selector or equalityFn need to be called during the render phase if
    // they change. We also want legitimate errors to be visible so we re-run
    // them if they errored in the subscriber.
    if (
      stateRef.current !== state || // State changed
      selectorRef.current !== selector || // Selector changed
      equalityFnRef.current !== equalityFn || // EqualityFn changed
      erroredRef.current
    ) {
      // Using local variables to avoid mutations in the render phase.
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(
        currentSliceRef.current as StateSlice,
        newStateSlice
      );
    }

    // Syncing changes in useEffect. This is a bit of a hack, but it's the
    // simplest way to make sure that the state is always up to date.
    useEffect(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice as StateSlice; // update current slice
      }
      stateRef.current = state; // update state ref after rerender
      selectorRef.current = selector; // update selector ref after rerender
      equalityFnRef.current = equalityFn;
      erroredRef.current = false;
    });

    useEffect(() => {
      const listener = () => {
        try {
          const nextState = api.getState();
          const nextStateSlice = selectorRef.current(nextState);
          if (
            !equalityFnRef.current(
              currentSliceRef.current as StateSlice,
              nextStateSlice
            )
          ) {
            stateRef.current = nextState;
            currentSliceRef.current = nextStateSlice;
            forceUpdate();
          }
        } catch (error) {
          erroredRef.current = true;
          forceUpdate();
        }
      };
      const unsubscribe = api.subscribe(listener);
      return () => unsubscribe();
    }, []);

    const sliceToReturn = hasNewStateSlice
      ? (newStateSlice as StateSlice)
      : currentSliceRef.current;

    return sliceToReturn;
  };

  Object.assign(useStore, api);

  return useStore;
}

export default createCustomStore;
