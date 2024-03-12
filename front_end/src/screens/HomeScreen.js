/**
 * @desc This is the HomeScreen component.
 * It is the first screen that the user sees when they visit the website.
 * It displays the latest products that are available for purchase.It uses the Product component to display the products.
 * @param {object} history - this is a react router dom history object
 * @returns {JSX.Element} - returns the HomeScreen component
 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/ProductActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
	// useDispatch is a hook that allows us to dispatch an action to the redux store
	const dispatch = useDispatch();
	// useSelector is a hook that gets the redux state and allows us to pull data from it
	const productList = useSelector((state) => state.productList);
	// destructuring the productList object to get the error, loading and products
	const { error, loading, products } = productList;

	// fires off action when the useState changes or a component mounts
	useEffect(() => {
		// fires off action listProducts
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			<h1>LATEST PRODUCTS</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
}

export default HomeScreen;
