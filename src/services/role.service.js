import axios from "axios";
import config from "../config";
import authHeader from "./auth-header";

var API_URL = config.BASE_URL + "api/";

const getAllRoles = () => {
  return axios
    .get(API_URL + "roles", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addRole = (role) => {
  return axios
      .post(API_URL + "roles", role, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
};
const getRole = (id, role) => {
  return axios
      .get(API_URL + "roles/" + id, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
};
const updateRole = (role,id) => {
  return axios
      .put(API_URL + "roles/" + id, role, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
};
const deleteRole = (id) => {
  return axios
      .delete(API_URL + "roles/" + id, { headers: authHeader() })
      .then((response) => {
          return response.data;
      });
};



const getAllModules = () => {
  return axios
    .get(API_URL + "getAllModules", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getRolePermission = (id) => {
  return axios
    .get(API_URL + "permission/" + id, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const setRolePermission = (data) => {
  return axios
    .post(API_URL + "permission", data,
    {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};







export default {
  getAllRoles,
  addRole,
  getRole,
  updateRole,
  deleteRole,



  getAllModules,
  getRolePermission,
  setRolePermission,
};
