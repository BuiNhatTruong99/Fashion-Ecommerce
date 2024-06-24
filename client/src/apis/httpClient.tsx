import axios from "axios";

const HttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_RESPONSE") {
      throw new Error("Something went wrong! Please check network again");
    }
    return Promise.reject(
      error.response?.data ||
        "Something went wrong! Please check network again."
    );
  }
);

export default HttpClient;
