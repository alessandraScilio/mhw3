// Cose da migliorare:
// Carosello in recent post section mobile



// Menu a tendina mobile:
function showCurtainMenu(event) {
  
   const navbar = document.getElementById('nav-container');
   navbar.style.background = "rgb(229,233,253,255)";
   navbar.style.boxShadow = "none"; 
   
   curtainMenu.src = "cross.svg"; 
   document.body.classList.add('no-scroll');
   
   const menuContainer = document.getElementById('mobile-menu-container');
   menuContainer.style.display = "flex";

   curtainMenu.removeEventListener('click', showCurtainMenu);
   curtainMenu.addEventListener('click', removeCurtainMenu);
}

function removeCurtainMenu(){
    
    const navbar = document.getElementById('nav-container');
    navbar.style.background = "rgba(148,171,249,255)";
    navbar.style.boxShadow = "block"; 

    curtainMenu.src = "curtain-menu-img.svg"; 
    document.body.classList.remove('no-scroll');

    const menuContainer = document.getElementById('mobile-menu-container');
    menuContainer.style.display = "none";

    curtainMenu.removeEventListener('click', removeCurtainMenu);
    curtainMenu.addEventListener('click', showCurtainMenu);
}


const curtainMenu = document.getElementById('curtain-menu-image');
curtainMenu.addEventListener('click', showCurtainMenu);


// Recent post section swipe
function swipeArticle() {

    if (window.innerWidth <= 768) { 
        console.log("Funzione eseguita su mobile!");
    }

    const articles = document.querySelectorAll(".t-r-grid-item");
    for (let i=0; i < articles.length; i++){
        const article = articles[i];  
        if (article.dataset.status === 'shown') {
            article.style.display = 'none';
        } else if (article.dataset.status === 'hidden') {
            article.style.display = 'block';  
        } 
    }
    nextButton.removeEventListener;
    nextButton.style.display = 'none';
    backButton.style.display = 'block'; 
    backButton.addEventListener('click', swipeBack);

}

function swipeBack() {    
    const articles = document.querySelectorAll(".t-r-grid-item");
    
    for (let i=0; i < articles.length; i++){

        const article = articles[i]; 

        if (article.dataset.status === 'hidden') {
            article.style.display = 'none';
        } else if (article.dataset.status === 'shown') {
            article.style.display = 'block';  
        }
    }
    
    backButton.removeEventListener;
    backButton.style.display = 'none';
    nextButton.style.display = 'block'; 
}


const backButton = document.querySelector('[data-order="first"]');
const nextButton = document.querySelector('[data-order="second"]');
nextButton.addEventListener('click', swipeArticle);

// Travel resourses show more

function showMoreFunction() {

    const resources = document.querySelectorAll("#travel-resourses-container .t-r-grid-container .t-r-grid-item");

    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i]; 
        if (resource.dataset.type === 'mobile-hidden') {
            resource.style.display = 'grid';
        }
    }
    
    showMoreButton.style.display = 'none';
    showLessButton.style.display = 'block';
}

function showLessFunction() {

    const resources = document.querySelectorAll("#travel-resourses-container .t-r-grid-container .t-r-grid-item");

    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i]; 
        if (resource.dataset.type === 'mobile-hidden') {
            resource.style.display = 'none';
        }
    }

    showLessButton.style.display = 'none';
    showMoreButton.style.display = 'block';
    showMoreButton.scrollIntoView({ behavior: "smooth", block: "start" }); // Da chiedere (?)

}

const showLessButton = document.getElementById('show-less');
const showMoreButton = document.getElementById('show-more');

showMoreButton.addEventListener('click', showMoreFunction);
showLessButton.addEventListener('click', showLessFunction);

// Recent post section : interactions
function likeFunction(event) {
    
    const liked = event.target;
    if (liked.src.includes("like.svg")) {
        liked.src = "filled-heart.svg"; 
    } else {
        liked.src = "like.svg"; // Torna all'originale
    }
}

const likeButtons = document.getElementsByClassName('like-image');
for (i=0; i < likeButtons.length ; i++){
    likeButtons[i].addEventListener('click', likeFunction);
}

// Subscription part : 
function thanksFunction(event) {
    
    event.preventDefault(); // Evita il comportamento predefinito del form 

    const parent = document.getElementById('subscription-box');
    const form = document.getElementById('subscription-form'); 

    if (form) {
        parent.removeChild(form);
    }

    if (!document.getElementById('thanks-message')) {
        const text = document.createElement('h1');
        text.textContent = "Thanks for subscribing!";
        text.id = "thanks-message";
        text.classList.add('follow-along');

        const paragraph = document.createElement('p');
        paragraph.textContent = "You will soon receive a verification email.";
        paragraph.classList.add('follow-along');
        parent.appendChild(text);
        parent.appendChild(paragraph);
    }
}

const subscriptionButton = document.querySelector('#subscription-form button');

if (subscriptionButton)   
    subscriptionButton.addEventListener('click', thanksFunction);


// Wheather section: weather api 

