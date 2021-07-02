import { useState, useRef, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './LoginForm.module.css';
import {useHistory} from 'react-router-dom';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import "react-datepicker/dist/react-datepicker.css";

const RegistrationForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDOB] = useState(new Date());
  const [accountType, setAccountType] = useState();

  const loginClickHandler = () => {
    history.replace("/login");
  };

  const options = [
    { value: 'current', label: 'Current' },
    { value: 'savings', label: 'Savings' }
   
  ]

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const user = {
      fName: fnameInputRef.current.value,
      lName: lnameInputRef.current.value,
      email:enteredEmail,
      dob: dob,
      accountType : accountType.value,
      accountNumber : Date.now()
    
    }

    setIsLoading(true);
    
    let apiKey = "AIzaSyBoUwi_4uGgyjXzNe7As-vKSQi6oTswAoM";
    let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+apiKey;
   
   
                       
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          
          return res.json();


        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';           
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        user.userId = data.localId;
        saveUserDetails(user);
        authCtx.login(data.idToken, data.localId);
        history.replace("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const saveUserDetails =(user) =>{
    
        fetch("https://react485560-default-rtdb.firebaseio.com/users.json",{
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then((res) => {
         console.log("user details saved");
  }); 
}
  

  return (
    <section className={classes.login}>
      <h1>Customer Registration</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='fname'>First Name</label>
          <input id='fname' required ref={fnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='lname'>Last Name</label>
          <input type='lname' id='lname' required ref={lnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='dob'>DOB</label>
          <DatePicker selected={dob} onChange={(date) => setDOB(date)} />
          
        </div>
        <div className={classes.control}> 
           <label htmlFor='accounttype'>Account Type</label>
           <Dropdown options={options} onChange={(values) => setAccountType(values)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input  type='password' id='password'  required ref={passwordInputRef}/>      
        </div>

        <div className={classes.actions}>
          <button>Register</button>
          {isLoading && <p> Request in progress ...</p>}
          <button
            type='button'
            className={classes.navigate}
            onClick={loginClickHandler}
          >
            login
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegistrationForm;
