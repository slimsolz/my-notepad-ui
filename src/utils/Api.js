// This file provides an interface for all our api services defined in the services file of each module. */
import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
};

export const Api = axios.create(config);
