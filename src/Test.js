import React, {useState} from "react";
import Quiz from './components/Quiz';
import Result from './components/Result';
import FAQ from './components/FAQ';
import quizQuestions from './api/quizQuestions';
import './index.css';

function Test() {
  const [counter, setCounter] = useState(0);
  const [questionId, setQuestionId] = useState(1);
  const [question, setQuestion] = useState(quizQuestions[0].question);
  const [answerOptions, setAnswerOptions] = useState(['Yes', 'No']);
  const [answer, setAnswer] = useState('');
  const [answersCount, setAnswersCount] = useState({});
  const [result, setResult] = useState('');

  function setUserAnswer(answer) {
    
    this.setState((state) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  function handleAnswerSelected(event) {
    setUserAnswer(event.currentTarget.value);
  }

  function setNextQuestion() {
    setCounter(counter + 1);
    setQuestionId(questionId + 1);
    setQuestion(quizQuestions[counter].question);
    setAnswer('');
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

  function componentDidMount() {    
    setQuestion(quizQuestions[0].question);
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

  return (
    <>
      <div className="App" style={{paddingBottom:50, marginBottom:50, textAlign: "left", backgroundColor:"#F4F4F4"}}>
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
      <FAQ /> 
      </>   
    );
  }
  
  export default Test;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

