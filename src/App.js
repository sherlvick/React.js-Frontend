import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
 
import Login from './Login';
import Dashboard from './Dashboard';
import {Home} from './Home';
 
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './utils/Common';
 



function App() {
    const [authLoading, setAuthLoading] = useState(true);
   
    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }
   
      axios.get(`http://192.168.0.175:4000/verifyToken?token=${token}`).then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      }).catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
    }, []);
   
    if (authLoading && getToken()) {
      return <div className="content">Checking Authentication...</div>
    }

  return (
    <div className="App">
      <BrowserRouter>{/*A <BrowserRouter> uses regular URL paths. These are generally the best-looking URLs,
   but they require your server to be configured correctly. Specifically, your web server needs to serve 
  the same page at all URLs that are managed client-side by React Router*/}
        <div>
          <div className='header'>
            <span className='header-title'>DeccanComputers</span>
            <br />
            <span className="header-content">This is about taking it deep.</span>
            <div className='nav'>
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
              <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
            </div>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;