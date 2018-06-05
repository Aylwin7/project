import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import reducer from '../reducers';
import { AsyncStorage } from 'react-native'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
// import rootReducer from './module'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

// const middleware = [];
// if (process.env.NODE_ENV === 'development') {
//   middleware.push(logger);
// }
// const store = createStore(reducer, applyMiddleware(...middleware));

const persistReducers = persistReducer(persistConfig, reducer)
export const store = createStore(persistReducers)
export const persistor = persistStore(store)


// export default store;