import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';  
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';  
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';  
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';  
import InfoIcon from '@material-ui/icons/Info';   
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function QuestionCount(props) {
  const infoContent = 
  <div className="p-2" style={{width:150}}> 
      Use <KeyboardArrowUpIcon style={{ color: 'white', background:'grey', borderRadius:5, marginLeft:5, marginRight:5 }} /> for Yes <br></br>
      Use <KeyboardArrowDownIcon style={{ color: 'white', background:'grey', borderRadius:5, marginLeft:5, marginRight:5 }} /> for No <br></br>
      Use <KeyboardArrowRightIcon style={{ color: 'white', background:'grey', borderRadius:5, marginLeft:5, marginRight:5 }} /> for Next <br></br>
      Use <KeyboardArrowLeftIcon style={{ color: 'white', background:'grey', borderRadius:5, marginLeft:5, marginRight:5 }} /> for Back <br></br>
  </div>;
  
  return (
    <div className="questionCount">
      Question <span>{props.counter}</span> of <span style={{marginRight:8}}>{props.total}</span>
      <Popup
        open={true}
        trigger={
          <InfoIcon style={{ color: 'black' }} />
        }
        position="right center"
        on={['hover', 'focus']}
        closeOnDocumentClick
      >
        {infoContent}
      </Popup>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;