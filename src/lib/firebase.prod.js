import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { dataDb } from '../data';


const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const AUTH_DOM = process.env.REACT_APP_FIREBASE_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const STORE_BUCKET = process.env.REACT_APP_FIREBASE_STOAGE_BUCKET;
const MESS_SENDID = process.env.REACT_APP_FIREBASE_MESSAGE_ID;
const APP_ID = process.env.REACT_APP_FIREBASE_ID;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOM,
  projectId: PROJECT_ID,
  storageBucket: STORE_BUCKET,
  messagingSenderId: MESS_SENDID,
  appId: APP_ID
};

const firebase = Firebase.initializeApp(config);

// dataDb(firebase);

export { firebase };