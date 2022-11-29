import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            {/* this is Navbar collect from react-bootstrap */}

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    {/* For prevent ReLoading we use <LinkContainer> insted of <a> tag */}

                    <LinkContainer to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="me-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" /> cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="name">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user" /> login
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
