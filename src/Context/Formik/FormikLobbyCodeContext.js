import { Formik } from 'formik';
import React from 'react';

const FormikLobbyCodeContext = ({ children, initial = true, values }) => {
  const initialValues = {
    lobbyCode: '',
  };

  switch (initial) {
    case true:
      return <Formik initialValues={initialValues}>{children}</Formik>;
    case false:
      return <Formik initialValues={values}>{children}</Formik>;

    default:
      break;
  }
};

export default FormikLobbyCodeContext;
