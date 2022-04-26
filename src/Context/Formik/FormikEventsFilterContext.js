import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const FormikEventsFilterContext = ({ children }) => {
  const initialValues = {
    searchTerm: "",
    narrow: "",
    gte: new Date(),
    lte: new Date(),
    status: [],
  };

  return (
    <Formik validateOnMount={true} initialValues={initialValues}>
      {children}
    </Formik>
  );
};

export default FormikEventsFilterContext;
