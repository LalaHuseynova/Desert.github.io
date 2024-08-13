let deserts = document.getElementById('deserts')
let cart = document.getElementById('cart')
let arr = []
function creatingCart() {
    let cartkod = ''
    if (arr.length == 0) {
        cartkod = `
        <div class="card emptycart" style="width: 18rem;">
            <div class="card-body">
    <p class="mycart">Your Cart (0)</p>
</div>
<img src="images/illustration-empty-cart.svg" class="card-img-top" alt="...">
<p style="color:grey; text-align:center">Your added items will appear here</p>
</div>`}
    else {
        for (let i = 0; i < arr.length; i++) {
            cartkod = `
          <div class="card emptycart" style="width: 18rem;">
            <div class="card-body">
            <p class="mycart">Your Cart (${arr.length})</p>
            </div>
            <ul id="lists">
                </ul>
<h4><span>Order Total:</span> <span>$ ${findingTotalPrice()}</span> </h4>
<div class="botton">
<img src="images/icon-carbon-neutral.svg"><p>This is a <b>carbon-neutral</b> delivery</p>
</div>
<button class="orderbtn" onclick="confirmOrder()">Confirm Order</button>
</div>
        `
        }
    }

    cart.innerHTML = cartkod
    if (arr.length > 0) {
        showingOrder()
    }
}

let cartcontainer=document.getElementById('cartcontainer2')
let mycontainer=document.getElementById('c')
function confirmOrder(){
    let kod=''
    let listorders=document.getElementById('listorders')
    
    for (let i = 0; i < arr.length; i++) {
        kod += `
        <tr>
        <td><img src="${arr[i].image}"></td>
        <td><b> <p class="productname textqara">${arr[i].adi}</p></b>
                        <span style="color:hsl(14 86% 42%)">${arr[i].sayi}x</span> <span style="color:grey"> @$${arr[i].qiymeti} </span>
        </td>
        <td> <b>$${arr[i].totalQiymet}</b></td>
        </tr>   `
    }
    listorders.innerHTML=kod
    cartcontainer.style.display="flex"
    mycontainer.style.opacity=.5

}
function reseting(){
    arr.splice(0,arr.length)
    creatingCart()
    creatingDesert()
    cartcontainer.style.display="none"
    mycontainer.style.opacity=1
}
function showingOrder() {
    let template = ''
    let lists = document.getElementById('lists')

    for (let i = 0; i < arr.length; i++) {
        template += `<li>
                <p class="productname textqara">${arr[i].adi}</p>
                <span style="color:hsl(14 86% 42%)">${arr[i].sayi}x</span> <span style="color:grey"> @$${arr[i].qiymeti}  <b>$${arr[i].totalQiymet}</b></span>
                <button class="dlt" onclick="deletefromCart(${i})"><img src="images/icon-remove-item.svg"></button>
                <hr>
                </li>`
    }
    lists.innerHTML = template
}
function deletefromCart(i) {
    let productName = arr[i].adi;
    arr.splice(i, 1);

    creatingCart();
    let productIndex = products.findIndex(product => product.name === productName);

    let img = document.getElementById(`img${productIndex}`);
    img.style.border = `none`;

    let plusminus = document.getElementById(`plus${productIndex}`);
    plusminus.style.display = "none";
    let input = document.getElementById(`input${productIndex}`)
    input.value=1
}


function findingTotalPrice() {
    let totalprice = 0
    for (let i = 0; i < arr.length; i++) {
        totalprice += arr[i].totalQiymet
    }
    return totalprice
}
function creatingDesert() {
    let kod = ''
    for (let i = 0; i < products.length; i++) {
        kod += `
<div class="card"  style="width: 18rem;">
    <div class="intro">
<img id="img${i}" src="${products[i].image.orginal}" class="card-img-top" alt="...">
<button class="btn" onclick="clickingAdd(${i})"><img src="images/icon-add-to-cart.svg"> Add To Cart</button>
<div class="plusminus" id="plus${i}">
<button onclick="deyisim(${i},this,-1)"><img src="images/icon-decrement-quantity.svg"></button> <input type="text" id="input${i}" value='1' /><button onclick="deyisim(${i},this,1)"><img src="images/icon-increment-quantity.svg"></button>
</div>
</div>
<div class="card-body" style="margin-top: 25px!important;">
    <h6 class="card-title">${products[i].category}</h6>
    <h5>${products[i].name}</h5>
    <p><b>${products[i].price}$</b></p>
    </div>
</div>
`
    }
    deserts.innerHTML = kod
}
function deyisim(i, element, deyisme) {
    let input = document.getElementById(`input${i}`)
    let plusminus = document.getElementById(`plus${i}`);
    let img = document.getElementById(`img${i}`)
    let eded = Number(input.value)
    eded += deyisme
    if (eded == 0) {
        plusminus.style.display = "none"
        img.style.border = `none`
        deleting(i)
    }
    else {
        input.value = eded
        fillArray(i)
    }
}
function deleting(i) {
    let itemIndex = arr.findIndex(item => item.adi === products[i].name)

    if (itemIndex !== -1) {
        arr.splice(itemIndex, 1)
        creatingCart()
    }
}
function fillArray(i) {
    let input = document.getElementById(`input${i}`).value;
    let total = input * products[i].price;

    let existingItem = arr.find(item => item.adi === products[i].name);

    if (existingItem) {
        existingItem.qiymeti = products[i].price;
        existingItem.totalQiymet = input * products[i].price;
        existingItem.sayi = input
    } else {
        arr.push({ adi: products[i].name, qiymeti: products[i].price, totalQiymet: total, sayi: input, image: products[i].image.thumbnail})
    }
    creatingCart()
}

function clickingAdd(i) {
    let img = document.getElementById(`img${i}`)
    img.style.border = ` 4px solid hsl(14 86% 42%)`
    let plusminus = document.getElementById(`plus${i}`);
    plusminus.style.display = "flex"
    fillArray(i)
}

creatingDesert()

creatingCart()


