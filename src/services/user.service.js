/*eslint-disable */

import axios from "axios";
import config from '../config'
import authHeader from "./auth-header";

var API_URL = config.BASE_URL + 'api/';

const getAllCountry = () => {
    return axios
        .get(API_URL + "countries", { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Get All Customes list
const getAllCustomer = () => {
    return axios
        .get(API_URL + "customers", { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Get customers by Id
const getCustomers = (id) => {
    return axios
        .get(API_URL + "customers/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Add Customers
const addCustomer = (user) => {
    return axios
        .post(API_URL + "customers", user, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Update customers
const updateCustomer = (user,id) => {
    return axios
        .put(API_URL + "customers/" + id, user, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Delete Customers
const deleteCustomer = (id) => {
    return axios
        .delete(API_URL + "customers/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Import customer
const importCustomers = (user) => {
    return axios
        .post(API_URL + "importCustomers", user, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Get All Staff 
const getAllStaff = () => {
    return axios
        .get(API_URL + "staffs", { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

export default {
    getAllCustomer, 
    getCustomers,
    addCustomer, 
    updateCustomer, 
    deleteCustomer, 
    getAllCountry,
    importCustomers,
    getAllStaff, 
};
