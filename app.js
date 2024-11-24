let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo');
let logoSpan = document.querySelectorAll('.logo-parts');

window.addEventListener('DOMContentLoaded' , () => {
    setTimeout(() => {
        logoSpan.forEach((span, index) => {
            setTimeout(() =>{
                span.classList.add('active');
            }, (index + 1) * 100);
        });
        setTimeout(()=> {
            logoSpan.forEach((span, index) => {
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add(fade);
                },(span + 1) * 50);
            });
        },2000);
        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    });
});

function updateProductQuantity(product, price, isIncreasing) {
    const inputElement = document.getElementById(product + '-number');
    let quantity = parseInt(inputElement.value);

    if (isIncreasing) {
        quantity++;
    } else if (quantity > 0) {
        quantity--;
    }

    inputElement.value = quantity;
    updateProductTotal(product, quantity, price);
    calculateTotal();
}

function getProductQuantity(product) {
    const inputElement = document.getElementById(product + '-number');
    return parseInt(inputElement.value);
}

function updateProductTotal(product, quantity, price) {
    const totalElement = document.getElementById(product + '-total');
    totalElement.innerText = quantity * price;
}
function calculateTotal() {
    let subTotal = 0;

    products.forEach(product => {
        const quantity = getProductQuantity(product.name);
        const total = quantity * product.price;
        subTotal += total;
    });

    document.getElementById('total-price').innerText = subTotal.toFixed(2); // Ajustar a 2 decimales
}

const products = [
    { name: 'phone', price: 1219 },
    { name: 'case', price: 59 },
    { name: 'paracetamol', price: 12 }
];

products.forEach(product => {
    document.getElementById(product.name + '-plus').addEventListener('click', function () {
        updateProductQuantity(product.name, product.price, true);
    });

    document.getElementById(product.name + '-minus').addEventListener('click', function () {
        updateProductQuantity(product.name, product.price, false);
    });
});

document.querySelector('.check-out').addEventListener('click', function() {
    // Cambiar el texto del botón
    this.innerText = "Pedido en camino";
    
    // Reiniciar las cantidades de los productos a 0
    products.forEach(product => {
        document.getElementById(product.name + '-number').value = 0;
        updateProductTotal(product.name, 0, product.price);
    });
    
    // Calcular el total nuevamente
    calculateTotal();
});
