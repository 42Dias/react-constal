import axios from "axios";
import { ip, porta, tenantId, token } from "./api";

export const ApiService = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:3333",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers":
  //     "Origin, X-Requested-With, Content-Type, Accept",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTION",
  // },

  baseURL: `${ip}:${porta}/api/tenant/${tenantId}/`,
  // baseURL: 'http://'+ip+':8157/api/tenant/'+tenantId || "fa22705e-cf27-41d0-bebf-9a6ab52948c4" +"/",
  timeout: 50000,
  headers: {'Authorization': 'Bearer '+ token}

});
