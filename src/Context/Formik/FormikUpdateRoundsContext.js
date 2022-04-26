import { Formik } from 'formik';
import React from 'react';
import { roundPointsSchema } from '../../lib/validation';
import * as Yup from 'yup';
const FormikUpdateRoundsContext = ({ children, values }) => {
  const initialValues = {
    roundPoints: { round: 0, table: [{ name: '', kills: 0, points: 0 }] },
  };

  const validationSchema = Yup.object({
    roundPoints: roundPointsSchema,
  });

  return (
    <Formik
      validateOnMount={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {children}
    </Formik>
  );
};

export default FormikUpdateRoundsContext;
