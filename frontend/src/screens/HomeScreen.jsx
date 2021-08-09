import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

function HomeScreen() {
    /* here "products" is json type data in our Database come from django backend fetch with axios
       we map then pass product to Product Component as a props
    */
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('/api/products/');
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomeScreen;
