import React from 'react';

function FAQ(props) {
  return (
    <>
    <div className="faq p-5">
    <h3>Frequently Asked Questions</h3>
    <br></br>
    <h5> What are Sustainable Development Goals? </h5>
    <p>
        The Sustainable Development Goals are a plan of action to target and resolve the challenges we’re 
        facing on the planet. They are not just about the environment (as the word ‘sustainability’ can 
        sometimes suggest), they encompass much more than that, with goals targeting issues such as gender 
        equality, poverty, and peace.
    </p>
    <div style={{color:"grey", marginTop:50}}>
        <h5> SDG RESOURCES </h5>
        <b>For additional resources about SDG please find in the link below <br></br>
        <a href="https://sdgs.un.org/goals" style={{color:'black'}}>https://sdgs.un.org/goals</a>
        </b>
    </div>
    </div>
    </>
  );
}

export default FAQ;