import { Switch, Route, useHistory } from 'react-router-dom';

import './App.css';
import LandingPage from './components/pages/LandingPage';
import Register from './components/pages/Register';


function App() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>

      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
}

export default App;
