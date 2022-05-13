import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import KeyPad from './KeyPad';
import Form from './Form';
import axios from 'axios';





export default function AppFunctional(props) {

  const initialGrid = ['', '', '', '', 'B', '', '', '', ''];

  const [grid, setGrid] = useState(initialGrid);
  const [steps, setSteps] = useState(-1);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const [userEmail, setUserEmail] = useState('');

  const updateEmail = (value) => {
    setUserEmail(value);
  }

  useEffect(() => {
    setSteps(steps+1)
  }, grid);

  const toggle = (str) => (str === 'B' ? '' : 'B');
  const message = document.getElementById('message');


  const handleClick = (evt) => {
    const {id} = evt.target;
    const newGrid = [...grid];
    const i = newGrid.indexOf('B');
    if(id === 'reset'){
      setGrid([initialGrid])
    }
    if(id === 'left' && x > 1){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i - 1] = toggle(newGrid[i - 1]);
      setX(x - 1);
    }else if(id === 'right' && x < 3){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i + 1] = toggle(newGrid[i + 1]);
      setX(x + 1);
    }else if(id === 'up' && y > 1){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i - 3] = toggle(newGrid[i - 3]);
      setY(y - 1)
    }else if(id === 'down' && y < 3){
      newGrid[i] = toggle(newGrid[i]);
      newGrid[i + 3] = toggle(newGrid[i + 3]);
      setY(y + 1);
    }else{
      message.textContent = `You can't go ${id}`;
    }
    
    setGrid(newGrid);
  }

 

  const getCoordinates = () => {
    const coords =  `(${x}, ${y})`;
    return coords;
  }


  const handleSubmit = () => {
  
    const form = {
      x: x,
      y: y,
      steps: steps,
      email: userEmail
    }

    axios.post('http://localhost:9000/api/result', form)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return (
    <div id="wrapper" className={props.className}>
      <Grid grid={grid} steps={steps} coordinates={getCoordinates()}/>
      <KeyPad click={handleClick}/>
      <Form submit={handleSubmit} email={updateEmail}/>
    </div>
  )
}
