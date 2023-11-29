import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/ProductActions";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
	const dispatch = useDispatch();
	// this helps access certain parts of our state/store, in this case, productList
	const productList = useSelector((state) => state.productList);
	const { error, loading, products } = productList;

	// fires off action when the useState changes or a component mounts
	useEffect(() => {
		// fires off action listProducts
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			<h1>Our Latest Products</h1>
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
