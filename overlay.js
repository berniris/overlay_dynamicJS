const body = document.querySelector('body');
const cartQuantityData = $('.minicart-quantity').html();
const subtotalData = $('.order-subtotal').text();
const cartImages = document.querySelectorAll('div.mini-cart-image > a > img');
const exitButton = document.createElement('button');
exitButton.innerHTML = 'Exit';
const cartButton = document.createElement('button');
cartButton.innerHTML = 'View Cart';
let overlay = null;

const background = document.createElement('div');
background.id = 'background';

const bgCss = 'position: fixed; z-index: 2; width: 100%; color: #000000; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center;';
const buttonCss = 'border: 2px solid #000000; margin: 10px; width: 100px; height: 50px; letter-spacing: 2px; text-transform: uppercase';


// figure out how to calculate last 10% of page
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
    const textData = document.createElement('div');
    const totalItems = document.createElement('p');
    totalItems.innerHTML = `${'Item total: ' + ' '}${cartQuantityData}`;
    const subtotal = document.createElement('p');
    subtotal.innerHTML = `${'Order' + ' '}${subtotalData}`;
    const cartAnchor = document.createElement('a');
    cartAnchor.setAttribute('href', '/cart');
    textData.setAttribute('style', 'display: flex; flex-direction: column; justify-content: space-between');
    overlay.setAttribute('style', 'width: 50%; margin: 0 auto; padding-top: 10px; font: 15px/1 ars_maquette_proregular,sans-serif; font-weight: 700; background-color: #ffffff; border: 2px solid #000000; display: flex; justify-content: center; align-items: center');
    textData.appendChild(totalItems);
    textData.appendChild(subtotal);
    overlay.appendChild(textData);
    overlay.append(cartImages[0]);
    overlay.append(cartImages[1]);
    cartButton.setAttribute('style', buttonCss);
    exitButton.setAttribute('style', buttonCss);
    exitButton.onclick = closeOverlay;
    cartAnchor.appendChild(cartButton);
    overlay.append(cartAnchor);
    overlay.append(exitButton);
    return overlay;
}

function setTransparentBackground() {
    const overlayDiv = createOverlayItems();
    background.setAttribute('style', bgCss);
    background.appendChild(overlayDiv);
    body.appendChild(background);
}