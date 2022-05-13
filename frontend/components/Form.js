import React from 'react';

const Form = (props) => {
  
  const submit = (e) => {
    e.preventDefault();
    props.submit();
  }
  return(
    <form onSubmit={submit}>
      <input id="email" type="email" placeholder="type email" onChange={props.email}></input>
      <input id="submit" type="submit"></input>
    </form>
  )
}

export default Form;