function onJson(json) {
    console.log('JSON ricevuto');
    
    const result = document.querySelector('#weather-result'); 
    if(result !== null)
        result.innerHTML = '';

    const meteo = document.createElement('div');
    meteo.classList.add('meteo');

    if (json.error) {
        const error = document.createElement('div');
        error.classList.add('meteo');
        error.textContent = 'City not found!';
        result.appendChild(error);
    } else {
    const img = document.createElement('img');
    img.src = 'http:' + json.current.condition.icon;
    
    const caption = document.createElement('span');
    caption.textContent = json.location.name + " , " + json.location.region + " , " + json.location.country + " : " + json.current.temp_c + "°C , " + json.current.condition.text;

    meteo.appendChild(img);
    meteo.appendChild(caption);
    result.appendChild(meteo);
    }
}


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function showWeather(event) {
    event.preventDefault();

    const city = document.querySelector('#city-input');
    const encodedCity = encodeURIComponent(city.value);

    console.log('Eseguo ricerca: ' + encodedCity);
    
    const key = 'secret';
    const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + encodedCity + '&aqi=no';

    console.log('URL: ' + url);

    fetch(url).then(onResponse).then(onJson);
}

// Event listener
const weatherButton = document.querySelector('#search-bar #submit');
weatherButton.addEventListener('click', showWeather);


// Amadeus : traval API

function onJson(json) {
    console.log('JSON ricevuto');
    const flightResult = document.querySelector('#flight-result'); 
    
    if(flightResult !== null)
        flightResult.innerHTML = '';

    if (!json.data) {
        const error = document.createElement('div');
        error.classList.add('flight');
        error.textContent = 'Flight not found!';
        flightResult.appendChild(error);
    } else {

        const flights = json.data;
        let number = flights.length;
        console.log('Numero di voli trovati: ' + number);

        if (number > 5) {
            number = 5;
        }


        if (number === 0) {
            const error = document.createElement('div');
            error.classList.add('flight');
            error.textContent = 'Sorry, we found nothing!';
            flightResult.appendChild(error);
        }


        for (let i = 0; i < number; i++) {

            const flightDiv = document.createElement('div');
            flightDiv.classList.add('flight');
            
            const flight = flights[i];
            
            const departure = flight.itineraries[0].segments[0].departure.iataCode;
            const departureTime = flight.itineraries[0].segments[0].departure.at;
            const dTime = departureTime.substring(11,16);

            const arrival = flight.itineraries[0].segments[0].arrival.iataCode;
            const arrivalTime = flight.itineraries[0].segments[0].arrival.at;
            const aTime = arrivalTime.substring(11,16);

            const flightNumber = flight.itineraries[0].segments[0].carrierCode + flight.itineraries[0].segments[0].number;

            const price = flight.price.total;

            const stopover = flight.itineraries[0].segments[0].numberOfStops;
            const stopoverText = stopover === 0 ? "Non-stop" : stopover + " stop(s)";


            // Result
            const index = i+1;

            const captionResult = document.createElement('div');
            captionResult.classList.add('flight-caption');
            captionResult.textContent = "Result: " + index ;
            flightDiv.appendChild(captionResult);

            // FROM 
            const captionFrom = document.createElement('div');
            captionFrom.classList.add('flight-caption');
            captionFrom.textContent = "From: " + departure + " at : " + dTime + 
                                       " To: " + arrival + " at : " + aTime;
            flightDiv.appendChild(captionFrom);

            // PRICE
            const captionPrice = document.createElement('div');
            captionPrice.classList.add('flight-caption');
            captionPrice.textContent = "Price: " + price + " €";
            flightDiv.appendChild(captionPrice); 

            // FLIGHT number
            const captionFlight = document.createElement('div');
            captionFlight.classList.add('flight-caption');
            captionFlight.textContent = " Stopovers: " + stopoverText;
            flightDiv.appendChild(captionFlight);

            // INTERA CAPTION
            flightResult.appendChild(flightDiv);

        }
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function flightSearch(event) {

    event.preventDefault();

    const departureCity = document.querySelector('#departure-input');
    const encodedDepartureCity = encodeURIComponent(departureCity.value);

    const destinationCity = document.querySelector('#destination-input');
    const encodedDestinationCity = encodeURIComponent(destinationCity.value);

    const flightDate = document.querySelector('#date-input');

    console.log('Eseguo ricerca: ' + encodedDepartureCity + ' - ' + encodedDestinationCity);
    
    fetch('https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=' 
    + encodedDepartureCity + '&destinationLocationCode=' + encodedDestinationCity 
    + '&departureDate=' + flightDate.value + '&adults=1',
    {
        headers:
        {
            'Authorization': 'Bearer ' +  token
        }
    }
).then(onResponse).then(onJson)
}


// Richiesta del token
function onTokenJson(json)
{
  token = json.access_token;
  console.log('Token ricevuto:', token);
}


function onTokenResponse(response){
    return response.json();
}

const clientKey = 'clientId';
const clientSecret = 'clientSecret';
let token;

fetch('https://test.api.amadeus.com/v1/security/oauth2/token',
    {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientKey + ':' + clientSecret)
        }
    }
    )
    .then(onResponse)
    .then(onTokenJson)

const travelButton = document.querySelector('#flight-search-bar #submit');
travelButton.addEventListener('click', flightSearch);