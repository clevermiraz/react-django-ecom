import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
    /* Here we make smiple card that shows img,name,rating & price
       For rating handle We pass some info as a props in Rating component
    */

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product.id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color="#f8e825"
                        />
                    </div>
                </Card.Text>

                <Card.Text as="h3">$ {product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
