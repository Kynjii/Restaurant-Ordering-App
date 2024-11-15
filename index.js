import menuArray from './data.js'
const orderListContainer = document.getElementById('order-list-container')
const successEl = document.getElementById('success')
const form = document.getElementById('payment-form')
const orderList = []

document.addEventListener('click', function(e){
    // if the user clicks on add, the item is added to the Order List
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        orderListContainer.style.display = "block"

        // if the success message is present, hides it   
        if (successEl){
            successEl.style.display = "none"
        }
    }     
    
    // if the user clicks on remove, the item is removed from the Order List
    if(e.target.dataset.remove){
        const itemIndex = Number(e.target.dataset.remove)
        if (itemIndex > -1) {
            orderList.splice(itemIndex, 1)
            renderOrderList()
            calculateTotalPrice(orderList)

        // hides the Order List if no items are left after clicking remove
        if (orderList.length === 0) {
            orderListContainer.style.display = "none"
        } 

    }
}
})

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



// Get the modal
const modal = document.getElementById("modal")

// Get the button that opens the modal
const btn = document.getElementById("completebtn")

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0]

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


form.addEventListener('submit', function(e){
    e.preventDefault()
    orderList.splice(0, orderList.length)
    modal.style.display = "none"
    orderListContainer.style.display = "none"
    successEl.style.display = "block"
})




function getFeedHtml(){
    let feedHtml = ``

    menuArray.forEach(function(item){
        feedHtml+=`
        <div class="item-container">
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


function renderOrderList() {
    const orderContainer = document.getElementById("order-list")
    let orderHtml = ``
    orderList.forEach(function(orderItem, index) {
        orderHtml += `
                <div>
                    ${orderItem.name} <span id="remove-btn" data-remove="${index}">remove<span> ${orderItem.price}
                </div>
                `
    })

    orderContainer.innerHTML = orderHtml

    const orderPriceContainer = document.getElementById('total-price-container')
    let totalPriceHtml = `
                <div>
                    <span class=”text-totalprice”>Total price:</span><span class="number-totalprice">$${calculateTotalPrice(orderList)}</span>
                    <div id="discount"><p>Meal Deal discount applied!</p></div>
                </div>
                `

    orderPriceContainer.innerHTML = totalPriceHtml
    
}

function calculateTotalPrice(orderList) {
    // Calculate the total price of the items in the order
    let totalPrice = orderList.reduce(function (total, currentValue) {
        return total + currentValue.price
    }, 0)

    // Check if all three items are present in the orderList
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





function render(){
    document.getElementById('item-list-container').innerHTML = getFeedHtml()
}

render()