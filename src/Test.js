import React, {useState} from "react";
import Quiz from './components/Quiz';
import Result from './components/Result';
import FAQ from './components/FAQ';
import quizQuestions from './api/quizQuestions';
import {Button} from "react-bootstrap";
import './index.css';

function Test() {
  const [counter, setCounter] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState(quizQuestions[0].question);
  const [answerOptions, setAnswerOptions] = useState(['Yes', 'No']);
  const [answer, setAnswer] = useState('');
  const [answersCount, setAnswersCount] = useState({});
  const [result, setResult] = useState('');

  function setUserAnswer(answer) {
    setAnswer(answer);    
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    if (questionId < quizQuestions.length) {
      setNext(true);
    } else {
      // do nothing for now
    }
  }

  function handleClick(param) {
    if (param && counter<8) {
      setNextQuestion();      
    } else if (!param && counter > 1) {
      setPrevQuestion();
    } else if (counter == 1) {
      setPrev(false);
      setPrevQuestion();
    }
  }

  function setNextQuestion() {
    setQuestion(quizQuestions[counter+1].question);
    setCounter(counter + 1);
    setQuestionId(questionId + 1);    
    setPrev(true);
    setAnswer('');
  }

  function setPrevQuestion() {
    setQuestion(quizQuestions[counter-1].question);
    setCounter(counter - 1);
    setQuestionId(questionId - 1);    
  }

  function getResults() {
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
  
    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  function setResults (result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  function renderQuiz() {
    return (
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionId}
        question={question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
    );
  }
  
  function renderResult() {
    return (
      <Result quizResult={result} />
    );
  }

  if(counter < 9) {
    return (
        <>
        <div className="App" style={{paddingBottom:40, textAlign: "left"}}>
          <div className="header">
            <h2>Eligibility Test</h2>
          </div>
                
          <Quiz
          answer={answer}
          answerOptions={answerOptions}
          questionId={questionId}
          question={question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={handleAnswerSelected}
          />

        </div>
        <div className="text-center">
          <Button 
            className="actionButton mr-4 ml-2"
            style={{width: "200px", marginBottom:80}}
            variant="secondary"
            onClick={(e) => handleClick(false)}
            disabled={!prev}>
            Back
          </Button>
          <Button
            className="actionButton ml-4 mr-2"
            style={{width: "200px", marginBottom:80}}
            variant="secondary"
            onClick={(e) => handleClick(true)}
            disabled={!next}>
            Next
          </Button>
        </div>
        <div style={{backgroundColor:"#F4F4F4"}}>
        <FAQ /> 
        </div>
        </>   
      );
    }
  }
  
  export default Test;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

