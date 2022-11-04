import { SET_MESSAGE } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_MESSAGE:
			return { message: payload };

		default:
			return state;
	}
}