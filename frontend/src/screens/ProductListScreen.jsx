/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct, listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function ProductListScreen({ history, match }) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure want to delete product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = (product) => {
        // createproduct
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            Edit
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(product.id)}
                                    >
                                        Trash
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
