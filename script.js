const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count =30;
const apiKey = '9IhvZxZXGwt7-kz0L1MsidUOAFnId_7hofcYpb3no58';

const apiUrl =`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready =true;
        loader.hidden = true;
    }
}

//Create Elements for LInks and photos, add to DOM.
function displayPhotos() {
    imagesLoaded =0;
    totalImages = photosArray.length;
    console.log('total images ', totalImages);
    photosArray.forEach((photo) => {
        //create elements
        const a = document.createElement('a');
        a.setAttribute('href', photo.links.html);
        a.setAttribute('target','blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        //Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded);
        
        // put <img> inside <a>, then both inside <div.imageContainer >
        a.appendChild(img);
        imageContainer.appendChild(a);
    });
}


// Get photos from unsplash API
async function getphotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);

    }catch (err){
        console.log(err);
    }
}

//check to see if scrolling near bottom of page to load more photos for infinity scroll

window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getphotos();
       
    }

});

//on load
getphotos();