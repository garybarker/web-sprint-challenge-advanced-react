import React from 'react';


const  Grid = (props) => {

  const {grid, steps, coordinates} = props;
  

 return(

    <div>
      <div className='info'>
        <h3 id="coordinates">Coordinates: {coordinates}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div> 
      <div id="grid">
        {grid.map((value, idx) => <div key={idx} className={value === 'B' ? 'square active' : 'square'}>{value}</div>)}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
    </div>
      
  )

}


export default Grid;