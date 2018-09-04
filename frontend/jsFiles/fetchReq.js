
let url = 'http://localhost:3000/posts'
let mapURL = 'http://localhost:3000/map'
let catBTNS = document.querySelectorAll('.sideBar');
let filterBTN = document.querySelector('#filter');
let state = document.querySelector('#stateFilter');


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
                    console.log(results);
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

let states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT",
                "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
                "KS", "KY", "LA", "ME", "MD", "MA", "MI",
                "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
                "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
                "WA", "WV", "WI", "WY"];

let filterByState = (event) => {
    event.preventDefault();
    let stateSelection = state.value
    
    console.log(stateSelection);
    if (stateSelection.length > 2) {
        flashMSG("Two letter format please");
    } else if (stateSelection === "") {
        getReq(url);
    } else if (states.includes(stateSelection)) {
        console.log("True");
        empty(postArea);
        getReq(url + '/state/' + stateSelection.toUpperCase());
    } else {
        flashMSG("Invalid Input");
    }
}

filterBTN.addEventListener('click', filterByState);





