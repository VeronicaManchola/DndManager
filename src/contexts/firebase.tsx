// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD2J_D17rhlBmDC5jGH4KCFk8RcyMWC5bA',
  authDomain: 'dnd-manager-deb88.firebaseapp.com',
  projectId: 'dnd-manager-deb88',
  storageBucket: 'dnd-manager-deb88.appspot.com',
  messagingSenderId: '789172993432',
  appId: '1:789172993432:web:88da0f7650cfa42497ffed',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
