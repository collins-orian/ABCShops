/**
 * @desc: This file contains the action for adding items to the cart.
 * It contains the addToCart function that is dispatched to the store
 * and the state is passed to the desired component.
 *
 * @requires axios
 * @requires CART_ADD_ITEM
 * @exports addToCart
 */

import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/CartConstants";

/**
 * this addToCart function actions that the cartReducer acts on
 * to enable state to be passed to a desired component.
 * @param {string} id - the id of the product
 * @param {number} qty - the quantity of the product
 * @param {object} dispatch - the action to be carried out
 * @param {object} getState - the state of the cart
 * @returns {object} - the data gotten from the api
 *
 * @exports addToCart
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});
	/*
	this uses getState() to get the current state of the cart and stores
	it in the local storage of the browser so that the cart items are not lost
	when the page is refreshed or closed.
	*/
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
