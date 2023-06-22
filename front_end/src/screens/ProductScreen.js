import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

function ProductScreen() {
	const { id } = useParams();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		async function fetchProduct() {
			const { data } = await axios.get(`/api/products/${id}`);
			setProduct(data);
		}

		fetchProduct();
	});

	return (
		<div>
			<Link to="/" className="btn btn-light my-3">
				Back
			</Link>

			<br />

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
							<strong>Price: ₦{product.price}</strong>
						</ListGroup.Item>
						<ListGroup.Item>
							<strong>Description: </strong>
							<br /> {product.description}
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
		</div>
	);
}

export default ProductScreen;
