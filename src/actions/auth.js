import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE,
	EMAIL_SUCCESS,
	RECOVER_SUCCESS,
	FORGOT_FAIL,
	RECOVER_FAIL
} from "./types";

import AuthService from "../services/auth.service";

export const login = (loginDetail) => (dispatch) => {
	return AuthService.login(loginDetail).then(
		(data) => {

			if (data.response === false) {
				dispatch({
					type: LOGIN_FAIL,
				});

				dispatch({
					type: SET_MESSAGE,
					payload: data.message,
				});
				return Promise.reject();
			}
			else {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: { user: data },
				});
				return Promise.reject();
			}
		}
	);

};

export const forgotPassword = (forgotPasswordDetail) => (dispatch) => {
	return AuthService.forgotPassword(forgotPasswordDetail).then(
		(data) => {
			if (data.response === false) {
				dispatch({
					type: LOGIN_FAIL,
				});
				
				dispatch({
					type: SET_MESSAGE,
					payload: data.message,
				});
			}
			else {
				dispatch({
					type: EMAIL_SUCCESS,
					payload: data.message,
				});
			}
			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();


			dispatch({
				type: FORGOT_FAIL,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

export const recoverPassword = (recoverPasswordDetail) => (dispatch) => {
	return AuthService.recoverPassword(recoverPasswordDetail).then(
		(data) => {
			if (data.response === false) {
				dispatch({
					type: LOGIN_FAIL,
				});
				dispatch({
					type: SET_MESSAGE,
					payload: data.message,
				});
			}
			else {
				dispatch({
					type: RECOVER_SUCCESS,
					payload: data.message,
				});
			}
			return Promise.resolve();
		},
		(error) => {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			dispatch({
				type: RECOVER_FAIL,
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message,
			});

			return Promise.reject();
		}
	);
};

export const logout = () => (dispatch) => {
	AuthService.logout();

	dispatch({
		type: LOGOUT,
	});
};