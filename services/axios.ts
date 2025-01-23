import axios from "axios";

const url = process.env.NEXT_PUBLIC_SERVER_URL;

const http = axios.create({
  baseURL: `${url}/api`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for requests
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error response:", error);
    return Promise.reject(error);
  }
);

export default http;
