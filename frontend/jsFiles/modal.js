let loginBTN = document.querySelector('#login');
let registerBTN = document.querySelector('#register');
let postBTN = document.querySelector('#post');
let modalWindow = document.querySelector('.modalBG');
let modalLogin = document.querySelector('.modalLogin');
let modalRegister = document.querySelector('.modalRegister');
let modalPost = document.querySelector('.modalPost')
let plunderBTN = document.querySelector('#plunders')
let modalPlunders = document.querySelector('.modalPlunders');
let plunders = document.querySelectorAll('.post');
let navBTN = document.querySelector('.navLogo');
let loginForm = document.querySelector('.loginForm')
let mapBTNS = document.querySelectorAll('.mapBTN');
let modalMap = document.querySelector('.modalMap');

let loginSubmission = (event) => {
    event.preventDefault();
    let loginSubmissionObject = {username:'', password: ''};
    let usernameSubmit = document.querySelector('.inputFieldUsername');
    let passwordSubmit = document.querySelector('.inputFieldPassword');
    loginSubmissionObject['username'] = usernameSubmit.value;
    loginSubmissionObject['password'] = passwordSubmit.value;
    console.log(loginSubmissionObject);
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginSubmissionObject),
        headers: {'Content-Type': 'application/json'}
    })
    .then((result) => {
        return result.text()
    })
    .then((result)=>{
        console.log(result);
    })
}
let postSubmission = (event) => {
    event.preventDefault();
    let postSubmissionObject = {item:'', category:'', description:'', descripimg:'', price:''};
    let itemNameSubmit = document.querySelector('.inputFieldItem')
    let categorySubmit = document.querySelector('.inputFieldCategory');
    let descriptionSubmit = document.querySelector('.inputFieldDescription');
    let descriptionImg = document.querySelector('.inputFieldDescriptionImg');
    let passwordSubmit = document.querySelector('.inputFieldPassword');

}
let showLogin = (event) => {
    modalWindow.classList.add('show');
    modalLogin.classList.add('show');
}

let showRegister = (event) => {
    modalWindow.classList.add('show');
    modalRegister.classList.add('show');
}

let showPost = (event) => {
    modalWindow.classList.add('show');
    modalPost.classList.add('show');
}

let showPlunders = (event) => {
    modalWindow.classList.add('show');
    modalPlunders.classList.add('showPlunders');
}

let hideModal = (event) => {
    if (event.target === modalWindow) {
        empty(modalMap);
        modalWindow.classList.remove('show');
        modalLogin.classList.remove('show');
        modalMap.classList.remove('show');
        modalRegister.classList.remove('show');
        modalPost.classList.remove('show');
        modalPlunders.classList.remove('showPlunders');
    }
}

navBTN.addEventListener('click', showPlunders);
plunderBTN.addEventListener('click', showPlunders);
registerBTN.addEventListener('click', showRegister);
postBTN.addEventListener('click',showPost)
modalWindow.addEventListener('click', hideModal);
loginBTN.addEventListener('click', showLogin);
loginForm.addEventListener('submit', loginSubmission);


