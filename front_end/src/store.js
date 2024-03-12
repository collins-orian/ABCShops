/**
 * @fileoverview store.js is the file that creates the store for the redux application.
 * It combines all the reducers we have into one reducer and creates the store with
 * the combined reducer. It also applies the middleware and devtools to the store.
 * @requires redux
 * @requires redux-thunk
 * @requires redux-devtools-extension
 * @requires ./reducers/ProductReducers
 * @exports store
 */

import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/ProductReducers";
import { cartReducer } from "./reducers/CartReducers";

// combines all the reducers we have into one reducer
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});

// This gets the cartItems from the local storage of the browser
// if it exists else it returns an empty array
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

// This sets the initial state of the store
const initialState = { cart: { cartItems: cartItemsFromStorage } };

const middleware = [thunk];

// helps create store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
