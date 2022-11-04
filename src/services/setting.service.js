import axios from "axios";
import config from "../config";
import authHeader from "./auth-header";

var API_URL = config.BASE_URL + "api/";

const getSetting = () => {
  return axios
    .get(API_URL + "settings", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


const updateSetting = (id,data) => {
  return axios
      .put(API_URL + "settings/" + id, data, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
};

export default {
    getSetting,
    updateSetting,
};
