var shoppingCart = (function() {

    cart = [];
    
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    function savecart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadcart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadcart();
    }
    
    var obj = {};

    obj.additemtocart = function(name, price, count) {
        for(var item in cart) {
            if(cart[item].name === name) {
            cart[item].count ++;
            savecart();
            return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        savecart();
    }

    obj.setcountforitem = function(name, count) {
        for(var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };

    obj.removeitemfromcart = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count --;
                if(cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
      }
      savecart();
    }
  
    obj.removeitemfromcartall = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        savecart();
    }
  
    obj.clearcart = function() {
        cart = [];
        savecart();
    }
  
    obj.totalcart = function() {
        var totalcart = 0;
        for(var item in cart) {
            totalcart += cart[item].price * cart[item].count;
        }
        return Number(totalcart.toFixed(2));
    }
  
    obj.listcart = function() {
        var cartCopy = [];
        for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
  
    return obj;
})();
  
var clearcart = document.querySelector('.clear-cart');
var showcart = document.querySelector('.show-cart');
var totalcart = document.querySelector('.total-cart');

document.querySelectorAll('.add-to-cart').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault();
        var name = this.getAttribute('data-name');
        var price = Number(this.getAttribute('data-price'));
        shoppingCart.additemtocart(name, price, 1);
        displaycart();
    });
});

if(clearcart){
    clearcart.addEventListener('click', function() {
        shoppingCart.clearcart();
        displaycart();
    });
}

function displaycart() {
    var cartArray = shoppingCart.listcart();
    var output = "";
    cartArray.forEach(function(item) {
      output += "<tr>"
        + "<td>" + item.name + "</td>" 
        + "<td>(" + item.price + "KM)</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + item.name + "'>-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + item.name + "' value='" + item.count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name='" + item.name + "'>+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name='" + item.name + "'>X</button></td>"
        + "<td>" + item.total + "KM</td>" 
        +  "</tr>";
    });
    if(showcart){
        showcart.innerHTML = output;
    }
    if(totalcart){
        totalcart.innerHTML = shoppingCart.totalcart()
    }
}

if(showcart){
    showcart.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-item')) {
            var name = event.target.getAttribute('data-name');
            shoppingCart.removeitemfromcartall(name);
            displaycart();
        }
    });
    showcart.addEventListener('click', function(event) {
        if (event.target.classList.contains('minus-item')) {
            var name = event.target.getAttribute('data-name');
            shoppingCart.removeitemfromcart(name);
            displaycart();
        }
    });
    showcart.addEventListener('click', function(event) {
        if (event.target.classList.contains('plus-item')) {
            var name = event.target.getAttribute('data-name');
            shoppingCart.additemtocart(name);
            displaycart();
        }
    });
    showcart.addEventListener('change', function(event) {
        if (event.target.classList.contains('item-count')) {
          var name = event.target.getAttribute('data-name');
          var count = Number(event.target.value);
          shoppingCart.setcountforitem(name, count);
          displaycart();
        }
    });
}
  
displaycart();

var cartbutton = document.getElementById('cartbutton');
var modal = document.getElementById('cart');
var closeicon = document.getElementById('closemodal');

if(cartbutton){
    cartbutton.addEventListener('click', function () {
        modal.style.display = 'block';
    });
}

if(modal){
    closeicon.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}
 
const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);


const smBtnLeft = document.querySelector(".sm-btn-left");
const sideMenuLeft = document.querySelector(".sm-left");
const text = document.querySelector(".rotate");

if(smBtnLeft){
    smBtnLeft.addEventListener("click", () => {
        sideMenuLeft.classList.toggle("active");
        smBtnLeft.classList.toggle("active");
        if (text.textContent.trim() === "TIM") {
            text.textContent = "ZATVORI";
        } else {
            text.textContent = "TIM";
        }
    });
}


const smBtnRight = document.querySelector(".sm-btn-right");
const sideMenuRight = document.querySelector(".sm-right");
const text2 = document.querySelector(".rotate2");

if(smBtnRight){
    smBtnRight.addEventListener("click", () => {
        sideMenuRight.classList.toggle("active");
        smBtnRight.classList.toggle("active");
        if (text2.textContent.trim() === "PARTNERI") {
            text2.textContent = "ZATVORI";
        } else {
            text2.textContent = "PARTNERI";
        }
    });
}


