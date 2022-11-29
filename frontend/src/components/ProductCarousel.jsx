import { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { topRatedProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';

export default function ProductCarousel() {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(topRatedProducts());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Carousel pause="hover" className="bg-dark">
                    {products.map((product) => (
                        <Carousel.Item key={product.id}>
                            <Link to={`/product/${product.id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className="carouser.caption">
                                    <h4>
                                        {product.name} (${product.price})
                                    </h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
