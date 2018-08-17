const body = document.querySelector('body');

// data variables for overlay
const cartQuantityData = $('.minicart-quantity').html();
const subtotalData = $('.order-value').text();
const cartImages = document.querySelectorAll('div.mini-cart-image > a > img');

function createButton() {
    const exitButton = document.createElement('button');
    exitButton.innerHTML = 'Exit';
    const cartButton = document.createElement('button');
    cartButton.innerHTML = 'View Cart';
    let overlay = null;
}

const background = document.createElement('div');
background.id = 'background';

const bgCss = 'position: fixed; z-index: 2; width: 100%; color: #000000; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;';
const buttonCss = 'border: 2px solid #000000; margin: 10px; width: 100%; height: 100%;';


// calculate when user has reached the bottom 10% of the page
$(window).scroll(() => {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        createOverlayItems();
        setTransparentBackground();
    }
});

function closeOverlay() {
    const query = $('#background');
    const isVisible = query.is(':visible');

    if (isVisible === true) {
        query.hide();
    }
}

function createOverlayItems() {
    const exists = document.getElementById('cart-preview');
    if (exists) {
        exists.parentNode.removeChild(exists);
    }
    overlay = document.createElement('div');
    overlay.id = 'cart-preview';
    const textContainer = document.createElement('div');
    const totalItems = document.createElement('p');
    totalItems.innerHTML = `${'Total Items: ' + '    '}${cartQuantityData}`;
    const subtotal = document.createElement('p');
    subtotal.innerHTML = `${'Subtotal:' + '     '}${subtotalData}`;
    const buttonAnchor = document.createElement('a');
    buttonAnchor.setAttribute('href', '/cart');
    const buttonContainer = document.createElement('div');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('style', 'display: flex; justify-content: center;');
    buttonContainer.setAttribute('style', 'display: flex; flex-direction: column;');
    textContainer.setAttribute('style', 'display: flex; flex-direction: column; text-transform: uppercase; justify-content: space-between; height: 15%;');
    overlay.setAttribute('style', 'width: 70%; max-height: 600px; height: 60%; z-index: 5; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; letter-spacing: -.02em; margin: 0 auto; font: 14px/1 ars_maquette_probold,sans-serif; background-color: #ffffff; border: 2px solid #CC0001; display: flex; justify-content: space-around; align-items: center');
    textContainer.appendChild(totalItems);
    textContainer.appendChild(subtotal);
    buttonContainer.appendChild(exitButton);
    buttonContainer.appendChild(buttonAnchor);
    imageContainer.append(cartImages[0]);
    imageContainer.append(cartImages[1]);
    cartButton.setAttribute('style', buttonCss);
    cartButton.classList.add('mixt-button');
    cartButton.classList.add('variant-4');
    exitButton.classList.add('mixt-button');
    exitButton.classList.add('variant-4');
    exitButton.setAttribute('style', buttonCss);
    exitButton.onclick = closeOverlay;
    buttonAnchor.appendChild(cartButton);
    overlay.appendChild(textContainer);
    overlay.appendChild(imageContainer);
    overlay.appendChild(buttonContainer);
    return overlay;
}

function setTransparentBackground() {
    const overlayDiv = createOverlayItems();
    background.setAttribute('style', bgCss);
    background.appendChild(overlayDiv);
    body.appendChild(background);
}