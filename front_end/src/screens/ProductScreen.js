import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/ProductActions";

function ProductScreen() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(listProductDetails(id));
	}, [dispatch, id]);

	return (
		<div>
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
								<ListGroup.Item>
									<Row>
										<Button
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
