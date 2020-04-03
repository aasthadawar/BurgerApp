import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import '../src/assets/css/index.css';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from './store/reducer';

const store= createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const app=(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  
    app
  ,
  document.getElementById('root')
);

