import React, {useState} from "react";
import Test from './Test';
import './App.css';
import {Button} from "react-bootstrap";


function App() {
  const [startTest, setStartTest] = useState(false);

  function handleClick() {
    setStartTest(true);
  }

  if (startTest) {
    return (      
      <Test />      
    );
  }

  return (
    <>
  <center>
    <h1 style={{margin:20}}>    
      DPG Eligibility Test
    </h1>
    <Button
      variant="primary"
      style={{margin:20}}
      onClick={(e) => handleClick()}
    >
      Start test
    </Button>
  </center>
  </>
  );
}

export default App;
