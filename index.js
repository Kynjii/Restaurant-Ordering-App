import menuArray from './data.js'
const orderList = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        const itemIndex = Number(e.target.dataset.remove)
        if (itemIndex > -1) {
            orderList.splice(itemIndex, 1)
            renderOrderList()
            calculateTotalPrice(orderList)
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
const modal = document.getElementById("modal");

// Get the button that opens the modal
const btn = document.getElementById("completebtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






  

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
                </div>
                `

    orderPriceContainer.innerHTML = totalPriceHtml
    
}

function calculateTotalPrice(orderList){
    const totalPrice = orderList.reduce(function(total, currentValue){
        return total + currentValue.price
    }, 0)
    return totalPrice
}

console.log(calculateTotalPrice(orderList))


function render(){
    document.getElementById('item-list-container').innerHTML = getFeedHtml()
}

render()