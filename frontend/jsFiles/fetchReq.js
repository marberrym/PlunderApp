
let url = 'http://localhost:3000/posts'
let mapURL = 'http://localhost:3000/map'
let catBTNS = document.querySelectorAll('.sideBar');
let locationBTN = document.querySelector('.locationFilter')
let stateEntry = document.querySelector('#searchstate');

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
                    results.forEach(function (post) {
                        postSection(post)
                    })
                })
        } else{
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
        initMap(response)
    })
}

let initMap = (markers) => {
    let mapOptions = {zoom: 10,
                        center: markers[0].geometry.location}
    let map = new google.maps.Map(document.getElementById('map'), mapOptions);
    markers.forEach(function(pin) {
        let contentString = '<div><b>' + pin.name +'</b></div><div>' + pin.vicinity + '</div>'
        let marker = new google.maps.Marker({
            position: pin.geometry.location,
            id: pin.id,
            name: pin.name,
            map: map
        });
        let infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
        marker.setMap(map);
    })
}

catBTNS.forEach(function(cat) {
    let reqURL = '/cat/'+ cat.textContent;
    let catReq = () => {
        if (cat.textContent !== 'All'){
            empty(postArea);
            getReq(url + reqURL);
        } else {
            empty(postArea);
            getReq(url);
        }
    }
    cat.addEventListener('click', catReq)
});

// let getLocation = (event) => {
//     event.preventDefault();
//     let getLocationObj = {state:''};
//     let searchState = document.querySelector('#searchstate')
//     getLocationObj['searchstate'] = searchState.value

//     fetch('http://localhost:3000/posts/location/', {
//         method: 'GET',
//         body: JSON.stringify(getLocationObj),
//         headers: {'Content-Type': 'application/json'}
//     })
//     .then((result) => {
//         return result.json()
// }

let getLocation = () => {
    console.log("hey state value is :" + stateEntry.value);
    let reqURL = 'http://localhost:3000/posts/location/'+ stateEntry.value;
    if (states.textContent !== 'All' ){
        empty(postArea);
        getReq(booty);
    } else {
        empty(postArea);
        getReq(url);
    }   
    
};

locationBTN.addEventListener('submit', getLocation)





    


