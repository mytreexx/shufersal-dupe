import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import LandingPage from './components/pages/LandingPage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Store from './components/pages/Store';
import OrderPage from './components/pages/OrderPage';
import Receipt from './components/pages/Receipt';
import AdminPage from './components/pages/AdminPage';


function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('currentUser')
  );

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(undefined);
    history.push('/');
  };

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage currentUser={currentUser} logout={logout} />
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

      <Route path="/store">
        <Store currentUser={currentUser} logout={logout} />
      </Route>

      <Route path="/order">
        <OrderPage currentUser={currentUser} />
      </Route>

      <Route path="/receipt/:shippingDate/:orderId">
        <Receipt currentUser={currentUser} />
      </Route>

      <Route path="/admin">
        <AdminPage currentUser={currentUser} />
      </Route>
    </Switch>
  );
}

export default App;
