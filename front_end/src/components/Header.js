import React from "react";
import {
	NavDropdown,
	Navbar,
	Nav,
	Container,
	Form,
	Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
	return (
		<header>
			<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>LabEquip</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0 mr-auto"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fa-solid fa-cart-shopping"></i> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fa-solid fa-user"></i> Login
								</Nav.Link>
							</LinkContainer>

							<NavDropdown title="Link" id="navbarScrollingDropdown">
								<NavDropdown.Item href="#action3">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action4">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action5">
									Something else here
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form className="d-flex">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
							/>
							<Button variant="btn btn-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
