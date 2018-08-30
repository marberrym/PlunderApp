
url = 'http://localhost:3000/posts'
let catBTNS = document.querySelectorAll('.sideBar');

let empty = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild)
    }
}

let getReq = (url) => fetch(url)
    .then(response => {
        if(response.status < 400) {
            response.json()
                .then(results=> {
                    console.log(results)
                    results.forEach(function (post) {
                        postSection(post)
                    })
                })
        } else{
            console.log("failed to load");
            throw new Error('did not retrieve info...')
        }
    })
    .then(response => {
        console.debug(response);
    }).catch(error => {
        console.error(error);
    })

getReq(url);


catBTNS.forEach(function(cat) {
    let reqURL = 'http://localhost:3000/posts/cat/'+ cat.textContent;
    let catReq = () => {
        if (cat.textContent !== 'All'){
            empty(postArea);
            getReq(reqURL);
        } else {
            empty(postArea);
            getReq(url);
        }
    }
    cat.addEventListener('click', catReq)
});

let getMap = (city, state) => {
    fetch('https://maps.googleapis.com/maps/api/staticmap?center=' + city + ',' + state + '&zoom=14&size=400x400&key=' + apiKey)
        .then(response => {
            return response
        })       
}