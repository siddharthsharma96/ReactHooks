import React, { useState,useEffect ,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailInitialVal={ value: '', isValid: false };
const passwordInitialVal={ value: '', isValid: false };
//we will use reducer when we update a state & it depends on prev state 
const emailReducer=(state,action)=>{
  switch(action.type){
    case "userInput":
    return { value: action.val, isValid: action.val.includes('@') };
    case "inputBlur":
      return { value: state.value, isValid: state.value.includes('@') };
    default: return state;

  }

}
const passwordReducer=(state,action)=>{
  switch(action.type){
    case "userInput":
    return { value: action.val, isValid: action.val.trim().length > 6};
    case "inputBlur":
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default: return state;

  }

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, emailInitialVal);
  const [passwordState, dispatchPaswword] = useReducer(passwordReducer, passwordInitialVal);

  const {isValid:emailIsValid}=emailState;
  const {isValid:passwordIsValid}=paswwordState;

  useEffect(()=>{
    const identifire=setTimeout(()=>{
      console.log('check form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
        //enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    },500);
    //this return is called clean up
    return ()=>{
      console.log('cleanup');
      clearTimeout(identifire);
    }
    
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'userInput', val: event.target.value});
   // setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
    
  };
  

  const passwordChangeHandler = (event) => {
    
    //setEnteredPassword(event.target.value);
    dispatchPaswword({type: 'userInput', val: event.target.value});
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'inputBlur'});
    //setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPaswword({type: 'inputBlur'});
   // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
