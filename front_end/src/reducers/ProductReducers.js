import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/ProductConstants";

/**
 * This product list reducer handles state management for listing
 * products. based on an action that is carried out, passed to this
 * reducer and is being passed on the desired component.
 */

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		/**
		 * this case occurs at the initial request from the API. Initially,
		 * the products array is empty but gets updated when an action has
		 * taken place. Loading is set to true as data has not yet been
		 * retrieved from the API
		 */
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		/**
		 * this case comes up when the request is successful and the data gotten
		 * from the api request comes back. the products array gets updated and
		 * the data is stored in it. Loading is set to false as data has been
		 * retrieved from the API
		 */
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };

		/**
		 * this case comes up when the request failed and the data gotten
		 * from the api request is not gotten. The products array does not
		 * get updated. Loading is set to false as data has been
		 * retrieved from the API
		 */

		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		/**
		 * this default comes up when the request is empty and no data is retrieved.
		 * the state is returned with an empty products array
		 */

		default:
			return state;
	}
};

export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
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
