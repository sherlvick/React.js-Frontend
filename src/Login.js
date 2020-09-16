import React, { useState } from 'react';
import axios from 'axios';
import {setUserSession} from './utils/Common';

function Login(props) {
  const usernameLogin = useFormInput('');
  const passwordLogin = useFormInput('');
  const username = useFormInput('');
  const password = useFormInput('');
  const name = useFormInput('');
  const [error, setError] = useState(null);
  const [errorSignup, setErrorSignup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoadingSignup(true);
    axios.post('http://192.168.0.175:4000/signin', { username: usernameLogin.value, password: passwordLogin.value }).then(response => {
      setLoadingSignup(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoadingSignup(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError(error.response.data.message);
    });
  }
 
  const handleSignup = () => {
    setError(null);
    setLoading(true);
    axios.post('http://192.168.0.175:4000/signup', {name:name.value, username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 402) setErrorSignup(error.response.data.message);
      else setErrorSignup(error.response.data.message);
    });
  }
  return (
  <div style={{flexDirection:"column", display:"flex"}}>
    <div className = "login-container">{/*LOGIN  style={{position:"relative", left:100, top:50}}*/}
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...usernameLogin}  autoComplete="on" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...passwordLogin} autoComplete="new-password" />
      </div>
      {error && (<><small style={{ color: 'red' }}>{error}</small><br /></>)}<br />
      <input type="button" value={loadingSignup ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loadingSignup} /><br />
    </div>
      <div className = "signup-container">
        Signup<br /><br />
        <div>
          Name<br />
          <input type="text" {...name} placeholder="Your Name" />
        </div>
        <div style={{ marginTop: 10 }}>
          Username<br />
          <input type="text" {...username} placeholder="Your Name" />
        </div>
        <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {errorSignup && (<><small style={{ color: 'red' }}>{errorSignup}</small><br /></>)}<br />
      <input type="button" value={loading ? 'Loading...' : 'Signup'} onClick={handleSignup} disabled={loading} /><br />
      </div>
  </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value, 
    onChange: handleChange
  }
}
 
export default Login;
