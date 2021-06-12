import Login from './components/ClientAuth/Login.js';
import { Switch, BrowserRouter, Route} from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './components/ClientAuth/Signup'
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ClientAuth/ForgotPassword.js';
import pwdReset from './components/ClientAuth/ResetPassword.js';
import LawyerSignup from './components/ClientAuth/LawyerSignup.js';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/password/email" component={ForgotPassword} />
          <Route path="/password/reset" component={pwdReset} />
          <Route path="/lawyer/signup" component={LawyerSignup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
