/**
 * @fileoverview ProductActions.js is a file that contains all the actions
 * that are dispatched to the redux store. It contains the listProducts and
 * listProductDetails functions that are dispatched to the store and the
 * state is passed to the desired component.
 *
 * listProducts - this function lists all the products from the api and 
 * passes it to the store
 *
 * listProductDetails - this function lists the details of a product
 * from the api and passes it to the store
 *
 * @requires axios
 * @requires ProductConstants
 * @exports listProducts
 * @exports listProductDetails
 */

import axios from "axios";

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/ProductConstants";

/**
 * this listProducts function actions that reducers act on
 * to enable state to be passed to a desired component.
 * @returns {object} - the data gotten from the api
 * @param {object} dispatch - the action to be carried out
 *
 */
export const listProducts = () => async (dispatch) => {
	try {
		// this try statement dispatches the request product constant on request
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get("/api/products/");

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		// this catch statement dispatches the failed constant on request and
		// returns an error message if there is any error from the api
		// or the request else it returns a generic error message
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

/**
 * this listProductDetails function actions that reducers act on
 * to enable state to be passed to a desired component.
 * @param {string} id - the id of the product
 * @returns {object} - the data gotten from the api
 * @param {object} dispatch - the action to be carried out
 */
export const listProductDetails = (id) => async (dispatch) => {
	try {
		// this try statement dispatches the request product constant on request
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		// fetches data from the api using axios
		const { data } = await axios.get(`/api/products/${id}`);

		// dispatches a constant of success with the data as payload
		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		// this catch statement dispatches the failed constant constant on
		// request and returns an error message if there is any error from the api
		// or the request else it returns a generic error message
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
