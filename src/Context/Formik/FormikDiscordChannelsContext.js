import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {
  discordChannelSchema,
  discordServerSchema,
  discordWebhookUrlSchema,
  nameSchema,
} from '../../lib/validation';
const FormikDiscordChannelsContext = ({ children, initial = true, values }) => {
  const validationSchema = Yup.object({
    server: discordServerSchema,
    channel: discordChannelSchema,
    webhookUrl: discordWebhookUrlSchema,
  });

  const initialValues = {
    server: '',
    channel: '',
    webhookUrl: '',
    uniqueid: '',
    lastPinged: '',
    owner: '',
    pingable: true,
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

export default FormikDiscordChannelsContext;
