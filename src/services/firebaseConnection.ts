import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Os imports acima são para a versão 9x do Firebase. Abaixo
// dessa versão, deve-se declarar os imports da seguinte forma:
//import firebase from "firebase/app";
//import "firebase/firestore";

let firebaseConfig = {
  apiKey: "SUA API_KEY",
  authDomain: "SEU_AUTHDOMAIN",
  projectId: "SEU_PROJECTID",
  storageBucket: "SEU_STORAGEBUCKET",
  messagingSenderId: "SEU_MESSAGINGSENDERID",
  appId: "SEU_APPID",
  measurementId: "SEU_MEASUREMENTID",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
