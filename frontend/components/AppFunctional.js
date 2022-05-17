import React, { useState } from 'react';
import axios from 'axios';


export default function AppFunctional(props) {
  const [x, setx] = useState(2);
  const [y, sety] = useState(2);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [steps, setSteps] = useState(0);
  
  
  
  const { className } = props;
  const squares = [];
  for (let yI = 1; yI <= 3; yI++) {
    for (let xI = 1; xI <= 3; xI++) {
      const isActive = x === xI && y === yI;
      squares.push(<div className={isActive ? "square active" : "square"} key = {xI + ',' + yI}>{isActive && "B"}</div>);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    axios.post("http://localhost:9000/api/result", {x, y, email, steps})
    .then((response) =>{
      setMessage(response.data.message)
      setEmail("")
    })
    .catch((err) => {
      setMessage(err.response.data.message)
      setEmail("")
    }) 
  }

  function handleClick(direction){
    switch (direction) {
      case "Left":
        if (x <= 1) {
          setMessage("You can't go left")
          return;
        }
        setx(x - 1)
        setSteps(steps + 1)
        setMessage(null)
        break;
      case "Right":
        if (x >= 3) {
          setMessage("You can't go right")
          return;
        } 
        setx(x + 1)
        setSteps(steps + 1)
        setMessage(null)
        break;
      case "Down":
        if (y >= 3) {
          
          setMessage("You can't go down")
          return;
        }
        sety(y + 1)
        setSteps(steps + 1)
        setMessage(null)
        break;
      case "Up":
        if (y <= 1) {
          setMessage("You can't go up")
          return;
        }
        sety(y-1)
        setSteps(steps + 1)
        setMessage(null)
        break;
      case "Reset":
        setx(2)
        sety(2)
        setSteps(0)
        setMessage(null)
        setEmail("")
        break;
    }

  }
  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {squares}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => handleClick("Left")}>LEFT</button>
        <button id="up" onClick={() => handleClick("Up")}>UP</button>
        <button id="right" onClick={() => handleClick("Right")}>RIGHT</button>
        <button id="down" onClick={() => handleClick("Down")}>DOWN</button>
        <button id="reset" onClick={() => handleClick("Reset")}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(evt) => setEmail(evt.target.value)} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}