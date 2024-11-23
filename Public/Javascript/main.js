let content = document.getElementById('content');
let search = document.getElementById('search');
let close_icon = document.getElementById('close');
let category = document.querySelector('.Category');
let btn = document.querySelector('.btn');
let min_txt = document.querySelector('.min-price-input');
let max_txt = document.querySelector('.max-price-input');


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

async function fetchData() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            console.error('Network response was not ok');
        }

        const data = await response.json();
        displayData(data);

        search.addEventListener('input',()=> searchFilter(data));
        btn.addEventListener('click', ()=> minAndMaxFilter(data));
        category.addEventListener('change',()=> categoryFilter(data));   
    } 
    catch (err) {
        console.error('Error:', err);
    }
}

function displayData(products){
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

    if(content.innerHTML == ""){
        content.innerHTML +="<p>not found</p>" 
    }
};

function searchFilter(products){
    const input = search.value;
    const search_data = input.toLowerCase();
    const filter_data = products.filter((item)=>{
        return(item.title.toLocaleLowerCase().includes(search_data))
    })
    displayData(filter_data);
};

function categoryFilter(products){
    let my_category = category.value;
    const filter_data = products.filter((item)=>{
        return (item.category.includes(my_category))
    })
    displayData(filter_data);
};

function minAndMaxFilter(products) {
    const minPrice = parseFloat(min_txt.value) || 0;
    const maxPrice = parseFloat(max_txt.value) || Infinity;
    const filter_data = products.filter(item => item.price >= minPrice && item.price <= maxPrice);
    displayData(filter_data);
}

let data = fetchData();

