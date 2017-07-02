import * as firebase from 'firebase';
import Exponent from "expo";

const firebaseConfig = {
    apiKey: "AIzaSyCH55ezwayYQOUlTeIM2HocU8sXJ5y-9jg",
    authDomain: "dine2-c07a9.firebaseapp.com",
    databaseURL: "https://dine2-c07a9.firebaseio.com",
    projectId: "dine2-c07a9",
    storageBucket: "dine2-c07a9.appspot.com",
    messagingSenderId: "196997016296"
};

const fbConfig = {
    add_id : "452462351799500",
    options: {
        permissions: ["public_profile", "email"]
    }
}

firebase.initializeApp(firebaseConfig);

// get the token from expo and use firebase api to auth
export const  authenticateUser = token => {
    const provider = firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    return firebase.auth().signInWithCredential(credential);
};

// Using exponent
export const loginUser = async () => {
    const {type, token} = await Exponent.Facebook
        .logInWithReadPermissionsAsync(fbConfig.add_id, fbConfig.options);
    if (type === "success") {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(await response.json());
        authenticateUser(token);
    }
}

export const logoutUser = () => {
    firebase.auth().signOut();
    console.log("LOGOUT FROM SERVICE");
};

export const database = firebase.database();

export const  currentUser = firebase.auth().currentUser;

export default firebase;