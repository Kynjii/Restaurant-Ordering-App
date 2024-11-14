import menuArray from './data.js'
const orderList = []

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
})

function handleAddClick(itemId){
    const itemToAdd = menuArray.find(function(item){
        return item.id === Number(itemId)
    })

    if(itemToAdd) {
        orderList.push(itemToAdd)
        console.log(orderList)
        renderOrderList()
    }
    console.log(orderList)
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
    const orderContainer = document.getElementById('order-list')
    let orderHtml = ``

    orderList.forEach(function(orderItem) {
        orderHtml += `
                <div>
                    ${orderItem.name} <span id=”remove-btn”>remove<span> ${orderItem.price}
                </div>`
    })

    orderContainer.innerHTML = orderHtml
}


function render(){
    document.getElementById('item-list-container').innerHTML = getFeedHtml()
}

render()