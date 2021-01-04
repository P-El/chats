
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyDH3NbjBcq0lWolH0hgki9E68NdCyXr7uk",
  authDomain: "chats-e59f7.firebaseapp.com",
  projectId: "chats-e59f7",
  storageBucket: "chats-e59f7.appspot.com",
  messagingSenderId: "525641251497",
  appId: "1:525641251497:web:f4e15b4fc7e5ef553607b8",
  measurementId: "G-JH4Z71BZVC"
};
  // Initialize Firebase
  const fire =  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 
  export default  fire; 