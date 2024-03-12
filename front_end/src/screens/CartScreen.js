import React, { useEffect } from "react";
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	ListGroupItem,
	Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/CartActions";
import Message from "../components/Message";

function CartScreen() {
	// gets the id from the url
	const { id } = useParams();
	// gets the location from the url
	const location = useLocation();
	// useHistory is a hook that gives you access to the history
	// instance that you may use to navigate to a different route
	const history = useNavigate();
	// checks if the quantity is in the url and if it is it gets the quantity
	// else it sets the quantity to 1
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	const dispatch = useDispatch();
	// gets the cart state from the redux store
	const cart = useSelector((state) => state.cart);
	// destructuring the cart state to get the cartItems
	const { cartItems } = cart;

	// this useEffect runs when the component mounts
	// it checks if the id exists and if it does it dispatches the addToCart action
	// with the id and quantity
	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	const checkOutHandler = () => {
		history("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={4}>
				<Card>
					<ListGroup variant="">
						<ListGroupItem>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							<strong>
								₦
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</strong>
						</ListGroupItem>
						<ListGroupItem>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								<strong>Proceed to Checkout</strong>
							</Button>
						</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
			<Col md={8}>
				<h1>SHOPPING CART</h1>
				{cartItems.length === 0 ? (
					<Message variant="info">
						Your cart is empty <Link to="/">Back</Link>
					</Message>
				) : (
					<ListGroup variant="">
						{cartItems.map((item) => (
							<ListGroupItem>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>
										<strong>₦{item.price}</strong>{" "}
									</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.qty}
											// this dispatches the addToCart action with the product id and the quantity
											// when the select value changes it updates the quantity in the cart state
											// and the local storage with the new quantity value
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</Col>
		</Row>
	);
}

export default CartScreen;
