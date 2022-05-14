import React, { useState } from 'react';
import axios from 'axios';





const AppFunctional = (props) => {

  const [grid, setGrid] = useState(['', '', '', '', 'B', '', '', '', '']);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState('');
  
 
  const message = document.getElementById('message');
  const toggle = str => (str ? '' : 'B');
  
  
  function handleClick(event){
    const {id} = event.target;
    const newGrid = [...grid];
    const i = grid.indexOf('B');
    newGrid[i] = toggle(newGrid[i]);

    id === 'left' && x > 1 ? (
      newGrid[i - 1] = toggle(newGrid[i - 1]),
      setX(x => x - 1),
      setGrid(newGrid),
      setSteps(steps => steps + 1)
    ): 
    id === 'right' && x < 3 ? (
      newGrid[i + 1] = toggle(newGrid[i + 1]),
      setX(x => x + 1),
      setGrid(newGrid),
      setSteps(steps => steps + 1)
    ):
    id === 'up' && y > 1 ? (
      newGrid[i - 3] = toggle(newGrid[i - 3]),
      setY(y => y - 1),
      setGrid(newGrid),
      setSteps(steps => steps + 1)
    ):
    id === 'down' && y < 3 ? (
      newGrid[i + 3] = toggle(newGrid[i + 3]),
      setY(y => y + 1),
      setGrid(newGrid),
      setSteps(steps => steps + 1)
    ):
    id === 'reset' ? (
      setGrid(['', '', '', '', 'B', '', '', '', '']),
      setX(2),
      setY(2),
      setSteps(0),
      setEmail('')
    ):
    message.textContent = `You can't go ${id}`; 

  }
  
  const handleChange = (event) => {
    setEmail({email: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {x: x, y: y, steps: steps, email: email};
    axios.post('http://localhost:9000/api/result', formData)
    .then(res => {
      message.textContent = res.data.message;
    })
    .catch(err => {
      message.textContent = err.response.data.message
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {grid.map((val, idx) => <div key={idx} className={val === 'B' ? 'square active' : 'square'}>{val}</div>)}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleClick}>LEFT</button>
        <button id="up" onClick={handleClick}>UP</button>
        <button id="right" onClick={handleClick}>RIGHT</button>
        <button id="down" onClick={handleClick}>DOWN</button>
        <button id="reset" onClick={handleClick}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={handleChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

export default AppFunctional;
