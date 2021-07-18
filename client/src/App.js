import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";

import './App.css';
import LandingPage from './components/pages/LandingPage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Store from './components/pages/Store';
import OrderPage from './components/pages/OrderPage';
import Receipt from './components/pages/Receipt';
import EditProductsPage from './components/pages/EditProductsPage';
import AddProduct from './components/pages/AddProduct';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('currentUser')
  );
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
      setUserDetails(jwtDecode(currentUser).loggingInUser)
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(undefined);
    localStorage.setItem('currentUser', currentUser);
    setUserDetails(jwtDecode(currentUser).loggingInUser)
    history.push('/');
  };

  const isAdmin = () => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser && jwtDecode(currentUser).loggingInUser.is_admin;
  }

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage currentUser={currentUser} userDetails={userDetails} logout={logout} />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/login">
        <Login
          onUserChange={setCurrentUser}
          currentUser={currentUser}
        />
      </Route>

      <PrivateRoute hasAccess={!!currentUser} redirectTo="/login" path="/store">
        <Store currentUser={currentUser} userDetails={userDetails} logout={logout} />
      </PrivateRoute>

      <PrivateRoute hasAccess={!!currentUser} redirectTo="/login" path="/order">
        <OrderPage currentUser={currentUser} userDetails={userDetails} />
      </PrivateRoute>

      <PrivateRoute hasAccess={!!currentUser} redirectTo="/login" path="/receipt/:shippingDate/:orderId">
        <Receipt currentUser={currentUser} />
      </PrivateRoute>

      <PrivateRoute hasAccess={isAdmin()} redirectTo="/" path="/editProducts">
        <EditProductsPage currentUser={currentUser} />
      </PrivateRoute>

      <PrivateRoute hasAccess={isAdmin()} redirectTo="/" path="/addProduct">
        <AddProduct currentUser={currentUser} />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
