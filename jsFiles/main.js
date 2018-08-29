let posts = [{
    src: "images/Jack.jpeg",
    username: "mmsimpson",
    title: "Remington 700",
    description:"Oukast is best bamnd eva",
    dsrc: "images/plunderLogoFinalCrop.png",
    location: "Savannah, Ga",
    price: 200
},
{
    src: "images/Jack.jpeg",
    username: "MattisaGoober",
    title: "Unicorn collection",
    description:" Nickleback is highly underrated",
    dsrc: "images/plunderLogoFinalCrop.png",
    location: "Atlanta, Ga",
    price: 20000
},
{
    src: "images/Jack.jpeg",
    username: "Drose345",
    title: "Fine China",
    description: "I thought you knew the word. That bird is the word",
    dsrc: "images/plunderLogoFinalCrop.png",
    location: "San Diego, Ca",
    price: 300
},
{
    src: "images/Jack.jpeg",
    username: "anon876",
    title: "Plush Toys",
    description: "Do you believe in life after love?!!!",
    dsrc: "images/plunderLogoFinalCrop.png",
    location: "Athens, Ga",
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
    let descripImage = document.createElement('img')
    let descripText = document.createElement('p')
    
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
    descripText.classList.add('paraText')
    

    userImage.setAttribute('src', post.src);
    titleUsername.textContent = post.username;
    userProduct.textContent = post.title;
    location.textContent = post.location;
    price.textContent = '$' + post.price;
    description.textContent = post.description;
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

};

posts.forEach( function (post) {
    postSection(post) 
    newPostSlide(post)
});
    




