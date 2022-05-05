import React, { useState,useEffect ,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const initialVal={ value: '', isValid: false };
//we will use reducer when we update a state & it depends on prev state 
const reducer=(state,action)=>{
  switch(action.type){
    case "userInput":
    return { value: action.val, isValid: action.val.includes('@') };
    case "inputBlur":
      return { value: state.value, isValid: state.value.includes('@') };
    default: return state;

  }

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(reducer, initialVal);

  // useEffect(()=>{
  //   const identifire=setTimeout(()=>{
  //     console.log('check form validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   },500);
  //   //this return is called clean up
  //   return ()=>{
  //     console.log('cleanup');
  //     clearTimeout(identifire);
  //   }
    
  // },[enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'userInput', val: event.target.value});
   // setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
    
  };
  

  const passwordChangeHandler = (event) => {
    
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'inputBlur'});
    //setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
