import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { profileReducer } from "./profile/reducer";
import { chatsReducer } from "./chats/reducer";

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['profile', 'chats'],
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     profile: profileReducer,
//     chats: chatsReducer
//   }),
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chats: chatsReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

// export const persistor = persistStore(store);