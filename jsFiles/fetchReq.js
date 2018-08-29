
url = 'http://localhost:3000/posts'
let catBTNS = document.querySelectorAll('.sideBar');

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
        getReq(reqURL)
    }
    cat.addEventListener('click', catReq)
});