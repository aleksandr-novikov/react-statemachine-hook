# react-statemachine-hook

React hook providing finite State Machine to your component.

## Installation
```
npm install react-statemachine-hook
```

## Requirements
React v^16.9.0

## API

### useStateMachine
```typescript

useStateMachine(
    model: { // model is a javascript object representing state machine
             initialState: string;
             states: { 
                [key: string]: { 
                    [key: string]: string;
                }; 
             };
           }
) => [string, (value: string) => void];

/* 
  Sample State Machine model
  There is a one reserved action name called 'RESET' which resets State Machine to initialState
*/
const sampleModel = {
  initialState: 'someState',
  states: {
    someState: {
      ACTION_NAME: 'anotherState',
    },
    ...
  },
};

```

## Usage

Please check out [src/sample-app](src/sample-app) as an example.

```tsx
import React, { useEffect } from 'react';
import { useStateMachine } from 'react-statemachine-hook';

/* 
  Model must contain 2 properties:
    initialState - initial state of your State Machine
    states - object containing all possible states as keys with transitions
             to another states using action names as keys
*/
const loaderModel = {
  initialState: 'notLoaded',
  states: {
    notLoaded: {
      LOAD: 'loading',
    },
    loading: {
      SUCCESS: 'loaded',
    },
    loaded: {
      LOAD_MORE: 'loading',
    },
  },
};

export const Loader: React.FunctionComponent = () => {
  /* 
    useStateMachine hook returns currentState (model initialState on first render)
    and changeState method which takes action name and based on it changes currentState.
  */
  const [currentState, changeState] = useStateMachine(loaderModel);

  useEffect(() => {
    if (currentState === 'loading')
      setTimeout(() => changeState('SUCCESS'), 500);
  }, [currentState, changeState]);

  switch (currentState) {
    case 'notLoaded':
      return (
        <div>
          Not loaded
          <button type="submit" onClick={() => changeState('LOAD')}>
            Load
          </button>
        </div>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'loaded':
      return (
        <div>
          Loaded
          <button type="submit" onClick={() => changeState('LOAD_MORE')}>
            Load more
          </button>
          <button type="submit" onClick={() => changeState('RESET')}>
            Reset
          </button>
        </div>
      );
    default:
      throw new Error(`Cannot render state ${currentState}`);
  }
};

```

## License

Copyright (c) 2020 Aleksandr Novikov. MIT License.
