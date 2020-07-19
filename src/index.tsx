import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useStateMachine } from './useStateMachine';
import { loaderModel } from './loaderModel';

const NotLoaded = ({ onLoad }: { onLoad: () => void }) => (
  <div>
    Not loaded
    <button type="submit" onClick={onLoad}>
      Load
    </button>
  </div>
);

const Loading = () => {
  return (
    <div>
      <button type="submit" disabled>
        Loading...
      </button>
    </div>
  );
};

const Loaded = ({ onLoadMore }: { onLoadMore: () => void }) => (
  <div>
    Loaded
    <button type="submit" onClick={onLoadMore}>
      Load more
    </button>
  </div>
);

const Reset = ({ onReset }: { onReset: () => void }) => (
  <div>
    <button type="submit" onClick={onReset}>
      Reset
    </button>
  </div>
);

const Loader = () => {
  const [currentState, changeState] = useStateMachine(loaderModel);

  useEffect(() => {
    if (currentState === 'loading')
      setTimeout(() => changeState('SUCCESS'), 500); // simulate loading
  }, [currentState, changeState]);

  switch (currentState) {
    case 'notLoaded':
      return <NotLoaded onLoad={() => changeState('LOAD')} />;
    case 'loading':
      return <Loading />;
    case 'loaded':
      return (
        <>
          <Loaded onLoadMore={() => changeState('LOAD_MORE')} />
          <Reset onReset={() => changeState('RESET')} />
        </>
      );
    default:
      throw new Error(`Cannot render state ${currentState}`);
  }
};

ReactDOM.render(<Loader />, document.getElementById('main'));
