import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';

function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, pages, page } = productList;

    const keyword = history.location.search;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
