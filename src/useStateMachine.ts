import React, { useMemo, useReducer } from 'react';
import { Model, Reducer, Reset } from './types';

export const createMachineReducer = (model: Model) => (
  currentState: string,
  action: string | Reset
): string => {
  if (action === 'RESET') return model.initialState;

  const stateTransitions = model.states[currentState];
  if (stateTransitions === undefined) {
    throw new Error(`No transitions defined for "${currentState}"`);
  }

  if (stateTransitions.constructor !== Object) {
    throw new Error(`Transitions model should be of type object`);
  }

  const nextState = stateTransitions[action];
  if (nextState === undefined) {
    throw new Error(
      `Unknown transition for action "${action}" in state "${currentState}"`
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
  if (typeof model !== 'object' || model === null) {
    throw new Error(`No valid model passed to useStateMachine hook`);
  }

  const { initialState, states } = model;
  if (initialState === undefined) {
    throw new Error(`No "initialState" property specified in model`);
  }
  if (states === undefined) {
    throw new Error(`No "states" object specified in model`);
  }

  const machineReducer = useMemo(() => createMachineReducer(model), [model]);

  return useReducer(machineReducer, initialState);
};
