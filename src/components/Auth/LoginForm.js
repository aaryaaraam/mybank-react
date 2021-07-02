import { useState, useRef, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './LoginForm.module.css';
import {useHistory} from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const registerUserHandler = () => {
    history.replace("/register");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    
    let apiKey = "AIzaSyBoUwi_4uGgyjXzNe7As-vKSQi6oTswAoM";
    let loginUrl ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+apiKey;
    let signUpUrl ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+apiKey;
   
    let url = isLogin? loginUrl:signUpUrl;
                       
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
        authCtx.login(data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.login}>
      <h1> Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.navigate}
            onClick={registerUserHandler}
          >
            New Customer Registration
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
