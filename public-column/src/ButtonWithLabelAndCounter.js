import React, { Component } from 'react'

function ButtonWithLabelAndCounter(props) {
  //if the button is clicked, an additional class name is added to its classes, for purposes such as styling it differently when clicked (blue font color and bold lettering)
  let classNames = props.className;
  if (props.clickedStatus) classNames += " " + props.clickedClass;

  let countValue = props.countValue; 
  if (countValue > 1000000) countValue = (countValue / 1000000).toFixed(1) + "m";
  else if (countValue > 1000) countValue = (countValue / 1000).toFixed(1) + "k";
  return(
      <button className={classNames}
              onClick={props.clickFunction}  >
              {/*button label includes the label plus the count value in the format of "label | countValue"*/}
                {props.buttonLabel} | <span className="dislikes-counter">        
                                        {countValue}
                                      </span> 
      </button> 

      
  )
}

export default ButtonWithLabelAndCounter;