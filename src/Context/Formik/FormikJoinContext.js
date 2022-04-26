import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  emailSchema,
  passwordSchema,
  repeatPasswordSchema,
  usernameSchema,
} from '../../lib/validation';
const FormikJoinContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object().shape({
    signup: Yup.object({
      username: usernameSchema,
      password: passwordSchema,
      repeatPassword: repeatPasswordSchema,
      email: emailSchema,
    }),
    signin: Yup.object({
      email: emailSchema,
      password: passwordSchema,
    }),
  });

  const initialValues = {
    signin: {
      email: '',
      password: '',
    },
    signup: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
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

export default FormikJoinContext;
