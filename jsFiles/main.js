let posts = [{
    src: "images/Jack.jpeg",
    username: "mmsimpson",
    item: "Remington 700",
    description:"Oukast is best bamnd eva",
    dsrc: "images/plunderLogoFinalCrop.png",
    city: "Savannah", 
    state: "GA",
    price: 200
},
{
    src: "images/Jack.jpeg",
    username: "MattisaGoober",
    item: "Unicorn collection",
    description:" Nickleback is highly underrated",
    dsrc: "images/plunderLogoFinalCrop.png",
    city: "Savannah", 
    state: "GA",
    price: 20000
},
{
    src: "images/Jack.jpeg",
    username: "Drose345",
    item: "Fine China",
    description: "I thought you knew the word. That bird is the word",
    dsrc: "images/plunderLogoFinalCrop.png",
    city: "Savannah", 
    state: "GA",
    price: 300
},
{
    src: "images/Jack.jpeg",
    username: "anon876",
    item: "Plush Toys",
    description: "Do you believe in life after love?!!!",
    dsrc: "images/plunderLogoFinalCrop.png",
    city: "Savannah", 
    state: "GA",
    price: 765
}];

let postArea = document.querySelector('.postSection');

let postSection = (post) => {
    
    let mainPost = document.createElement('div');
    let postHead = document.createElement('div');
    let userImage = document.createElement('img');
    let postTitle = document.createElement('div');
    let titleUsername = document.createElement('div');
    let userProduct = document.createElement('div');
    let locationPrice = document.createElement('div');
    let location = document.createElement('div');
    let price = document.createElement('div');
    let description = document.createElement('div');
    let descripImage = document.createElement('img');
    let descripText = document.createElement('p');

    let showPost = (event) => {
        description.classList.toggle('showDesc');
    }

    console.log(mainPost.childNodes[3]);
    
    mainPost.classList.add('post');
    postHead.classList.add('postHead');
    userImage.classList.add('userIcon');
    postTitle.classList.add('userPostTitle');
    titleUsername.classList.add('username');
    userProduct.classList.add('userProduct');
    locationPrice.classList.add('locationPrice');
    location.classList.add('username');
    price.classList.add('userPrice');
    description.classList.add('descriptions');
    descripImage.classList.add('descriptionIMG');
    descripText.classList.add('paraText');

    userImage.setAttribute('src', post.src);
    titleUsername.textContent = post.username;
    userProduct.textContent = post.item;
    location.textContent = post.city + ', ' + post.state;
    price.textContent = '$' + post.price;
    descripText.textContent = post.description
    descripImage.setAttribute('src', post.dsrc)

    description.appendChild(descripText);
    description.appendChild(descripImage);

    postTitle.appendChild(titleUsername);
    postTitle.appendChild(userProduct);
    locationPrice.appendChild(location);
    locationPrice.appendChild(price);

    postHead.appendChild(userImage);
    postHead.appendChild(postTitle);
    postHead.appendChild(locationPrice);

    mainPost.appendChild(postHead);
    mainPost.appendChild(description);

    postArea.appendChild(mainPost);

    mainPost.addEventListener('click', showPost)

};

posts.forEach(function (post) {
    postSection(post)
});
    




