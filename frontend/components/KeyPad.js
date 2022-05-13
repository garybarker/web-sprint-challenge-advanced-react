import React from 'react';

const KeyPad = (props) => {


  return (
    <div id="keypad">
      <button id="left" onClick={props.click}>LEFT</button>
      <button id="up" onClick={props.click}>UP</button>
      <button id="right" onClick={props.click}>RIGHT</button>
      <button id="down" onClick={props.click}>DOWN</button>
      <button id="reset" onClick={props.click}>reset</button>
    </div>
    
  )
}

export default KeyPad;