import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import React from 'react';
import * as Yup from 'yup';
import { displayNameSchema } from '../../lib/validation';
const FormikAccountContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    displayName: displayNameSchema,
  });

  const initialValues = {
    username: '',
    email: '',
    displayName: '',
    password: '',
  };

  switch (initial) {
    case true:
      return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {children}
        </Formik>
      );
    case false:
      return (
        <Formik initialValues={values} validationSchema={validationSchema}>
          {children}
        </Formik>
      );

    default:
      break;
  }
};

export default FormikAccountContext;
