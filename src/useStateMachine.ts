import React, { useReducer } from 'react';
import { Model, Reducer, Reset } from './types';

export const createMachineReducer = (model: Model) => (
  currentState: string,
  action: string | Reset
): string => {
  if (action === 'RESET') return model.initialState;

  const stateTransitions = model.states[currentState];
  if (stateTransitions === undefined) {
    throw new Error(`No transitions defined for ${currentState}`);
  }

  if (stateTransitions.constructor !== Object) {
    throw new Error(`Wrong transitions model: ${stateTransitions}`);
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
): [
  React.ReducerState<Reducer>,
  React.Dispatch<React.ReducerAction<Reducer>>
] => {
  if (model.initialState === undefined) {
    throw new Error(`No initialState specified for ${model}`);
  }

  return useReducer(createMachineReducer(model), model.initialState);
};
