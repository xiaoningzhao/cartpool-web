import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router
} from "react-router-dom";
import './styles/home.css';
import Home from './pages/home';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import {Provider} from 'react-redux';
import reducer from "./reducers/reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const myPersistReducer = persistReducer(persistConfig,reducer);

const store = createStore(myPersistReducer, window.devToolsExtension ? window.devToolsExtension() : f => f)

let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
              <Home />
          </Router>
        </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
