/* Category Section */ 

/* Shopping Cart */
if (document.redayState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeItemButtons = document.getElementsByClassName('btn-remove-item')
  for (var i = 0; i < removeItemButtons.length; i++) {
    var button = removeItemButtons[i]
    button.addEventListener('click', removeItem)
}

  
  var addInputButtons = document.getElementsByClassName('fa-plus-circle')
	  for (var i = 0; i < addInputButtons.length; i++) {
      var button = addInputButtons[i]
      button.addEventListener('click', addToItemInputClicked)
    }

	var addToCartIcons = document.getElementsByClassName('shopping')
    for (var i = 0; i < addToCartIcons.length; i++) {
        var button = addToCartIcons[i]
        button.addEventListener('click', addToCartClicked)
      }

	var subtractInputButtons = document.getElementsByClassName('fa-minus-circle')
	  for (var i = 0; i < subtractInputButtons.length; i++) {
      var button = subtractInputButtons[i]
      button.addEventListener('click', removeItemInputClicked)
    }

	    var addToCartButtons = document.getElementsByClassName('add-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
      }

      document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you! Your order will be done shortly!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateItemTotal()
}


function removeItem() {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateItemTotal()
}


function addToItemInputClicked(event) {
	var button = event.target
	var cartColumn = button.parentElement
	var affectedInput = cartColumn.getElementsByClassName('input-item')[0]
	affectedInput.value = parseInt(affectedInput.value) + 1;
	if (affectedInput.value >= 100) {
		affectedInput.style.width = "90px";
	} 
	updateItemTotal()
}

function removeItemInputClicked(event) {
	var button = event.target
	var cartColumn = button.parentElement
	var affectedInput = cartColumn.getElementsByClassName('input-item')[0]
	affectedInput.value = parseInt(affectedInput.value) - 1;
	if (affectedInput.value <= 0) {
		removeItem()
	}
	updateItemTotal()
}

/*  

function removeInputChanged(event) {
	if (isNAN(affectedInput.value) || affectedInput.value <= 0) {
		affectedInput.parentElement.parentElement.parentElement.remove()
		removeItem()
	}
	updateItemTotal()
}
*/

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
  	input.value = 1 
  }
  updateItemTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var imageSrc = shopItem.getElementsByClassName('product-img')[0].src
  var title = shopItem.getElementsByClassName('item-title')[0].innerText
  var price = shopItem.getElementsByClassName('item-price')[0].innerText
  addItemToCart(imageSrc, title, price)
  updateItemTotal()
}

function addItemToCart(imageSrc, title, price) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
}

  var cartRowContents = `
    <div class="cart-item cart-column">
		<img class="product-img" src="${imageSrc}" width="150" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-item-price cart-column">${price}</span>
    <div class="cart-quantity cart-item-quantity cart-column">
		<button class="fas fa-minus-circle"></button>
      <input class="input-item item-quantity-input" type="number" value="1">
		<button class="fas fa-plus-circle"></button>
      <button class="btn btn-remove-item" type="button">REMOVE</button>
    </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-remove-item')[0].addEventListener('click', removeItem)
cartRow.getElementsByClassName('fa-plus-circle')[0].addEventListener('click', addToItemInputClicked) 
  cartRow.getElementsByClassName('item-quantity-input')[0].addEventListener('change', quantityChanged)
	cartRow.getElementsByClassName('fa-minus-circle')[0].addEventListener('click', removeItemInputClicked) 


}
  
function updateItemTotal() {
  var CartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = CartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
    var cartQuantity = cartRow.getElementsByClassName('item-quantity-input')[0]
    var price = parseFloat(cartPrice.innerText.replace('$', ''))
    var quantity = cartQuantity.value
    total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('item-total')[0].innerText = '$' + total
}
