import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const FormikTemplatesFilterContext = ({ children }) => {
  const initialValues = {
    searchTerm: '',
  };

  return (
    <Formik validateOnMount={true} initialValues={initialValues}>
      {children}
    </Formik>
  );
};

export default FormikTemplatesFilterContext;
