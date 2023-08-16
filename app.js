
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyB8Hlp5PoKbOK0Ca97jZIvtcj-hyz-d3zo",
    authDomain: "chat-app-via-login-signup.firebaseapp.com",
    databaseURL: "https://chat-app-via-login-signup-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-via-login-signup",
    storageBucket: "chat-app-via-login-signup.appspot.com",
    messagingSenderId: "702334443657",
    appId: "1:702334443657:web:e30aa142c57c82b5c32658",
    measurementId: "G-XZJ1WD59HV"
};;

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth()
const user = auth.currentUser

const signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', (e) => {
    var email = document.getElementById('get-email').value;
    var password = document.getElementById('get-password').value;
    var username = document.getElementById('get-username').value;
    var number = document.getElementById('get-number').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                number: number
            });
        })
        .then(() => {
            console.log("Data written successfully");

            // Redirect the user to chat.html after data write is complete
            window.location.href = 'chat.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});


const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', (e) => {
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {

            const user = userCredential.user;
            const dt = new Date()
            update(ref(database, 'users/' + user.uid), {
                lastLogin: dt
            });
            window.location = 'chat.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;

    } else {
        //blah blah blah
    }
});


/// styling ///

const loginStyle = document.querySelector('.login');
const signupStyle = document.querySelector('.signup');
const form = document.querySelector('.form');
const switches = document.querySelectorAll('.switch')

let current = 1

function tab2() {
    form.style.marginLeft = '-100%';
    loginStyle.style.background = 'white'
    loginStyle.style.color = 'black'
    loginStyle.style.fontWeight = 'bold'
    // loginStyle.style.border = '2px solid black'
    signupStyle.style.background = 'black'
    signupStyle.style.color = 'white'

    switches[current - 1].classList.add('active')
}

function tab1() {
    form.style.marginLeft = '0%';
    loginStyle.style.background = 'black'
    loginStyle.style.color = 'white'
    loginStyle.style.fontWeight = 'bold'
    // loginStyle.style.border = '2px solid black'
    signupStyle.style.background = 'white'
    signupStyle.style.color = 'black'

    switches[current - 1].classList.remove('active')
}

window.tab1 = tab1
window.tab2 = tab2