import { useRef, useContext , useState ,useCallback, useEffect} from 'react';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({});

  const fetchUserHandler = async () => {
   
    try {
      const response = await fetch('https://react485560-default-rtdb.firebaseio.com/users.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      
      const userList = [];
    
          for (const key in data) {
            if(data[key].userId == authCtx.userId)
            userList.push({
              userId: data[key].userId,
              fName: data[key].fName,
              lName: data[key].lName,
              dob: data[key].dob,
              accountNumber : data[key].accountNumber,
              accountType : data[key].accountType,
              email: data[key].email
            });
          }
      setUser(userList[0]);

    } catch (error) {
      alert(error.message);
    }
    
  }

  useEffect(() => {
    fetchUserHandler();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation
    let apiKey = "AIzaSyBoUwi_4uGgyjXzNe7As-vKSQi6oTswAoM";
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key='+apiKey, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: Always succeeds!
    });
  };

  return (
        <section className={classes.profile} >
          <div className={classes.block}>
            <h2>Hi {user.fName ? user.fName : "" } {user.lName ? user.lName : ""} </h2>
            <h3>Account Number : {user.accountNumber ? user.accountNumber : ""}</h3>
            <h3>Account Type : {user.accountType ? user.accountType : ""}</h3>
            <h3>DOB : {user.dob ? user.dob.slice(0,10) : ""}</h3>
            <h3>Email : {user.email ? user.email : ""}</h3>

            <form onSubmit={submitHandler} className={classes.formblock}>
                <div className={classes.control}>
                    <label htmlFor='new-password'>New Password</label>
                    <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
                </div>
                <div className={classes.action}>
                    <button>Change Password</button>
                </div>
            </form>
          </div>
        </section>
    );
};

export default ProfileForm;
