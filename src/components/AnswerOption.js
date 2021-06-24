import React from "react";
import PropTypes from 'prop-types';

function AnswerOption(props) {

  function handleKeyDown(e){ 

    if(e.keyCode === 37 || e.keyCode === 39) {
      e.preventDefault();
    }

    if(e.keyCode === 38 && props.answerContent === "Yes") {
      console.log("Enters yes");
      document.querySelector("#" + props.answerContent).click();
      e.preventDefault();
    }

    if(e.keyCode === 40 && props.answerContent === "No") {
      console.log("Enters no");
      document.querySelector("#" + props.answerContent).click();
      e.preventDefault();
    }
  }

  return (
    <li className="answerOption">
      <label className="radioCustomLabel" htmlFor={props.answerContent}>
      <input
        id={props.answerContent}
        type="radio"
        className="radioCustomButton"
        checked={props.answer === props.answerContent}
        value={props.answerContent}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={props.onAnswerSelected}
      />
      <span className="optionContent"> {props.answerContent} </span>
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;