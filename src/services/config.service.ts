import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { getLocalStorage } from "../utils";

const BASE_URL = "https://jiranew.cybersoft.edu.vn/api";

export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180_000, 
});

export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180_000,
});

axiosWithoutAuth.interceptors.request.use(
 
    (config) => {
      
      config.headers["TOKEN_CYBER_SOFT"]=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzQiLCJIZXRIYW5TdHJpbmciOiIxMS8wNC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MTI3OTM2MDAwMDAiLCJuYmYiOjE2OTMwNjkyMDAsImV4cCI6MTcxMjk0MTIwMH0.dcAxAOtlLVw2muO5YfsiVtNNxI5pFOC3YUAx-VQvbPQ`;
     
     
      return config;
    },
  
    (e) => {
      return Promise.reject(e);
    },
  );


axiosWithAuth.interceptors.request.use(
 
  (config) => {
    
    config.headers["Authorization"] = `Bearer ${getLocalStorage(ACCESS_TOKEN)}`;
    config.headers["TOKEN_CYBER_SOFT"]=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzQiLCJIZXRIYW5TdHJpbmciOiIxMS8wNC8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MTI3OTM2MDAwMDAiLCJuYmYiOjE2OTMwNjkyMDAsImV4cCI6MTcxMjk0MTIwMH0.dcAxAOtlLVw2muO5YfsiVtNNxI5pFOC3YUAx-VQvbPQ`;
   
   
    return config;
  },

  (e) => {
    return Promise.reject(e);
  },
);
