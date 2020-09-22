import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import {getUser,removeUserSession} from './utils/Common';
import axios from 'axios';
//import {useFormInput} from './Login';



function Dashboard(props) {
  const user = getUser();
  // handle click event of logout button
  const handleLogout = () => {   
    removeUserSession(); 
    props.history.push('/login');
  }
 console.log("hi2");
  return (
    <div className="welcomeUser">
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

function ProfileData_1(props){
  console.log("hi4");
  return(
    <div className="profileInputContainer_1">
    <Form>
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Email address</Form.Label>
      <Form.Control size="sm" type="email" {...props.email} placeholder="name@example.com" required/>
      <Form.Label>Mobile no.</Form.Label>
      <Form.Control size="sm" type="text" placeholder="91******00" required/>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Gender</Form.Label>
      <Form.Control as="select" defaultValue={"default"} size="sm" required>
        <option value="default" disabled></option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlSelect2">
      <Form.Label>Work Experience</Form.Label>
      <Form.Control as="select" defaultValue={"default"} size="sm" required>
        <option value="default" disabled>Choose year of Experience</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
    </Form.Group>
    {/*    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Example textarea</Form.Label>
      <Form.Control as="textarea" rows="3" />
    </Form.Group>*/ }
  </Form>
    </div>

    );
}

const SaveData = () => {
  const email = useFormInput('');
  const [loading2, setLoading2] = useState(false);
  console.log(loading2);
  console.log("hi5");
  const handleSend = () => {
      setLoading2(true);
      axios.post('http://192.168.0.175:4000/saveProfile', { email: email.value}).then(response => {
      setLoading2(false);
        //setUserSession(response.data.token, response.data.user);
        // props.history.push('/dashboard');
        // if(true){
        //   props.history.push('/dashboard/1');
        // }
      });
  }
  return(
    <div>
    <ProfileData_1
          email = {email} />
    <div style={{float:"right", marginRight:"60px", paddingBottom:"20px"}}>
      <input type="button" className="btn btn-primary" value={loading2 ? 'Loading...' : 'Next'} onClick={handleSend} disabled={loading2}></input>
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
 

export {Dashboard, ProfileData_1, SaveData};


