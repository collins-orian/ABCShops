/**
 * @fileOverview ProductReducers.js - This file contains the reducers for the product
 * actions. It contains the productListReducer and the productDetailsReducer functions
 * that are dispatched to the store and the state is passed to the desired component.
 *
 * productListReducer - this function actions that reducers act on to enable state to be
 * passed to a desired component. It handles the different cases that may occur when
 * the product list is requested from the API.
 *
 * productDetailsReducer - this function actions that reducers act on to enable state to be
 * passed to a desired component. It handles the different cases that may occur when the
 * product details are requested from the API.
 *
 * @requires ProductConstants
 * @exports productListReducer
 * @exports productDetailsReducer
 */

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/ProductConstants";

/**
 * this productListReducer function actions that reducers act on
 * to enable state to be passed to a desired component.
 * @param {object} state - the state of the product
 * @param {object} action - the action to be carried out
 * @returns {object} - the data gotten from the api
 */

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		// this case occurs at the initial request from the API.
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		// this case comes up when the request is successful and the data gotten
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };

		// this case comes up when the request failed and the data gotten
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		// this default comes up when the request is empty and no data is retrieved.
		default:
			return state;
	}
};

/**
 * this productDetailsReducer function actions that reducers act on
 * to enable state to be passed to a desired component.
 * @param {object} state - the state of the product
 * @param {object} action - the action to be carried out
 * @returns {object} - the data gotten from the api
 */

export const productDetailsReducer = (
	// the state is set to an empty object with an empty array of reviews
	state = { product: { reviews: [] } },
	action
) => {
	// this switch statement handles the different cases that may occur
	switch (action.type) {
		/* this case 
		occurs at the initial request from the API. 
		the loading is set to true and the state is
		returned using the spread operator to get the 
		previously set state. 
		*/
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state };

		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };

		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
