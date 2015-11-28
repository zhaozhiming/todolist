import { compose, createStore, combineReducers } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(combineReducers(require('../reducers')))
    );
  }

  return store;
}

