import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Test from './Test';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
  <center>
    <h1 style={{margin:20}}>    
      Introductory Page
    </h1>
    <Button
      variant="primary"
      style={{margin:20}}
      onClick={event =>  window.location.href='./Test'}
    >
      Start test
    </Button>
  </center>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
