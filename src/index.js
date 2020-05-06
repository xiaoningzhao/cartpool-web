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

const store = createStore(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f)

ReactDOM.render(
    <Provider store={store}>
      <Router>
          <Home />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
