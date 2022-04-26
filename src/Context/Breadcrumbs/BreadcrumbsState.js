import React, { useEffect, useReducer } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { PUSH_BREADCRUMBS, UPDATE_BREADCRUMBS } from "../types";

import BreadcrumbsContext from "./BreadcrumbsContext";
import BreadcrumbsReducer from "./BreadcrumbsReducer";

const BreadcrumbsState = (props) => {
  const initialState = {
    stack: [],
  };
  const location = useLocation();
  const match = useRouteMatch();

  const [state, dispatch] = useReducer(BreadcrumbsReducer, initialState);

  const update = (page) => {
    dispatch({
      type: UPDATE_BREADCRUMBS,
      payload: splitToStack(location.pathname),
    });
  };

  const splitToStack = (location) => location.substring(1).split("/");

  useEffect(() => {
    console.log("??");
    update();
  }, [location.pathname]);

  return (
    <BreadcrumbsContext.Provider
      value={{
        stack: state.stack,
        update,
      }}
    >
      {props.children}
    </BreadcrumbsContext.Provider>
  );
};

export default BreadcrumbsState;
