import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware,} from 'redux';
import thunkMiddleware from 'redux-thunk';
import './css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import counter from './reducer';
import * as serviceWorker from './serviceWorker';


const store = createStore(
  counter,
  applyMiddleware(
    thunkMiddleware // 允许我们 dispatch() 函数
  ));

ReactDOM.render((
    /*<Main></Main>*/
      <Provider store={store}>
        <App/>
      </Provider>
    ),
    document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
