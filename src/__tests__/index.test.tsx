import React, { useEffect } from 'react';
import { mount, configure, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useStateMachine } from '../useStateMachine';
import { Model } from '../types';

configure({ adapter: new Adapter() });

export const loaderModel = {
  initialState: 'notLoaded',
  states: {
    notLoaded: {
      LOAD: 'loading',
      NOT_VALID: 'not_valid',
    },
    loading: {
      SUCCESS: 'loaded',
    },
    loaded: {
      LOAD_MORE: 'loading',
    },
  },
};

interface Props {
  model: Model;
}

const Loader: React.FunctionComponent<Props> = ({ model }) => {
  const [currentState, changeState] = useStateMachine(model);

  useEffect(() => {
    if (currentState === 'loading') changeState('SUCCESS');
  }, [currentState, changeState]);

  const renderState = (state: string) => <div id="state">{state}</div>;

  switch (currentState) {
    case 'notLoaded':
      return (
        <>
          {renderState(currentState)}
          <button id="load" type="submit" onClick={() => changeState('LOAD')}>
            Load
          </button>
          <button
            id="invalid"
            type="submit"
            onClick={() => changeState('INVALID')}
          >
            Invalid
          </button>
          <button
            id="not_valid"
            type="submit"
            onClick={() => changeState('NOT_VALID')}
          >
            Not valid
          </button>
        </>
      );
    case 'loading':
      return <div>Loading</div>;
    case 'not_valid':
      return <div>Not valid</div>;
    case 'loaded':
      return (
        <>
          {renderState(currentState)}
          <button type="submit" onClick={() => changeState('LOAD_MORE')}>
            Load more
          </button>
          <button id="reset" type="submit" onClick={() => changeState('RESET')}>
            Reset
          </button>
        </>
      );
    default:
      throw new Error(`Cannot render state ${currentState}`);
  }
};

const clickButton = (component: ReactWrapper<any, any, any>, btn: string) => {
  const button = component.find(btn);
  button.simulate('click');
};

describe('useStateMachine hook', () => {
  test('sets initialState by default', () => {
    const loader = mount(<Loader model={loaderModel} />);
    expect(loader.find('#state').text()).toBe(String(loaderModel.initialState));
  });

  test('makes state transition on action', () => {
    const loader = mount(<Loader model={loaderModel} />);
    clickButton(loader, "button[id='load']");
    expect(loader.find('#state').text()).toBe(String('loaded'));
  });

  test('resets state to initialState on RESET action', () => {
    const loader = mount(<Loader model={loaderModel} />);
    clickButton(loader, "button[id='load']");
    clickButton(loader, "button[id='reset']");
    expect(loader.find('#state').text()).toBe(loaderModel.initialState);
  });

  test('throws error on invalid action', () => {
    const loader = mount(<Loader model={loaderModel} />);
    try {
      clickButton(loader, "button[id='invalid']");
    } catch (e) {
      expect(e.message).toBe(
        `Unknown transition for action INVALID in state notLoaded`
      );
    }
  });

  test('throws error if no transitions defined', () => {
    const loader = mount(<Loader model={loaderModel} />);
    try {
      clickButton(loader, "button[id='not_valid']");
    } catch (e) {
      expect(e.message).toBe(
        `Unknown transition for action INVALID in state notLoaded`
      );
    }
  });
});
