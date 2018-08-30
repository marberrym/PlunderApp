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
    let mapBTN = document.createElement('div');
    let description = document.createElement('div');
    let descripImage = document.createElement('img');
    let descripText = document.createElement('p');

    let showPost = (event) => {
        if (event.target != mapBTN) {
            description.classList.toggle('showDesc');
        }
    }
    let showMap = (event) => {
        modalWindow.classList.add('show');
        modalMap.classList.toggle('show');
    }

    //console.log(mainPost.childNodes[3]);
    
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
    mapBTN.classList.add('mapBTN');

    userImage.setAttribute('src', post.userimg);
    titleUsername.textContent = post.username;
    userProduct.textContent = post.item;
    mapBTN.textContent = 'Suggested Plunder Spots';
    location.textContent = post.city + ', ' + post.state;
    price.textContent = '$' + post.price;
    descripText.textContent = post.description
    descripImage.setAttribute('src', post.descripimg)

    description.appendChild(descripText);
    description.appendChild(descripImage);

    postTitle.appendChild(titleUsername);
    postTitle.appendChild(userProduct);
    locationPrice.appendChild(location);
    locationPrice.appendChild(price);

    postHead.appendChild(userImage);
    postHead.appendChild(postTitle);
    postHead.appendChild(mapBTN);
    postHead.appendChild(locationPrice);

    mainPost.appendChild(postHead);
    mainPost.appendChild(description);

    postArea.appendChild(mainPost);

    mainPost.addEventListener('click', showPost);
    mapBTN.addEventListener('click', showMap);

};

    




