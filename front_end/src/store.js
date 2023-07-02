import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/ProductReducers";

// combines all the reducers we have into one reducer
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

// helps create store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
