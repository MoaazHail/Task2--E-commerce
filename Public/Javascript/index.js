let content = document.getElementById('content');
let search = document.getElementById('search');
let close_icon = document.getElementById('close');
let category = document.querySelector('.Category');
let btn = document.querySelector('.btn');
let min_txt = document.querySelector('.min-price-input');
let max_txt = document.querySelector('.max-price-input');
let cart_icon = document.querySelector('#cart-icon');
let cart_list = [];
let cart_page = document.querySelector('#layout');

document.getElementById('search-icon').onclick = ()=>{
    document.getElementById('active').style.display="flex";
    
};
document.getElementById('close').onclick = () =>{ 
    document.getElementById('active').style.display="none";
};

document.querySelector('.btn-filter').onclick =()=>{
    document.querySelector('.filter-action').style.display="flex";
    document.querySelector('.btn-filter').style.display="none";
};
document.querySelector('.filter-action .close').onclick =()=>{
    document.querySelector('.filter-action').style.display="none";
    document.querySelector('.btn-filter').style.display="block";
};

document.querySelector('.cart-page .close').onclick = () =>{ 
    document.querySelector('.cart-page').style.display="none";
};
document.querySelector('#cart-icon').onclick = () =>{ 
    document.querySelector('.cart-page').style.display="flex";
};

async function fetchData() {
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            console.error('Network response was not ok');
        }
        const data = await response.json();
        
        return data;
    } 
    catch (err) {
        console.error('Error:', err);
    }
};


async function displayData(){
    try{
        let products = await fetchData();
        content.innerHTML ="";
        products.forEach((product)=>{
            content.innerHTML += 
        `
        <div class="card" id="card">
            <img src="${product.image}"/>
            <span class="category">${product.category}</span>
            <h1 class="product-name">${product.title}</h1>
            <p class="price">${product.price}$</p>
            <span class="btn" id="add-cart" onClick='addToCart(${product.id})'>add to card</span>
        </div>
        `;
        })
    
        if(content.innerHTML == ""){
            content.innerHTML +="<p>not found</p>" 
        }
    }
    catch(err){
        console.error('Error:', err);
    }
};


function displayCart(cart_list){
    cart_page.style.display="flex"
    cart_page.innerHTML="";
    cart_list.forEach((product)=>{
        cart_page.innerHTML +=
        `
        <div class="card">
            <img src="${product.image}"/>
            <h1 class="product-name">${product.title}</h1>
            <p class="price">${product.price}$</p>
            <div class="count-product">
                <button class="inc">+</button>
                <input type='text' class="counter"/>
                <button class="dec">-</button>
            </div>
        </div>
        `
    })
    return 
}

async function addToCart(id){
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        console.error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    cart_list.push(data);
    displayCart(cart_list);
    
}


async function searchFilter(){
    const products = await fetchData();
    console.log(products);
    
    const input = search.value;
    const search_data = input.toLowerCase();
    const filter_data = products.filter((item)=>{
        return(item.title.toLocaleLowerCase().includes(search_data))
    })
    UpdateData(filter_data);
};
async function categoryFilter(){
    const products = await fetchData();
    let my_category = category.value;
    const filter_data = products.filter((item)=>{
        return (item.category.includes(my_category))
    })
    UpdateData(filter_data);
};

async function minAndMaxFilter() {
    const products = await fetchData();
    const minPrice = parseFloat(min_txt.value) || 0;
    const maxPrice = parseFloat(max_txt.value) || Infinity;
    const filter_data = products.filter(item => item.price >= minPrice && item.price <= maxPrice);
    UpdateData(filter_data);
}

function UpdateData(products){
    content.innerHTML ="";
    products.forEach((product)=>{
        content.innerHTML += 
    `
    <div class="card" id="card">
        <img src="${product.image}"/>
        <span class="category">${product.category}</span>
        <h1 class="product-name">${product.title}</h1>
        <p class="price">${product.price}$</p>
        <span class="btn" id="add-cart">add to card</span>
    </div>
    `;
    })
}

search.addEventListener('input',()=> searchFilter());
btn.addEventListener('click', ()=> minAndMaxFilter());
category.addEventListener('change',()=> categoryFilter());   
displayData();