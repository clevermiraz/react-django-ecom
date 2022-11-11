import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

function App() {
    /*  Wrap with <Router> cause we want to implement Client side routing
        use exact path on '/' cause allWhere has '/'
    */

    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/register" component={RegisterScreen} />
                    <Route exact path="/profile" component={ProfileScreen} />
                    <Route exact path="/shipping" component={ShippingScreen} />
                    <Route exact path="/payment" component={PaymentScreen} />
                    <Route exact path="/placeorder" component={PlaceOrderScreen} />
                    <Route exact path="/product/:id" component={ProductScreen} />
                    <Route exact path="/cart/:id?" component={CartScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
