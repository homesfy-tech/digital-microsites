const lightbox = document.querySelector('.gallery-lightbox');
const galleryBox = Array.from(document.querySelectorAll('.gallery-lightbox__box'));
const lightboxPopup = document.querySelector('.gallery-lightbox__popup');
const optionHeader = lightboxPopup.querySelector('.gallery-lightbox__popup--options');
const optionLinks = optionHeader.querySelectorAll('.option-link');
const fullscreenOption = optionHeader.querySelector('.fullscreen');
const downloadOption = optionHeader.querySelector('.download');
const closeOption = optionHeader.querySelector('.close');

const fullViewContainer = lightboxPopup.querySelector('.gallery-lightbox__popup--content');
const fullView = lightboxPopup.querySelector('.fullview');
const fullViewCaption = lightboxPopup.querySelector('p');

const leftArrow = lightboxPopup.querySelector('.arrow--left');
const rightArrow = lightboxPopup.querySelector('.arrow--right');

const zoomOutOption = optionHeader.querySelector('.zoom-out');
const zoomInOption = optionHeader.querySelector('.zoom-in');
var active = lightbox.querySelector('.gallery-lightbox__box.active');
var galleryDirection, index;
let zoomLevel = 1;
let zoomInc = 0.05;
// function to start lightbox

const startLightBox = () => {
    let active1 = lightbox.querySelector('.gallery-lightbox__box.active');
    const fullSize = active1?.dataset?.fullsize;
    const caption = active1?.dataset?.caption;
    let index = Number(active1?.dataset?.index);
    fullView.innerHTML = `
    <img src="${fullSize}" alt=""/>
    `;
    fullViewCaption.textContent = caption;

    downloadOption.href = fullSize;
    zoomInOption.setAttribute("data-zoom-level", zoomLevel);
    zoomOutOption.setAttribute("data-zoom-level", zoomLevel);
    fullViewContainer.style.width=""
    fullViewContainer.style.height=""
}
startLightBox()

//galleryBox
galleryBox.forEach((gallery) => {
    gallery.addEventListener("click", (e) => {
        e.preventDefault()

        if (!gallery.classList.contains("active")) {
            active.classList.remove("active");
        }
        gallery.classList.add("active");
        nextGallery = lightbox.querySelector("gallery-lightbox__box.active");
        active = lightbox.querySelector("gallery-lightbox__box.active");

        lightboxPopup.classList.add("active");
        zoomLevel = 1


        // start lightbox
        startLightBox()
    })
})

// gallery Arrow

const changeDirection = (direction) => {
    active = lightbox.querySelector(".gallery-lightbox__box.active")
    let idx = active?.dataset?.index
    direction === "right" ? idx++ : idx--
    if (direction === "right" && idx >= galleryBox.length) {
        idx = 0
    }
    if (direction === "left" && idx < 0) {
        idx = galleryBox.length - 1
    }

    galleryDirection = galleryBox[idx]
    active.classList.remove("active")
    galleryDirection.classList.add("active")
    zoomLevel = 1
    startLightBox()
}

rightArrow.addEventListener("click", () => changeDirection("right"))
leftArrow.addEventListener("click", () => changeDirection("left"))

// option link

optionLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
    })
})

// zooming effect 

zoomInOption.addEventListener("click", function () {
    zoomLevel += zoomInc
    if (zoomLevel >= 1.4) {
        zoomLevel = zoomLevel - 0.01
        this.classList.add("disabled")
        return;
    }
    this.setAttribute("data-zoom-level", zoomLevel)
    zoomOutOption.setAttribute("data-zoom-level", zoomLevel)
    zoomOutOption.classList.remove("disabled")
    fullView.style.transform = `scale(${zoomLevel})`
})

zoomOutOption.addEventListener("click", function () {
    zoomLevel -= zoomInc
    if (zoomLevel < 0.6) {
        zoomLevel = zoomLevel + 0.01
        this.classList.add("disabled")
        return;
    }
    this.setAttribute("data-zoom-level", zoomLevel)
    zoomInOption.setAttribute("data-zoom-level", zoomLevel)
    zoomInOption.classList.remove("disabled")
    fullView.style.transform = `scale(${zoomLevel})`
})

fullscreenOption.addEventListener("click",function(){
    const optionHeightHeader=optionHeader.clientHeight
    fullViewContainer.classList.toggle("fullscreen")
    if(fullViewContainer.classList.contains("fullscreen"))
    {
        fullViewContainer.style.width="100vw";
        fullViewContainer.style.height=`calc(100vh-${optionHeightHeader}px)`
        zoomLevel=1
        fullViewContainer.style.transform=`scale(${zoomLevel})`
    }
    else{
        fullViewContainer.style.width=""
        fullViewContainer.style.height=""
    }
})

closeOption.addEventListener("click",function(){
    lightboxPopup.classList.remove("active");
})