import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import React from 'react';
import * as Yup from 'yup';
import {
  descriptionSchema,
  hasPrizepoolSchema,
  pointPerKillSchema,
  pointsSchema,
  prizepoolDistributionSchema,
  prizepoolSchema,
  remainingPrizepoolSchema,
  roundsSchema,
  teamsSchema,
  templateDescriptionSchema,
  templateNameSchema,
} from '../../lib/validation';
const FormikTemplatesContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    name: templateNameSchema,
    visible: templateNameSchema,
    templateDescription: templateDescriptionSchema,
    description: descriptionSchema,
    rounds: roundsSchema,
    teams: teamsSchema,
    pointsDistribution: pointsSchema,
    pointPerKill: pointPerKillSchema,
    hasPrizepool: hasPrizepoolSchema,
    prizepool: prizepoolSchema,
    remainingPrizepool: remainingPrizepoolSchema,
    prizepoolDistribution: prizepoolDistributionSchema,
  });

  const initialValues = {
    name: '',
    visible: false,
    templateDescription: '',
    description: '',
    rounds: 1,
    teams: new Array(20).fill().map(() => {
      return {
        uniqueid: nanoid(),
        name: '',
        creatable: true,
        players: [],
      };
    }),
    pointsDistribution: new Array(20).fill(0),
    pointPerKill: 1,
    hasPrizepool: true,
    prizepool: 0,
    remainingPrizepool: 0,
    prizepoolCurrency: 'USD',
    prizepoolDistribution: new Array(20).fill(0),
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

export default FormikTemplatesContext;
