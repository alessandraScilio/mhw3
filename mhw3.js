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






