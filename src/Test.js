import React, {useState} from "react";
import Quiz from './components/Quiz';
import Result from './components/Result';
import FAQ from './components/FAQ';
import quizQuestions from './api/quizQuestions';
import {Button} from "react-bootstrap";
import reportWebVitals from './reportWebVitals';
import './index.css';

function Test() {
  const [counter, setCounter] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState(quizQuestions[0].question);
  const [answerOptions, setAnswerOptions] = useState(['Yes', 'No']);
  const [answer, setAnswer] = useState('');
  const [answersList, setAnswerList] = useState({});
  const [answersCount, setAnswersCount] = useState({});
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [buttonName, setButtonName] = useState('');

  function setUserAnswer(ans) {
    setAnswer(ans);
    answersList[counter] = ans;
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    if (questionId <= quizQuestions.length) {
      setNext(true);
    } else {
      // do nothing for now
    }
  }

  function handleClick(param) {
    if (param && counter<8) {
      setNextQuestion();      
    } else if (param && counter == 8) {
      getResults();
      setCounter(counter + 1);
    } else if (!param && counter > 1) {
      setPrevQuestion();
    } else if (counter == 1) {
      setPrev(false);
      setPrevQuestion();
    }
  }

  function setNextQuestion() {
    setQuestion(quizQuestions[counter+1].question);
    if(!answersList[counter+1]) {
      setNext(false);
      setAnswer('');
    }
    if(answersList[counter+1]) {
      setAnswer(answersList[counter+1]);
    }
    setCounter(counter + 1);
    setQuestionId(questionId + 1);    
    setPrev(true);
  }

  function setPrevQuestion() {
    setQuestion(quizQuestions[counter-1].question);
    setAnswer(answersList[counter-1]);
    setCounter(counter - 1);    
    setQuestionId(questionId - 1);
    setNext(true);    
  }

  function getResults() {
    let i = 0;
    let scoreValue = 0
    while (i < 9) {
      if(answersList[i] === "Yes") {
        scoreValue += 1;
      }
      i += 1;
    }
    setScore(scoreValue);
    if(scoreValue == 9) {
      setButtonName("Proceed");
    } else if (scoreValue < 9) {
      setButtonName("Start Again")
    }
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

    return (
      <>
      <div className="header">
        <h2>Eligibility Test</h2>
      </div>
      
      <div>
      {counter < 9 && (        
        <>
        <div className="App" style={{paddingBottom:40, textAlign: "left"}}>                
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
        <FAQ content={quizQuestions[counter].faq} /> 
        </div>
        </>
        )}

        {counter == 9 && (
          <>
          <Result quizResult={score} />
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
              {buttonName}
            </Button>
          </div>
          </>
        )}
        </div> 

        </>
      );
  }
  
  export default Test;

  reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

