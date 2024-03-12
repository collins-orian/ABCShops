/**
 * @fileOverview CartReducers.js - This file contains the reducers for the cart
 * actions. It contains the cartReducer function that is dispatched to the store
 * and the state is passed to the desired component.
 * 
 * cartReducer - this function actions that reducers act on to enable state to be
 * passed to a desired component. It handles the different cases that may occur when
 * the cart is requested from the API.
 * 
 * @requires CartConstants
 * @exports cartReducer
 */

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

/**
 * this cartReducer function actions that reducers act on
 * to enable state to be passed to a desired component.
 * @param {object} state - the state of the cart
 * @param {object} action - the action to be carried out
 */

export const cartReducer = (state = { cartItems: [] }, action) => {
	// this switch statement handles the different cases that may occur
	switch (action.type) {
		// this case occurs when an item is added to the cart
		case CART_ADD_ITEM:
			// This represents the item that is being added to the cart
			const item = action.payload;
			// This checks if the item already exists in the cart
			const existItem = state.cartItems.find((x) => x.product === item.product);

			if (existItem) {
				return {
					// This returns the state with the cartItems array mapped through
					...state,
					// This maps through the cartItems array and updates the item if it exists in the cart
					// else it returns the item
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return {
					...state,
					// This returns the state with the cartItems array and the item added to it
					cartItems: [...state.cartItems, item],
				};
			}

		// this case occurs when an item is removed from the cart
		case CART_REMOVE_ITEM:
			return {
				...state,
				// This returns the state with the cartItems array filtered to remove the item
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};

		// this default comes up when the request is empty and no data is retrieved.
		default:
			return state;
	}
};
