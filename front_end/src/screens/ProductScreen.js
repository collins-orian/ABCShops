import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

function ProductScreen({ history }) {
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		history.push(`/cart/${id}?quantity=${quantity}`);
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
								<h2>{product.name}</h2>
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
											<Col className="my-1">
												<Form.Control
													size="sm"
													as="select"
													value={quantity}
													onChange={(e) => setQuantity(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
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
