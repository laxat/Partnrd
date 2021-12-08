import { Route, Switch, Redirect } from "react-router-dom";
import ForgotPassword from "../clientAuth/ForgotPassword";
import Login from "../clientAuth/Login";
import ResetPassword from "../clientAuth/ResetPassword";
import Signup from "../clientAuth/Signup";
import SLUGS from "../resources/slugs";
import { VerifySuccess, VerifyFailed } from '../clientAuth/Verify'; 


function PublicPages()
{
    return (
        <Switch>
            <Route path={SLUGS.login} component={Login} />
            <Route path={SLUGS.register} component={Signup} />
            <Route path={SLUGS.forgotPassword} component={ForgotPassword} />
            <Route path={SLUGS.resetPassword} component={ResetPassword} />
            <Route path={SLUGS.verifySuccess} component={VerifySuccess} />
            <Route path={SLUGS.verifyFailed} component={VerifyFailed} />
            <Redirect to={SLUGS.login}/>
        </Switch>
    ); 
}
export default PublicPages; 
