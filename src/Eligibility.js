import React, {useState, useCallback} from "react";
import {useCookies} from "react-cookie";
import {v4 as uuidv4} from "uuid";
import Result from './components/Result';
import AnswerOption from './components/AnswerOption';
import QuestionCount from './components/QuestionCount';
import FAQ from './components/FAQ';
import quizQuestions from './api/quizQuestions';
import {Button} from "react-bootstrap";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import Paper from '@material-ui/core/Paper';
import './index.css';

function Eligibility() {
  const [counter, setCounter] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [question, setQuestion] = useState(quizQuestions[0].question);
  const [answer, setAnswer] = useState('');
  const [answersList, setAnswerList] = useState({});
  const [score, setScore] = useState(0);
  const [buttonName, setButtonName] = useState('');
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [maybeQuestions, setMaybeQuestions] = useState([]);
  const [resultClick, setResultClick] = useState(null);
  const [cookies, setCookie] = useCookies(["uuid"]);
  const [values, setValues] = useState({});
  const [startQuiz, setStartQuiz] = useState(false);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeys);

    // Initialize cookie if not present
    const userId = uuidv4();
    if (!cookies.uuid) {
      setCookie("uuid", userId, {path: "/", maxAge: 2592000}); // maxAge: 30 days
    } 

    return () => {
      document.removeEventListener('keydown', handleKeys);
    };

  });

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  function handleKeys(e){ 
    console.log("Enter handle keys : " + e.keyCode);
    e.keyCode === 37 && document.querySelector('#backButton') && document.querySelector('#backButton').click() && e.preventDefault();
    e.keyCode === 39 && document.querySelector('#nextButton') && document.querySelector('#nextButton').click() && e.preventDefault();
  }

  function setUserAnswer(ans) {
    setAnswer(ans);
    answersList[counter] = ans;
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
    console.log("Set user answer to " + event.currentTarget.value);
    if (questionId <= quizQuestions.length) {
      setNext(true);
    }
  }

  function handleClick(param) {
    if (param && counter<8) {
      setNextQuestion();      
    } else if (param && counter === quizQuestions.length-1) {
      getResults();
      setCounter(counter + 1);
    } else if (!param && counter > 1) {
      setPrevQuestion();
    } else if (counter === 1) {
      setPrev(false);
      setPrevQuestion();
    }
  }

  function handleResultClick(param) {
    if (!param) {
      setCounter(0);
      setPrev(false);
      setNext(false);
      setQuestionId(1);
      setQuestion(quizQuestions[0].question); 
      setAnswer('');
      setAnswerList({});
      setScore(0);
      setButtonName('');
      setWrongQuestions([]);         
    } else if (param) {
      debouncedSave(values);
      window.open("https://submission-digitalpublicgoods.vercel.app/");
    }
  }

  const debouncedSave = useCallback(
    debounce((vals) => saveToDb(vals), 1000),
    [cookies.uuid]
  );

  async function saveToDb(vals) {
    if (cookies.uuid) {
      console.log("Enters saveToDb");
      await fetch(`https://submission-digitalpublicgoods.vercel.app/api/saveDB/${cookies.uuid}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          values: vals,
        }),
      });
    }
  }

  function setNextQuestion() {
    setQuestion(quizQuestions[counter+1].question);
    if(!answersList[counter+1]) {
      setNext(false);
      setAnswer('');
      console.log("Setting answer to blank");
    }
    if(answersList[counter+1]) {
      setAnswer(answersList[counter+1]);
      console.log("Setting answer");
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
    let scoreValue = 0;
    let questionsList = [];
    let maybeList = [];
    let valueList = {};
    
    while (i < 9) {
      if(i > 1) {
        if(answersList[i] === quizQuestions[i].answer)
          valueList[quizQuestions[i].fieldName] = quizQuestions[i].answer;
        else {
          if(quizQuestions[i].answer === "Yes")
            valueList[quizQuestions[i].fieldName] = "No";
          else
            valueList[quizQuestions[i].fieldName] = "Yes";
        }
      }
      if(answersList[i] === quizQuestions[i].answer) {
        scoreValue += 1;
      } else if (answersList[i] !== quizQuestions[i].answer && quizQuestions[i].maybe) {
        maybeList.push(quizQuestions[i]);
      } else {
        questionsList.push(quizQuestions[i]);
      }
      i += 1;
    }
    setScore(scoreValue);
    setWrongQuestions(questionsList);
    setMaybeQuestions(maybeList); 
    setValues(valueList);
    console.log(valueList);

    if(scoreValue === quizQuestions.length || scoreValue + maybeList.length === quizQuestions.length) {
      setButtonName("Proceed");
      setResultClick(true);
    } else {
      setButtonName("Start Again")
      setResultClick(false);
    }

    console.log(questionsList);
    console.log(maybeList);
    console.log(wrongQuestions);
  }

    return (
      <>
      <div className="header">
        <h2>Eligibility Test</h2>
      </div>
      
      <center>
      <div className="pt-3 pb-4" style={{width:"60%"}}>
        <ProgressBar
          filledBackground="linear-gradient(to right, #cdbdff, #4d29ba)"
          percent={(questionId/9)*100}
        />
      </div>

      <Paper className="pt-4 m-3 card" variant="outlined" elevation={5}>
      <div>
      {!startQuiz && (
        <>
        <div className="p-3">
          <h3 className="pl-3 pr-3" style={{fontFamily:"Now Alt", color:"#2b209a"}}> Is your digital solution ready to be a Digital Public Good? </h3>
          <div className="text-left p-4" style={{fontFamily:"Jost-Light"}}> 
          This submission form requests information that will be used to assess whether a project meets the minimum requirements to be considered a Digital Public Good according to the DPG Alliance. This process is being regularly updated and improved so additional information may be requested in addition to what is collected through this form.
          <br />Please check the submission guide in advance to know what information will be requested of you. If you do not have all of the information about a project you may still submit it. Please provide as much information as possible. Projects with more complete information will move more quickly through the vetting process.
          <br />Problems? nominations@digitalpublicgoods.net
          </div>
        </div>

        <Button
          className="mr-2"
          style={{width: "200px", marginLeft:25, marginBottom:30, borderRadius:0, backgroundColor:"#4D29BA", fontFamily:'Jost-Light'}}
          variant="secondary"
          onClick={(e) => {setStartQuiz(true); setQuestionId(1);}}
          id="nextButton">
          Start Assessment
        </Button>
        </>
      )}
      {startQuiz && counter < quizQuestions.length && (        
        <>
          <div className="quiz pt-0 pl-3 pr-3 text-left">

            <QuestionCount
              counter={questionId}
              total={quizQuestions.length}
            />

            <h4 className="question pl-4">{question} <a href="#FAQ" style={{fontSize:13, textDecoration:"underline", color:"#4D29BA"}}> Not sure? </a></h4>

            <ul className="answerOptions">            
              <AnswerOption
                  answerContent="Yes"
                  answer={answer}
                  onAnswerSelected={handleAnswerSelected}
              />            
              
              <AnswerOption
                  answerContent="No"
                  answer={answer}
                  onAnswerSelected={handleAnswerSelected}
              />             
            </ul>
          </div>               
        
        <div className="text-center">
          <Button 
            className="ml-2"
            style={{width: "200px", marginRight:25, marginBottom:30, borderRadius:0, borderColor:"#4D29BA", backgroundColor:"white", color:"#4D29BA", fontFamily:'Jost-Light'}}
            variant="secondary"
            onClick={(e) => handleClick(false)}
            disabled={!prev}
            id="backButton">
            Back
          </Button>
          <Button
            className="mr-2"
            style={{width: "200px", marginLeft:25, marginBottom:30, borderRadius:0, backgroundColor:"#4D29BA", fontFamily:'Jost-Light'}}
            variant="secondary"
            onClick={(e) => handleClick(true)}
            disabled={!next}
            id="nextButton">
            Next
          </Button>
        </div>

        <div style={{backgroundColor:"#F4F4F4"}}>
          <a name="FAQ"><FAQ content={quizQuestions[counter].faq} /></a>
        </div>
        </>
      )}

      {startQuiz && counter === quizQuestions.length && (
          <>
          <Result quizScore={score} result={answersList} questions={wrongQuestions} maybeQuestions={maybeQuestions} />
          <div className="text-center">
            <Button 
              className="mr-4 ml-2"
              style={{width: "200px", marginBottom:80, borderRadius:0, borderColor:"#4D29BA", backgroundColor:"white", color:"#4D29BA", fontFamily:'Jost-Light'}}
              variant="secondary"
              onClick={(e) => window.open("https://digitalpublicgoods.net/", "_self")}
              disabled={!prev}>
              Back to home
            </Button>
            <Button
              className="ml-4 mr-2"
              style={{width: "200px", marginBottom:80, borderRadius:0, backgroundColor:"#4D29BA", fontFamily:'Jost-Light'}}
              variant="secondary"
              onClick={(e) => handleResultClick(resultClick)}
              disabled={!next}>
              {buttonName}
            </Button>
          </div>
          </>
      )}
        </div>
        </Paper>
        </center> 

        </>
      );
  }
  
  export default Eligibility;