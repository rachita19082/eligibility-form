import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  return (
    <div className="result">
    {props.quizResult == 9 && (
      <>
      <h2 className="text-center"> You are eligible! </h2>
      <div className="pt-3 pl-5 pr-4 pb-4">
        You correctly answered <strong>{props.quizResult}/9</strong> in the Eligibility Test therefore you qualify
        to nominate your project to DPG. 
      </div>
      </>
    )}

    {props.quizResult < 9 && (
      <>
      <h2 className="text-center"> You are not eligible! </h2>
      <div className="pt-3 pl-5 pr-4 pb-4">
        You correctly answered <strong>{props.quizResult}/9</strong> in the Eligibility Test therefore you do not qualify
        to nominate your project to DPG. You must correctly answer <strong>9/9</strong> in order to be eligible. Here's why.
      </div>
      </>
    )}  
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;