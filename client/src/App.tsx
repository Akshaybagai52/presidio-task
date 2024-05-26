import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PrivateRoute from './components/private-routes/PrivateRoute';
import Register from './pages/Register/Register';
import SellerProperties from './pages/Seller-Properties/SellerProperties';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Seller Routes */}
        <Route element={<PrivateRoute roles={['seller']} />}>
          <Route path="/seller-dashboard" element={<SellerProperties />} />
          {/* <Route path="/add-property" element={<AddProperty />} /> */}
        </Route>
        
        {/* Buyer Routes */}
        {/* <Route element={<PrivateRoute roles={['buyer']} />}>
          <Route path="/buyer-dashboard" element={<BuyerProperties />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
