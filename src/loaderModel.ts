export const loaderModel = {
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
