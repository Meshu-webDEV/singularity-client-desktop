import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import React from 'react';
import * as Yup from 'yup';
import { passwordSchema, repeatPasswordSchema } from '../../lib/validation';

const FormikPasswordContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
  });

  const initialValues = {
    currentPassword: '',
    newPassword: '',
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

export default FormikPasswordContext;
