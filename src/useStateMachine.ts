import { Dispatch, ReducerAction, ReducerState, useReducer } from 'react';

const RESET_STATE = 'RESET';

type StringOrNumber = string | number;
type Reducer = (prevState: StringOrNumber, action: string) => any;
interface Model {
  initialState: any;
  states: any;
}

export const createMachineReducer = (model: Model) => (
  currentState: StringOrNumber,
  action: string
): any => {
  if (action === RESET_STATE) return model.initialState;

  const stateTransitions = model.states[currentState];
  if (stateTransitions === undefined) {
    throw new Error(`No transitions defined for ${currentState}`);
  }

  const nextState = stateTransitions[action];
  if (nextState === undefined) {
    throw new Error(
      `Unknown transition for action ${action} in state ${currentState}`
    );
  }

  return nextState;
};

export const useStateMachine = (
  model: Model
): [ReducerState<Reducer>, Dispatch<ReducerAction<Reducer>>] => {
  if (model.initialState === undefined) {
    throw new Error(`No initialState specified for ${model}`);
  }

  return useReducer(createMachineReducer(model), model.initialState);
};
