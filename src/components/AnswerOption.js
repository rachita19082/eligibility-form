import React, {useState} from "react";
import PropTypes from 'prop-types';

function AnswerOption(props) {
  const [answer, setAnswer] = useState('');

  function onValueChange(event) {
    setAnswer(event.target.value);
    props.onAnswerSelected(event);
  }

  return (
    <li className="answerOption">
      <label className="radioCustomLabel" htmlFor={props.key}>
      <input
        id={props.key}
        type="radio"
        className="radioCustomButton"
        checked={answer === props.key}
        value={props.key}
        onChange={onValueChange}
      />
      <span className="optionContent"> {props.answerContent} </span>
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;