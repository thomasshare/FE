import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'; // app 에 redux 연결
import 'antd/dist/antd.css';
import { applyMiddleware, createStore  } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from './_reducers';  // reducer는 변경된 state를 리턴해 주는 기능을 함,  ./_reducers/index.js 하지 않아도 자동으로 index.js를 찾아서 넣어 줌

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);  // redux store를 만들때 순수 object가 아닌 function와 promise 형태도 받기 위하여 middleware 를 추가 하여 store를 생성 함

ReactDOM.render(
  <Provider
  // window.__REDUX_DEVTOOLS_EXTENSION__ &&
  // window.__REDUX_DEVTOOLS_EXTENSION__()
  // 는 크롬 브라우저의 redux devtools 확장 프로그램을 사용하기 위하여 넣어준 것임
    store={ createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && 
        window.__REDUX_DEVTOOLS_EXTENSION__()
      ) }
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  , 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
