
let url = 'http://localhost:3000/posts'
let mapURL = 'http://localhost:3000/map'
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

let getGeocode = (object) => {
    console.log(JSON.stringify(object));
    return fetch(mapURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
    .then(response => {
        return response.json()
    })
    .then(response => {
        console.log(response);
        initMap(response)
    })
}

let initMap = (markers) => {
    let mapOptions = {zoom: 10,
                        center: markers[0].geometry.location}
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    markers.forEach(function(pin) {
        let marker = new google.maps.Marker({
            position: pin.geometry.location,
            map: map
        })
        marker.setMap(map);
    })
    console.log(map);
}

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


