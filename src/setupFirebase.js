const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyB-FKFAy6ZClPUZv2ion_my-prVMgR0oMg",
  authDomain: "paytweetb.firebaseapp.com",
  databaseURL: "https://paytweetb.firebaseio.com",
  projectId: "paytweetb",
  storageBucket: "paytweetb.appspot.com",
  messagingSenderId: "42744606293"
};

firebase.initializeApp(config);

export default firebase;
