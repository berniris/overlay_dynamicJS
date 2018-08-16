var body = document.querySelector('body');
var linebreak = document.createElement("br");
var cartQuantityData = $('.minicart-quantity').html();
var subtotalData = $('.order-subtotal').text();
var cartImages = document.querySelectorAll("div.mini-cart-image > a > img");
var exitButton = document.createElement('button');
exitButton.innerHTML = "Exit";
var cartButton = document.createElement('button');
cartButton.innerHTML = "View Cart";
var overlay = null;

var background = document.createElement('div');

var bgCss = "position: fixed; z-index: 2; width: 100%; color: white; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7); font-size: 25px;"
var buttonCss = "border: 4px solid #ffffff;"
    // var overlayCss = "position: relative; width: 30%; height: 30%; top: 0; left: 0; right: 0; bottom: 0; font-size: 50px;"


// figure out how to calculate last 10% of page
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        createOverlayItems();
        cartOverlay();
    }
});

function createOverlayItems() {
    var exists = document.getElementById('cart-preview');
    var totalItems = document.createElement('p');
    totalItems.innerHTML = "Total items: " + " " + cartQuantityData;
    var subtotal = document.createElement('p');
    subtotal.innerHTML = "Order" + " " + subtotalData;
    if (exists) {
        exists.parentNode.removeChild(exists);
    }
    var overlay = document.createElement('div');
    overlay.id = "cart-preview";
    overlay.appendChild(totalItems);
    overlay.appendChild(subtotal);
    overlay.append(cartImages[0]);
    overlay.append(cartImages[1]);
    cartButton.setAttribute('style', buttonCss);
    exitButton.setAttribute('style', buttonCss);
    overlay.append(cartButton);
    overlay.appendChild(linebreak);
    overlay.append(exitButton);
    return overlay;
}

function cartOverlay() {
    var overlay = createOverlayItems();
    background.setAttribute('style', bgCss);
    background.appendChild(overlay);
    body.appendChild(background);
}
