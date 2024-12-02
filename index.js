import menuArray from './data.js'
const orderListContainer = document.getElementById('order-list-container')
const successEl = document.getElementById('success')
const ratingEl = document.getElementById('rating')
const form = document.getElementById('payment-form')
const modal = document.getElementById("modal")
const btn = document.getElementById("completebtn")
const span = document.getElementsByClassName("close")[0]
const orderList = []

// ADD / REMOVE CLICK FUNC //

document.addEventListener('click', function(e){
    // If the user clicks on add, the item is added to the Order List
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        orderListContainer.style.display = "block"
        ratingEl.style.display = "none"

        // If the success message is present, hides it   
        if (successEl){
            successEl.style.display = "none"
        }
    } 

    // Allows the user to click on the item to add it instead of the "+" icon
    if(e.target.dataset.item){
        handleAddClick(e.target.dataset.item)
        orderListContainer.style.display = "block"
        ratingEl.style.display = "none"

        // If the success message is present, hides it   
        if (successEl){
             successEl.style.display = "none"
        }
    }

    
    // If the user clicks on remove, the item is removed from the Order List
    if(e.target.dataset.remove){
        const itemIndex = Number(e.target.dataset.remove)
        if (itemIndex > -1) {
            orderList.splice(itemIndex, 1)
            renderOrderList()
            calculateTotalPrice(orderList)

        // Hides the Order List if no items are left after clicking remove
        if (orderList.length === 0) {
            orderListContainer.style.display = "none"
        } 

    }
    }
})


// Handles the pushing of Items to the Order list
function handleAddClick(itemId){
    const itemToAdd = menuArray.find(function(item){
        return item.id === Number(itemId)
    })

    if(itemToAdd) {
        orderList.push(itemToAdd)
        renderOrderList()
        calculateTotalPrice(orderList)
    }
}

// Shows a message after clicking on a star rating
ratingEl.addEventListener('click', function(){
    ratingEl.style.display = "none"
    successEl.innerHTML = `
    <p>Rating submitted!</p>`
})

// MODAL FUNC
// When the user clicks on the button, open the modal
btn.onclick = function() {
    if(orderList)
  modal.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"
  }
}


// FORM FUNC
form.addEventListener('submit', function(e){
    e.preventDefault()
    orderList.splice(0, orderList.length)
    modal.style.display = "none"
    orderListContainer.style.display = "none"
    successEl.style.display = "block"
    ratingEl.style.display = "block"
})



// Handles rendering the Items on the feed
function getFeedHtml(){
    let feedHtml = ``

    menuArray.forEach(function(item){
        feedHtml+=`
        <div class="item-container" data-item="${item.id}">
            <img src="${item.image}">
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
            <i class="fa-sharp fa-solid fa-plus" data-add="${item.id}"></i> 
        </div>
        <hr class="solid">`
    })
    return feedHtml
}


// Handles rendering the Order List
function renderOrderList() {
    const orderContainer = document.getElementById("order-list")
    let orderHtml = ``
    orderList.forEach(function(orderItem, index) {
        orderHtml += `
                <div class="order-item">
                    <span class="item-name"><h2>${orderItem.name}</h2></span><span id="remove-btn" data-remove="${index}">remove</span><span id="order-item-price">$${orderItem.price}</span>
                </div>
                `
    })

    orderContainer.innerHTML = orderHtml

    const orderPriceContainer = document.getElementById('total-price-container')
    let totalPriceHtml = `
                <div class="total-price-container">
                    <span class=”text-totalprice”><h2>Total price:</h2><span><span class="number-totalprice">$${calculateTotalPrice(orderList)}</span>
                    <div id="discount">Meal Deal discount applied!</div>
                </div>
                `

    orderPriceContainer.innerHTML = totalPriceHtml
    
}


// Handles calculating the total price of the order
function calculateTotalPrice(orderList) {
    // Calculate the total price of the items in the order
    let totalPrice = orderList.reduce(function (total, currentValue) {
        return total + currentValue.price
    }, 0)

    // Check if all three items are present in the orderList for the meal deal discount
    const itemNames = orderList.map(item => item.name) // Extract item names
    const mealDeal = itemNames.includes('Pizza') && itemNames.includes('Hamburger') && itemNames.includes('Beer')

    // Apply discount if the meal deal condition is met
    if (mealDeal) {
        const discount = 10
        totalPrice -= discount
        const discountEl = document.getElementById('discount')
        discountEl.style.display = "block"
    }

    return totalPrice
}


// Renders the page
function render(){
    document.getElementById('item-list-container').innerHTML = getFeedHtml()
}

render()