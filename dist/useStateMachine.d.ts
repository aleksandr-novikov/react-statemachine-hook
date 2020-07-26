import React from 'react';
import { Model, Reducer, Reset } from './types';
export declare const createMachineReducer: (model: Model) => (currentState: string, action: string | Reset) => string;
export declare const useStateMachine: (model: Model) => [React.ReducerState<Reducer>, React.Dispatch<React.ReducerAction<Reducer>>];
