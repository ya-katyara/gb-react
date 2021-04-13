import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor  } from "./store";
import App from './containers/app';
import "./styles.scss";

ReactDOM.render(
   <Provider store={store}>
      {/* <PersistGate loading={<span>Loading</span>} persistor={persistor}> */}
         <App />
      {/* </PersistGate> */}
   </Provider>,
   document.getElementById('root')
);