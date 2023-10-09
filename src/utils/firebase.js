import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC30kqGzeTw0ikUo0HgAp2wmsRRr1FxvYo",
    authDomain: "deakin-web-app-ea330.firebaseapp.com",
    projectId: "deakin-web-app-ea330",
    storageBucket: "deakin-web-app-ea330.appspot.com",
    messagingSenderId: "1044833232582",
    appId: "1:1044833232582:web:53a21e753bd05d9581d9c7",
    measurementId: "G-GW6R9SLB4Q"
  };

  // Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters ({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth= async (userAuth, additionalInformation = {}) =>{
    if(!userAuth.email) return;
    const userDocRef = doc(db,'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
   

    if (! userSnapshot.exists()){
        const { displayName, email}  = userAuth;
        const createdAt = new Date();

    try{
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
    }
    catch (error){
    console.log('error in creating', error.message)
    }
}

    return userDocRef;
}

export const createAuthUserWithEmailandPassword = async (email,password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}
