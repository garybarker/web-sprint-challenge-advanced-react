import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  constructor(){
    super();
    this.state = {
      grid: ['', '', '', '', 'B', '', '', '', ''],
      x: 2,
      y: 2,
      steps: 0,
      email: ''
    }
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle = (str) => (str === 'B' ? '' : 'B');
  

  handleClick(event){
    const {id} = event.target;
    const newGrid = [...this.state.grid];
    const message = document.getElementById('message');
    const i = newGrid.indexOf('B');
    if(id === 'left' && this.state.x > 1){
      newGrid[i] = this.toggle(newGrid[i]);
      newGrid[i - 1] = this.toggle(newGrid[i - 1]);
      this.setState({grid: newGrid, x: this.state.x - 1, steps: this.state.steps + 1});
    }else if(id === 'right' && this.state.x < 3){
      newGrid[i] = this.toggle(newGrid[i]);
      newGrid[i + 1] = this.toggle(newGrid[i + 1]);
      this.setState({grid: newGrid, x: this.state.x + 1, steps: this.state.steps + 1});
    }else if(id === 'up' && this.state.y > 1){
      newGrid[i] = this.toggle(newGrid[i]);
      newGrid[i - 3] = this.toggle(newGrid[i - 3]);
      this.setState({grid: newGrid, y: this.state.y - 1, steps: this.state.steps + 1});
    }else if(id === 'down' && this.state.y < 3){
      newGrid[i] = this.toggle(newGrid[i]);
      newGrid[i + 3] = this.toggle(newGrid[i + 3]);
      this.setState({grid: newGrid, y: this.state.y + 1, steps: this.state.steps + 1});
    }else if(id === 'reset'){
      this.setState({
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

  handleChange(event){
    this.setState({email: event.target.value});
  }

  async handleSubmit(event){
    const  message = document.getElementById('message');
    event.preventDefault();
    const formData = await {x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email};
    axios.post('http://localhost:9000/api/result', formData)
    .then(res => {
      message.textContent = res.data.message;
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      this.setState({
        grid: ['', '', '', '', 'B', '', '', '', ''],
        x: 2,
        y: 2,
        steps: 0,
        email: ''
    })
  })
}


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((val, idx) => <div key={idx} className={val === 'B' ? 'square active' : 'square'}>{val}</div>)}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleClick}>LEFT</button>
          <button id="up" onClick={this.handleClick}>UP</button>
          <button id="right" onClick={this.handleClick}>RIGHT</button>
          <button id="down" onClick={this.handleClick}>DOWN</button>
          <button id="reset" onClick={this.handleClick}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.handleChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
