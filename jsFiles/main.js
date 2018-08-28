let post = {
    src: "images/Jack.jpeg",
    username: "mmsimpson",
    title: "Remington 700",
    location: "Savannah, Ga",
    price: 200
};
let postArea = document.querySelector('.postSection');

let postSection = () => {
    let mainPost = document.createElement('div');
    let postHead = document.createElement('div');
    let userImage = document.createElement('img');
    let postTitle = document.createElement('div');
    let titleUsername = document.createElement('div');
    let userProduct = document.createElement('div');
    let locationPrice = document.createElement('div');
    let location = document.createElement('div');
    let price = document.createElement('div');
    
    mainPost.classList.add('post');
    postHead.classList.add('postHead');
    userImage.classList.add('userIcon');
    postTitle.classList.add('userPostTitle');
    titleUsername.classList.add('username');
    userProduct.classList.add('userProduct');
    locationPrice.classList.add('locationPrice');
    location.classList.add('username');
    price.classList.add('userPrice');

    userImage.setAttribute('src', post.src);
    titleUsername.textContent = post.username;
    userProduct.textContent = post.title;
    location.textContent = post.location;
    price.textContent = '$' + post.price;
    
    postTitle.appendChild(titleUsername);
    postTitle.appendChild(userProduct);
    locationPrice.appendChild(location);
    locationPrice.appendChild(price);

    postHead.appendChild(userImage);
    postHead.appendChild(postTitle);
    postHead.appendChild(locationPrice);

    mainPost.appendChild(postHead);

    postArea.appendChild(mainPost);

};

postSection();

