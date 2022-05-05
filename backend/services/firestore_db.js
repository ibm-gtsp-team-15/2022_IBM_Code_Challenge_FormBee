// Import the functions you need from the SDKs you need
const { firestore } = require("firebase-admin");
const firebase = require("firebase-admin");
const serviceAccount = require("../keys/firestore_sa_key.json");

const firebaseConfig = {
	apiKey: "AIzaSyASU3TFELIO_KygJ2E4BToiTh6X60c_kZU",
	authDomain: "formbee-39b76.firebaseapp.com",
	projectId: "formbee-39b76",
	storageBucket: "formbee-39b76.appspot.com",
	messagingSenderId: "611502633718",
	appId: "1:611502633718:web:f199e86f2f4d5ed783b2d7",
	measurementId: "G-CQZPZTRQDN",
	credential: firebase.credential.cert(serviceAccount),
	databaseURL:
		"https://proctronapp-344514.asia-southeast2.firebasedatabase.app",
};

const app = firebase.initializeApp(firebaseConfig);
const fStore = app.firestore();
const bucket = firebase.storage(app).bucket();

module.exports.firestore = fStore;
module.exports.bucket = bucket;
