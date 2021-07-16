import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import LandingPage from './components/pages/LandingPage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Store from './components/pages/Store';


function App() {
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

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage currentUser={currentUser} />
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
        <Store currentUser={currentUser} />
      </Route>
    </Switch>
  );
}

export default App;
