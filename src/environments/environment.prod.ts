// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyDTtofIxsCvA1E1RfcwgKvxnHe1ememWwE",
        authDomain: "coh-league-acb3b.firebaseapp.com",
        databaseURL: "https://coh-league-acb3b-default-rtdb.firebaseio.com",
        projectId: "coh-league-acb3b",
        storageBucket: "coh-league-acb3b.appspot.com",
        messagingSenderId: "386515148968",
        appId: "1:386515148968:web:48ab74bc77be8de5f7629d",
        measurementId: "G-4XVG664HCY"
    }
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);