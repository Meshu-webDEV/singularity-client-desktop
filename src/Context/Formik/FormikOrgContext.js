import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  organizationAboutSchema,
  organizationAvatarSchema,
  organizationNameSchema,
} from '../../lib/validation';
const FormikOrgContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    name: organizationNameSchema,
    about: organizationAboutSchema,
    avatar: organizationAvatarSchema,
  });

  const initialValues = {
    name: '',
    about: '',
    website: '',
    twitter: '',
    discord: '',
    twitch: '',
    avatar: '',
    uniqueid: '',
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

export default FormikOrgContext;
