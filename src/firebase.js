// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "insta-next-f12a1.firebaseapp.com",
    projectId: "insta-next-f12a1",
    storageBucket: "insta-next-f12a1.appspot.com",
    messagingSenderId: "629730851444",
    appId: "1:629730851444:web:5ed8ea5dceac591cd12f21"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//     match / b / { bucket } / o {
//         match / { allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 5 * 1024 * 1024 &&
//                 request.resource.contentType.matches('image/.*')
//     }
//     }
// }