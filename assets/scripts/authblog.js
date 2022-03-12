window.addEventListener('DOMContentLoaded', init);

function init(){

    login();
    
}

function login(){
    const loginBtn = document.querySelector('header nav ul li button');
    loginBtn.addEventListener('click', ()=>{
        loginField();
    });
}
    
function loginField(){
    const user = firebase.auth().currentUser;
    if(user !== null){
        logOut();
    }
    else{
        authLogIn();
    }
}

function authLogIn(){
    const dialogLogin = document.createElement('dialog');
    dialogLogin.className = 'dialog-on';
    const formLogin = document.createElement('form');
    const spanError = document.createElement('span');
    spanError.className = 'error-msg';
    const h3Login = document.createElement('h3');
    h3Login.innerText = 'Login - Blog Post';
    const hr = document.createElement('hr');
    hr.className = 'hr-login';
    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for','email');
    labelEmail.innerText = 'Email';
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('id','email');
    const labelPassword = document.createElement('label');
    labelPassword.setAttribute('for', 'password');
    labelPassword.innerText = 'Password';
    const inputPassword = document.createElement('input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('id','password');
    inputPassword.setAttribute('autocomplete', 'on')
    const sectionButtons = document.createElement('section');
    const btnLogin = document.createElement('button');
    btnLogin.innerText = 'Login';
    btnLogin.className = 'confirm-login-btn';
    const btnCancel = document.createElement('button');
    btnCancel.innerHTML = 'Cancel';
    btnCancel.className = 'cancel-login-btn';

    sectionButtons.appendChild(btnCancel);
    sectionButtons.appendChild(btnLogin);

    formLogin.appendChild(spanError);
    formLogin.appendChild(h3Login);
    formLogin.appendChild(hr);
    formLogin.appendChild(labelEmail);
    formLogin.appendChild(inputEmail);
    formLogin.appendChild(labelPassword);
    formLogin.appendChild(inputPassword);
    formLogin.appendChild(sectionButtons);

    dialogLogin.appendChild(formLogin);

    const body = document.querySelector('body');
    body.appendChild(dialogLogin);

    dialogLogin.showModal();


    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogLogin.close();
        dialogLogin.remove();
    });

    btnLogin.addEventListener('click', (e)=>{
        e.preventDefault();
        const email = inputEmail.value;
        const password = inputPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    window.location.reload();
                    dialogLogin.close();
                    dialogLogin.remove();
                }
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            showError(spanError, errorMessage);
        });
    });
}

function logOut(){
    const dialogLogout = document.createElement('dialog');
    dialogLogout.className = 'dialog-on';
    const formLogout = document.createElement('form');
    const spanError = document.createElement('span');
    spanError.className = 'error-msg';
    const h3LogoutPrompt = document.createElement('h3');
    h3LogoutPrompt.innerText = 'You are about to log out, are you sure?';
    const cancelLogout = document.createElement('button');
    cancelLogout.innerHTML = 'Stay';
    cancelLogout.className = 'cancel-logout-btn';
    const confirmDelete = document.createElement('button');
    confirmDelete.innerHTML = 'Log Me Out';
    confirmDelete.className = 'confirm-logout-btn';
    const sectionMenu = document.createElement('section');
    
    sectionMenu.appendChild(cancelLogout);
    sectionMenu.appendChild(confirmDelete);

    formLogout.appendChild(spanError);
    formLogout.appendChild(h3LogoutPrompt);
    formLogout.appendChild(sectionMenu);

    dialogLogout.appendChild(formLogout);

    const body = document.querySelector('body');
    body.appendChild(dialogLogout);
    
    dialogLogout.showModal();
    
    cancelLogout.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogLogout.close();
        dialogLogout.remove();
    });

    confirmDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        firebase.auth().signOut()
        .then(() => {
            // Signed out
            firebase.auth().onAuthStateChanged(() => {
                dialogLogout.close();
                dialogLogout.remove();
                window.location.reload();
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            showError(spanError, errorMessage);
        });
    });
}

/**
 * Show error message
 * @param {string} msg - error message 
 * @param {DOM} span - span element attached to dialog prompt
 */
function showError(span, msg){
    span.innerHTML = msg;
}