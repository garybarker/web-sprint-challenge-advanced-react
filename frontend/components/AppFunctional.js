import React, { useState } from 'react';
import axios from 'axios';





const AppFunctional = (props) => {

  const [state, setState] = useState({
    grid: ['', '', '', '', 'B', '', '', '', ''],
    x: 2,
    y: 2,
    steps: 0,
    email: ''
  })



  const message = document.getElementById('message');

  const toggle = (str) => (str === 'B' ? '' : 'B');


  function handleClick(event){
    const {id} = event.target;
    const newGrid = [...state.grid];
    const i = newGrid.indexOf('B');
    
    if(id === 'left' && state.x > 1){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i - 1] = toggle(newGrid[i - 1]);
      setState({...state, grid: newGrid, x: state.x - 1, steps: state.steps + 1});
    }else if(id === 'right' && state.x < 3){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i + 1] = toggle(newGrid[i + 1]);
      setState({...state, grid: newGrid, x: state.x + 1, steps: state.steps + 1});
    }else if((id === 'up') && (state.y > 1)){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i - 3] = toggle(newGrid[i - 3]);
      setState({...state, grid: newGrid, y: state.y - 1, steps: state.steps + 1});
    }else if(id === 'down' && state.y < 3){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i + 3] = toggle(newGrid[i + 3]);
      setState({...state, grid: newGrid, y: state.y + 1, steps: state.steps + 1});
    }else if(id === 'reset'){
      setState({
        grid: ['', '', '', '', 'B', '', '', '', ''],
        x: 2,
        y: 2,
        steps: 0,
        email: '' 
      });
    }else{
      message.textContent = `You can't go ${id}`;
    }
    
  }
  

  const handleChange = (event) => {
    setState({...state, email: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {x: state.x, y: state.y, steps: state.steps, email: state.email};
    axios.post('http://localhost:9000/api/result', formData)
    .then(res => {
      message.textContent = res.data.message;
    })
    .catch(err => {
      message.textContent = err.response.data.message
    })
    .finally(() => {
      setState({
        grid: ['', '', '', '', 'B', '', '', '', ''],
        x: 2,
        y: 2,
        steps: 0,
        email: ''
      })
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates</h3>
        <h3 id="steps">You moved {state.steps} {state.steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {state.grid.map((val, idx) => <div key={idx} className={val === 'B' ? 'square active' : 'square'}>{val}</div>)}
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
