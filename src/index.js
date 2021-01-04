import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';


 /*
var firebaseConfig = {
  apiKey: "AIzaSyDH3NbjBcq0lWolH0hgki9E68NdCyXr7uk",
  authDomain: "chats-e59f7.firebaseapp.com",
  projectId: "chats-e59f7",
  storageBucket: "chats-e59f7.appspot.com",
  messagingSenderId: "525641251497",
  appId: "1:525641251497:web:f4e15b4fc7e5ef553607b8",
  measurementId: "G-JH4Z71BZVC"
}
var fire = firebase.initializeApp(firebaseConfig);
*/
// export default fire;
 

const routing = (
      <Router>
        <div id="routing-container">
          <Route path ="/" exact={true}  component={LoginComponent}></Route>
          <Route path ="/signup" component={SignupComponent}></Route>
          <Route path ="/dashboard" component={DashboardComponent}></Route>
        </div>
      </Router>
);

ReactDOM.render(routing,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
