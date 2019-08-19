import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

    const enhancer = composeEnhancers(
      applyMiddleware(thunk),
      // other store enhancers if any
    );

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
        persistedReducer,
        inititalState,
        compose(enhancer));

export let persistor = persistStore(store);
