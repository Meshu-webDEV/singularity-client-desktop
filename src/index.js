import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import App from "./App/App";

// Date stuff
import DateFnsUtils from "@date-io/dayjs"; // choose your lib

// State
import ToastState from "./Context/Toast/ToastState";
import ModalState from "./Context/Modal/ModalState";
import AuthState from "./Context/Auth/AuthState";
import SidemenuState from "./Context/Sidemenu/SidemenuState";
import TeamsState from "./Context/Teams/TeamsState";
import EventState from "./Context/Event/EventState";

// Theme
import { defaultTheme } from "./lib/muiThemes";

ReactDOM.render(
  <BrowserRouter>
    <ToastState>
      <ModalState>
        <AuthState>
          <SidemenuState>
            <TeamsState>
              <EventState>
                <ThemeProvider theme={defaultTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <App />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </EventState>
            </TeamsState>
          </SidemenuState>
        </AuthState>
      </ModalState>
    </ToastState>
  </BrowserRouter>,
  document.getElementById("root")
);
