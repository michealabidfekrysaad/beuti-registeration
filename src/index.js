import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './services/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App/App'


ReactDOM.render(
    <Provider store={store}>
        <App/>
     </Provider>  
    ,
    document.querySelector('#root')
);





