const body = document.querySelector('body');
let overlay = null;
const background = document.createElement('div');
background.id = 'background';

// overlay data variables from the cart
const cartQuantityData = $('.minicart-quantity').html();
const subtotalData = $('.order-value').text();
const cartImages = document.querySelectorAll('div.mini-cart-image > a > img');

// global css variables
const bgCss = 'position: fixed; z-index: 2; width: 100%; color: #000000; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;';
const buttonCss = 'border: 2px solid #000000; margin: 10px; width: 100px';

// detects if user has scrolled to bottom 10% of page
$(window).scroll(() => {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        createOverlayItems();
        setTransparentBackground();
    }
});

// create and style buttons to exit the overlay and visit the cart
function createButtonContainer() {
    const exitButton = document.createElement('button');
    const cartButton = document.createElement('button');
    const buttonAnchor = document.createElement('a');
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('style', 'display: flex; flex-direction: column;');
    exitButton.innerHTML = 'Exit';
    cartButton.innerHTML = 'View Cart';
    exitButton.setAttribute('style', buttonCss);
    cartButton.setAttribute('style', buttonCss);
    exitButton.classList.add('mixt-button');
    exitButton.classList.add('variant-4');
    cartButton.classList.add('mixt-button');
    cartButton.classList.add('variant-4');
    exitButton.onclick = closeOverlay;
    buttonAnchor.appendChild(cartButton);
    buttonAnchor.setAttribute('href', '/cart');
    buttonContainer.appendChild(exitButton);
    buttonContainer.appendChild(buttonAnchor);
    return buttonContainer;
}

// create container to hold cart details
function createTextContainer() {
    const subtotal = document.createElement('p');
    const textContainer = document.createElement('div');
    const totalItems = document.createElement('p');
    totalItems.innerHTML = `${'Total Items: ' + ' '}${cartQuantityData}`;
    subtotal.innerHTML = `${'Subtotal:' + ' '}${subtotalData}`;
    textContainer.appendChild(totalItems);
    textContainer.appendChild(subtotal);
    textContainer.setAttribute('style', 'display: flex; flex-direction: column; text-transform: uppercase; justify-content: center; height: 20%; width: 33%;');
    return textContainer;
}

// create container for cart images
function createImageContainer() {
    const imageContainer = document.createElement('div');
    if (cartImages.length != 0) {
        for (var i = 0; i < cartImages.length; i++) {
            imageContainer.append(cartImages[i])
        }
    }
    imageContainer.setAttribute('style', 'display: flex; justify-content: center;');
    return imageContainer;
}

// closes overlay on user click
function closeOverlay() {
    const query = $('#background');
    const isVisible = query.is(':visible');
    if (isVisible === true) {
        query.hide();
    }
}

// checks if overlay id is present before appending containers
function createOverlayItems() {
    const buttonDiv = createButtonContainer();
    const imageDiv = createImageContainer();
    const textDiv = createTextContainer();
    const exists = document.getElementById('cart-preview');
    if (exists) {
        exists.parentNode.removeChild(exists);
    }
    overlay = document.createElement('div');
    overlay.id = 'cart-preview';
    overlay.appendChild(textDiv);
    overlay.appendChild(imageDiv);
    overlay.appendChild(buttonDiv);
    overlay.setAttribute('style', 'min-width: 400px; max-width: 1500px; min-height: 300px; width: 70%; height: 50%; z-index: 5; padding: 10px; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; letter-spacing: -.02em; margin: 0 auto; font: 14px/1 ars_maquette_probold,sans-serif; background-color: #ffffff; border: 2px solid #CC0001; display: flex; justify-content: space-around; align-items: center');
    return overlay;
}

// create semi-transparent background behind overlay
function setTransparentBackground() {
    const overlayDiv = createOverlayItems();
    background.setAttribute('style', bgCss);
    background.appendChild(overlayDiv);
    body.appendChild(background);
}