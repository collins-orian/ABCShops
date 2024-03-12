/**
 * @description: This screen displays the details of a product. It shows the product image,
 * name, rating, description, brand, supplier, price, and stock status. It also allows
 * the user to select the quantity of the product they want to buy and add it to the cart.
 *
 * @param {string} id - the id of the product
 * @returns {JSX} - returns the product details screen
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
	ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/ProductActions";

function ProductScreen() {
	// this is a react hook that sets the quantity of the product to 1
	const [quantity, setQuantity] = useState(1);
	// this is a react hook that gets the id from the url
	const { id } = useParams();
	// useHistory is a hook that gives you access to the history
	// instance that you may use to navigate to a different route
	const history = useNavigate();
	// useDispatch is a hook that allows us to dispatch an action to the redux store
	const dispatch = useDispatch();
	// useSelector is a hook that gets the redux state and allows us to pull data from it
	const productDetails = useSelector((state) => state.productDetails);
	// destructuring the productDetails object to get the error, loading and product
	const { loading, error, product } = productDetails;

	useEffect(() => {
		// fires off action listProductDetails
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		// this takes you to the cart page with the product id and quantity
		// in the url
		history(`/cart/${id}?quantity=${quantity}`);
	};

	return (
		<div>
			{/* This link takes you back to the home page */}
			<Link to="/" className="btn btn-light my-3">
				Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>

					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>

							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
									color={"#F08700"}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Description: </strong>
								<br /> {product.description}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Brand: </strong>
								<br /> {product.brand}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Supplier: </strong>
								<br /> {product.supplier}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card className="shadow">
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price: </Col>
										<Col>
											<strong>₦{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status: </Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Quantity</Col>
											<Col xs="auto" className="my-1">
												<Form.Control
													size="sm"
													as="select"
													value={quantity}
													// this sets the quantity to the value of the select option chosen by the user
													onChange={(e) => setQuantity(e.target.value)}
												>
													{
														/*this maps through the countInStock array 
														and returns an option for each number in the array*/
														[...Array(product.countInStock).keys()].map((x) => (
															/*This returns the option with the value of x + 1 and the
															 text of x + 1 for each number in the array of countInStock*/
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))
													}
												</Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}

								<ListGroup.Item>
									<Row>
										<Button
											onClick={addToCartHandler}
											className="btn-warning btn-block"
											disabled={product.countInStock === 0}
											type="button"
										>
											Add To Cart
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
}

export default ProductScreen;
