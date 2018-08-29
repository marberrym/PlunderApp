let loginBTN = document.querySelector('#login');
let registerBTN = document.querySelector('#register');
let modalWindow = document.querySelector('.modalBG');
let modalLogin = document.querySelector('.modalLogin');
let modalRegister = document.querySelector('.modalRegister');
let plunderBTN = document.querySelector('#plunders')
let modalPlunders = document.querySelector('.modalPlunders');
let posts = document.querySelectorAll('.post');

let showLogin = (event) => {
    modalWindow.classList.add('show');
    modalLogin.classList.add('show');
}

let showRegister = (event) => {
    modalWindow.classList.add('show');
    modalRegister.classList.add('show');
}

let showPlunders = (event) => {
    modalWindow.classList.add('show');
    modalPlunders.classList.add('showPlunders');
}

let hideModal = (event) => {
    if (event.target === modalWindow) {
        modalWindow.classList.remove('show');
        modalLogin.classList.remove('show');
        modalRegister.classList.remove('show');
        modalPlunders.classList.remove('showPlunders');
    }
}

posts.forEach(function(post){
    let showPost = (event) => {
        post.childNodes[3].classList.toggle('showDesc');
    }
    console.log(post.childNodes);
    post.addEventListener('click', showPost)
});

plunderBTN.addEventListener('click', showPlunders);
registerBTN.addEventListener('click', showRegister);
modalWindow.addEventListener('click', hideModal);
loginBTN.addEventListener('click', showLogin);