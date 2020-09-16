import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import pic1 from './static/download.jpg';
import pic2 from './static/download1.jpg';
import pic3 from './static/download2.jpg';
import pdf from "./static/about.pdf";

const Home = ()=>{
  return(
  <div id='body'>
    {/*<Header/>*/}
    <Card
      className='section'
      img= {pic1}
      title='About the company'
      description='We provide service online and offline both for our customers.
                  Most of the troubleshooting that does not require experts presence
                  are executed online.In case of helper or expert demands we fulfill
                  it within a day. '/>
    <Card
      className='section bg-grey'
      img={pic2}
      title='Infrastructures and Alumni'
      description='We provide service online and offline both for our customers.
                  Most of the troubleshooting that does not require experts presence
                  are executed online.In case of helper or expert demands we fulfill
                  it within a day. '/>
    <Card
      className='section'
      img={pic3}
      title='Experts and Helpdesk'
      description='We provide service online and offline both for our customers.
                  Most of the troubleshooting that does not require experts presence
                  are executed online.In case of helper or expert demands we fulfill
                  it within a day. '/>
    <ContactContainer  
      detail = {<span className='detail'><span>Contact us and we will get back to you within 24 hours.</span><br/>
        <span>Kampala Uganda</span><br/><span>+256 778 800 900</span><br/><span>company.gmail.com</span></span>}/> 
  </div>
  );
}

{/*
const Header = ()=>{
  return(
    <div className='header'>
      <span className='header-title'>DeccanComputers</span>
      <br/>
      <span className="header-content">This is about taking it deep.</span>
    </div>
  );
}
*/}
const Card = (props) =>{
  return(
    <div className={props.className}>
      <div className="small-div">
        <i className={props.className}></i>
        <img src={props.img} alt='' height = '100 px' width = '100 px'/>
      </div>
      <div className="big-div">
        <span className="div-titlecard">
          {props.title}
        </span>
        <br/>
        <span>
          {props.description}
        </span>
      </div>
    </div>
  );
}

const ContactContainer = (props) => {
  var myStyle = {background : '#000000'}
  return(
      <div style={myStyle} className='contact-container'>
        {/*demonstration of using inline css*/}    
        <span className="div-title">Contact us</span>
            <div className='contact-form'>
                <div id='sect1'>
                    {props.detail}
                </div>           
                <div id='sect2'>
                    <input type="text" placeholder="email address" className="input-field"/>
                    <textarea name="" id="" cols="50" rows="8" placeholder="comment"></textarea>
                    <button className="contact-btn">Send</button>
                </div>
            </div>
            <hr width="90%" color="#ffffff"></hr>
            <p id="company">DeccanComputers</p>
            <a href={pdf} download >About</a>
        </div>
  );

}

export {Home};