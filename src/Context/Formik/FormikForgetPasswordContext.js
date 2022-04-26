import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  emailSchema,
  passwordSchema,
  repeatPasswordSchema,
  usernameSchema,
} from '../../lib/validation';
const FormikForgetPasswordContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    email: emailSchema,
  });
  const initialValues = {
    email: '',
  };

  switch (initial) {
    case true:
      return (
        <Formik
          validateOnMount={true}
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

export default FormikForgetPasswordContext;
