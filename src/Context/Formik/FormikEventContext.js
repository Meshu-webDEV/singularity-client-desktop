import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import React from 'react';
import * as Yup from 'yup';
import {
  descriptionSchema,
  hasPrizepoolSchema,
  isPublicSchema,
  nameSchema,
  pointPerKillSchema,
  pointsSchema,
  prizepoolDistributionSchema,
  prizepoolSchema,
  remainingPrizepoolSchema,
  roundsSchema,
  shouldCreateSchema,
  teamsSchema,
  discordWebhooks,
} from '../../lib/validation';
const FormikEventContext = ({ children, initial = true, values }) => {
  // const validationSchema = Yup.object({
  //   basicInfo: basicInfoSchema,
  //   teams: teamsSchema,
  // });
  const validationSchema = Yup.object({
    name: nameSchema,
    description: descriptionSchema,
    rounds: roundsSchema,
    isPublic: isPublicSchema,
    teams: teamsSchema,
    shouldCreateTeams: shouldCreateSchema,
    pointsDistribution: pointsSchema,
    pointPerKill: pointPerKillSchema,
    hasPrizepool: hasPrizepoolSchema,
    prizepool: prizepoolSchema,
    remainingPrizepool: remainingPrizepoolSchema,
    prizepoolDistribution: prizepoolDistributionSchema,
    discordWebhooks: discordWebhooks,
  });

  const initialValues = {
    name: '',
    description: '',
    datetime: new Date(),
    rounds: 1,
    isPublic: true,
    teams: new Array(20).fill().map(() => {
      return {
        uniqueid: nanoid(),
        name: '',
        creatable: true,
        players: [],
      };
    }),
    shouldCreateTeams: false,
    pointsDistribution: new Array(20).fill(0),
    pointPerKill: 1,
    hasPrizepool: false,
    prizepool: 0,
    remainingPrizepool: 0,
    prizepoolCurrency: 'USD',
    prizepoolDistribution: new Array(20).fill(0),
    discordWebhooks: [],
  };

  switch (initial) {
    case true:
      return (
        <Formik
          initialErrors={{}}
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
    case 'partial':
      return (
        <Formik
          initialValues={{ ...initialValues, ...values }}
          validationSchema={validationSchema}
        >
          {children}
        </Formik>
      );

    default:
      break;
  }
};

export default FormikEventContext;
