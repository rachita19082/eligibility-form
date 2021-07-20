import React from 'react';

function FAQ(props) {
  return (
    <>
    <div className="faq p-5 text-left">
    <h3 style={{fontFamily:'Now Alt', color:'#4D29BA'}}>Frequently Asked Questions</h3>
    <br></br>
    {props.content.copy && props.content.copy.map((copy, index) =>
      <>
        <h5> {copy.subHeading} </h5>
        <p style={{fontFamily:'Jost-Light', marginBottom:25}}>
          {copy.text}
        </p>
      </>
    )}
    
    <div style={{color:"grey", marginTop:35}}>
        <h5 class="text-uppercase"> {props.content.name} RESOURCES </h5>
        For additional resources about {props.content.name} please find in the link below <br></br>
        <a href={props.content.link} style={{color:'black'}}>{props.content.link}</a>
    </div>
    </div>
    </>
  );
}

export default FAQ;