import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useEffect, useContext, useRef, useMemo, useState } from "react";

// Pages
import Home from "./Pages/Home";
import Join from "./Pages/Join";
import Dashboard from "./Pages/Dashboard";
import Events from "./Pages/Events";
import NotFound from "./Pages/NotFound";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TransitionalLoading from "./Pages/TransitionalLoading";
import Event from "./Pages/Event";
import Templates from "./Pages/Templates";
import EventSettings from "./Pages/EventSettings";
import ActivateEmail from "./Pages/ActivateEmail";

// Global components
import Toast from "../Global/Toast";
import Sidemenu from "../Global/Sidemenu";
import AppModal from "../Global/AppModal";

// State
import DashboardState from "../Context/Dashboard/DashboardState";
import EventsState from "../Context/Events/EventsState";

// Context
import OrganizerState from "../Context/Organizer/OrganizerState";
import AuthContext from "../Context/Auth/AuthContext";
import EventRoundUpdate from "./Pages/EventRoundUpdate";
import FormikUpdateRoundsContext from "../Context/Formik/FormikUpdateRoundsContext";
import FormikEventsFilterContext from "../Context/Formik/FormikEventsFilterContext";
import FormikJoinContext from "../Context/Formik/FormikJoinContext";
import ForgetPassword from "./Pages/ForgetPassword";
import FormikForgetPasswordContext from "../Context/Formik/FormikForgetPasswordContext";
import Organization from "./Pages/Organization";
import OrganizationState from "../Context/Organization/OrganizationState";
import TemplatesState from "../Context/Templates/TemplatesState";
import FormikTemplatesFilterContext from "../Context/Formik/FormikTemplatesFilterContext";
import ProfileState from "../Context/Profile/ProfileState";
import BreadcrumbsState from "../Context/Breadcrumbs/BreadcrumbsState";
import { useWindowSize, useWindowScroll } from "react-use";
import { isMobile } from "react-device-detect";
import TermsConditions from "./Pages/TermsConditions";

const App = () => {
  //

  const [showArrow, setShowArrow] = useState(false);

  const windowSize = useWindowSize();
  const { y } = useWindowScroll();

  const clientViewPort = useMemo(() => windowSize.height / 2, []);

  const { authState, isAuthorized, isAuthenticating } = useContext(AuthContext);

  useEffect(() => {
    if (isMobile)
      return window.location.replace(process.env.REACT_APP_MOBILE_CLIENT);
  }, []);

  useEffect(() => {
    const _isAuthorized = async () => {
      try {
        await isAuthorized();
      } catch (error) {}
    };
    if (!authState) _isAuthorized();
  }, []);

  useEffect(() => {
    if (y > clientViewPort) return setShowArrow(true);
    if (y < clientViewPort) return setShowArrow(false);
    setShowArrow(false);
  }, [y]);

  if (isAuthenticating)
    return (
      <div className="relative w-screen overflow-hidden bg-dark-background">
        <TransitionalLoading text="Checking authentication state" />;
      </div>
    );

  return (
    <div className="relative w-screen overflow-hidden bg-dark-background">
      {/* Arrow to up */}
      <div
        onClick={() => window.scrollTo(0, 0)}
        className={`${
          showArrow ? "opacity-100" : "opacity-0"
        } fixed bottom-6 right-3 text-whites-light bg-dark-backgroundDarker filter p-1.5 rounded-full flex justify-center items-center z-999 hover:shadow-lg hover:brightness-150 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <Toast />
      <AppModal />
      <Sidemenu />
      <Switch>
        <Route path="/join">
          {authState ? (
            <Redirect to="/dashboard" />
          ) : (
            <FormikJoinContext initial>
              <Join />
            </FormikJoinContext>
          )}
        </Route>
        <Route path="/activate-email">
          {authState ? <Redirect to="/dashboard" /> : <ActivateEmail />}
        </Route>
        <Route path="/forget-password">
          {authState ? (
            <Redirect to="/dashboard" />
          ) : (
            <FormikForgetPasswordContext>
              <ForgetPassword />
            </FormikForgetPasswordContext>
          )}
        </Route>
        <Route path="/dashboard">
          {authState ? (
            <ProfileState>
              <TemplatesState>
                <BreadcrumbsState>
                  <DashboardState>
                    <Dashboard />
                  </DashboardState>
                </BreadcrumbsState>
              </TemplatesState>
            </ProfileState>
          ) : (
            <Redirect to="/join" />
          )}
        </Route>
        <Route path="/explore">
          <FormikEventsFilterContext>
            <OrganizerState>
              <EventsState>
                <Events />
              </EventsState>
            </OrganizerState>
          </FormikEventsFilterContext>
        </Route>
        <Route path="/templates">
          <EventsState>
            <TemplatesState>
              <FormikTemplatesFilterContext>
                <Templates />
              </FormikTemplatesFilterContext>
            </TemplatesState>
          </EventsState>
        </Route>
        <Route path="/organization/:uniqueid">
          <EventsState>
            <OrganizationState>
              <Organization />
            </OrganizationState>
          </EventsState>
        </Route>
        <Route path="/privacy-policy">
          <EventsState>
            <PrivacyPolicy />
          </EventsState>
        </Route>
        <Route path="/terms-conditions">
          <EventsState>
            <TermsConditions />
          </EventsState>
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route exact path="/:id">
          <EventsState>
            <Event />
          </EventsState>
        </Route>
        <Route path="/:id/settings">
          <EventsState>
            <EventSettings />
          </EventsState>
        </Route>
        <Route path="/:id/round/:round">
          <FormikUpdateRoundsContext>
            <EventsState>
              <EventRoundUpdate />
            </EventsState>
          </FormikUpdateRoundsContext>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
