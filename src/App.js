import React, {PureComponent, useState, useEffect } from 'react';

import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import {Login} from './Login';
import {Dashboard, ProfileData_1, SaveData} from './Dashboard';
import {Home} from './Home';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession, getUser } from './utils/Common';


class App extends React.Component{
    constructor(props){
      super();
      this.state ={
        authLoading:true,
        token:getToken(),
        user:getUser()
      }
    }
    
    componentWillMount = () => {
      console.log(this.state.token)
      if (!this.state.token) {
        console.log("hi")
        return;
      }
      axios.get(`http://192.168.0.175:4000/verifyToken?token=${this.state.token}`).then(response => {
        setUserSession(response.data.token, response.data.user);
        console.log(this.state.token);
        this.setState({
          authLoading:false
        });
      }).catch(error => {
        removeUserSession();
        this.setState({
          authLoading:false
        }); 
        });
    }

    handleLogout = () => {   
      const {history} = this.props;
      removeUserSession(); 
      console.log(history);
      history.push('/login');
    }

    render(){
      if (this.state.authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
      }
      return(
        <div className="App">
        <BrowserRouter>{/*A <BrowserRouter> uses regular URL paths. These are generally the best-looking URLs,
     but they require your server to be configured correctly. Specifically, your web server needs to serve 
    the same page at all URLs that are managed client-side by React Router*/}
          
            <div className='header'>
              <span className='header-title'>DeccanComputers</span>
              <br />
              <span className="header-content">This is about taking it deep.</span>
              <div className='nav'>
                <a href="/dashboard">Dashboard</a>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
                <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
                <PrivateRoute path="/dashboard" component={Dashboard}  />
                </div>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />
              </Switch>
              {/*--<div className="profileInputContainer_1">*/}
              {/*<PrivateRoute path="/dashboard/1" component={ProfileData_1} />*/}
              <PrivateRoute path='/dashboard/1' component={SaveData}/>
           </div>
          
        </BrowserRouter>
      </div>
      );
    }


}







// const WelcomeUser = (token, user, handleLogout,props) => {
//   const {history} = props;
//   console.log("d");
//   return !token ? null : (
//     <div className="welcomeUser">
//       Welcome {user.name}!<br /><br />
//       <input type="button" onClick={() => {handleLogout({history})}} value="Logout" />
//     </div>
//   );
// };

// function App(props) {
//     //const history = props.history
//     const token = getToken();
//     const user = getUser();
//     console.log('props', props)
    // handle click event of logout button
    // const handleLogout = (history) => {   
    //   removeUserSession(); 
    //   console.log(history);
    //   history.history.push('/login');
    // }
    
    
   
    // useEffect(() => {
    //   console.log(token)
    //   if (!token) {
    //     console.log("hi")
    //     return;
    //   }
   
    //   axios.get(`http://192.168.0.175:4000/verifyToken?token=${token}`).then(response => {
    //     setUserSession(response.data.token, response.data.user);
    //     setAuthLoading(false);
    //   }).catch(error => {
    //     removeUserSession();
    //     setAuthLoading(false);
    //   });
    // }, []);
   
    // if (authLoading && getToken()) {
    //   return <div className="content">Checking Authentication...</div>
    // }

  // return (
  //   <div className="App">
  //     <BrowserRouter>{/*A <BrowserRouter> uses regular URL paths. These are generally the best-looking URLs,
  //  but they require your server to be configured correctly. Specifically, your web server needs to serve 
  // the same page at all URLs that are managed client-side by React Router*/}
  //       <div>
  //         <div className='header'>
  //           <span className='header-title'>DeccanComputers</span>
  //           <br />
  //           <span className="header-content">This is about taking it deep.</span>
  //           <div className='nav'>
  //             <NavLink exact activeClassName="active" to="/">Home</NavLink>
  //             <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
  //             <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
  //             {WelcomeUser(token, user, handleLogout(), props)}
  //           </div>
  //         </div>
  //         <div className="content">
  //           <Switch>
  //             <Route exact path="/" component={Home} />
  //             <PublicRoute path="/login" component={Login} />
  //             <PrivateRoute path="/dashboard" component={Dashboard} />
  //           </Switch>
  //         </div>
  //       </div>
  //     </BrowserRouter>
  //   </div>
//   );
// }

export default App;