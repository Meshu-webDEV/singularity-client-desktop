require('dotenv').config();
const axios = require('axios').default;

const URL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_BACKEND}/v1`
    : '/v1';

const BACKEND_API = URL;

/**
 * backend API.
 * @baseURL <..URL>/api/v1
 */
const backendAPI = axios.create({
  baseURL: BACKEND_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

module.exports = { backendAPI };
