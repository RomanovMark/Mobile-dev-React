import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



const firebaseConfig = {
  apiKey: "AIzaSyCwPt_Rj24UTzOqpEVq8AjmdD1-cRWwjXU",
  authDomain: "shoppinglist-5f1ac.firebaseapp.com",
  projectId: "shoppinglist-5f1ac",
  storageBucket: "shoppinglist-5f1ac.appspot.com",
  messagingSenderId: "641764697517",
  appId: "1:641764697517:web:d6e82c894d567bb09f2d24",
  measurementId: "G-FKMMK1S5NB"
}
firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();
// firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
