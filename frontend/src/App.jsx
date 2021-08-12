import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

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
                    <Route exact path="/product/:id" component={ProductScreen} />
                    <Route exact path="/cart/:id?" component={CartScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
