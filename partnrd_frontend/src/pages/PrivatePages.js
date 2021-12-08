import React from "react";
import { Redirect, Route, Switch} from "react-router-dom";
import SLUGS from "../resources/slugs";
import DashboardComponent from "../pages/Agreements/Dashboard";
import DashTemplate from "./Templates/DashTemplate";
import ShareAgreement from "../pages/Templates/ShareAgreement/ShareAgreement";
import { CreateShareAgreement } from "../pages/Templates/ShareAgreement/CreateShareAgreement"
import { NewAgreement } from "../pages/Agreements/NewAgreement";
import ProfileSettings from "./Settings/ProfileSettings";
import TicketDashboard from "./SupportTickets/Dashboard";
import CreateTicket from "./SupportTickets/CreateTicket";
import ConfirmationPage from "./SupportTickets/ConfirmationPage";
import ViewTicket from "./SupportTickets/ViewTicket";

function PrivatePages() {
  //const { id } = useParams(); 
  return (
    <Switch>
      <Route exact path={SLUGS.agreements} component={DashboardComponent} />
      <Route exact path={SLUGS.templates} component={DashTemplate} />
      <Route exact path={SLUGS.lawyers} render={() => <div>Lawyers</div>} />
      <Route exact path={SLUGS.supportTickets} component={TicketDashboard}/>
      <Route exact path={SLUGS.viewSupportTicket + ':id'} component={ViewTicket}/>
      <Route exact path={SLUGS.createSupportTicket} component={CreateTicket}/>
      <Route exact path={SLUGS.thanksPage} component={ConfirmationPage}/>
      {/* <Route exact path={SLUGS.settings} component={ProfileSettings} /> */}
      <Route exact path={SLUGS.shareAgreement} component={ShareAgreement} />
      <Route exact path={SLUGS.selectTemplate} component={NewAgreement} />
      <Route exact path={SLUGS.createShare + ':id'} component={CreateShareAgreement} />
      <Route exact path={SLUGS.profileSettings} component={ProfileSettings}/>
      <Redirect to={SLUGS.agreements} />
    </Switch>
  );
}

export default PrivatePages;
