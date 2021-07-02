import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProfileForm from './components/Profile/ProfileForm';
//import LoginPage from './pages/LoginPage';
//import HomePage from './pages/HomePage';
import LoginForm from './components/Auth/LoginForm';
import StartingPageContent from './components/StartUp/StartingPageContent';
import RegistrationForm from './components/Auth/RegistrationForm';
import ApplyLoanForm from './components/Loan/ApplyLoanForm';
import AuthContext from './store/auth-context';
import { useContext} from 'react';

function App() {

  const useCtx = useContext(AuthContext);
  const isLoggedIn = useCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <StartingPageContent />
        </Route>
        {
         !isLoggedIn && <Route path='/login'>
          <LoginForm />
        </Route> 
        }
       {
         isLoggedIn && 
         <Route path='/profile'>
         <ProfileForm />
       </Route>
       }
       {
         !isLoggedIn && <Route path='/register'>
         <RegistrationForm/>
         </Route>
       } 
       {
         isLoggedIn &&  <Route path='/loan'>
         <ApplyLoanForm/>
        </Route>
       }
       
        <Route path='*'>
          <Redirect to='/'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
