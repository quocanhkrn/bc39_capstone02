DOM = (id) => document.getElementById(id);

let displayProductList = (list) => {
  document.querySelector(".product-list").innerHTML = "";
  list.forEach((product) => {
    let price = parseInt(product.price);
    price = price.toLocaleString("en-US");
    document.querySelector(".product-list").innerHTML += `<div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <div class="product p-3">
        <div class="product__image mb-3 py-2">
          <img class="img-fluid" src="${product.image}" alt="" />
        </div>
        <div class="product__info">
          <p class="text-center">${product.description}</p>
          <h1 class="name mt-1 text-center">${product.name}</h1>
          <div class="specs d-flex flex-column my-3 px-2">
            <p>Screen: ${product.screen}"</p>
            <p>Back camera: ${product.backCamera}</p>
            <p>Front camera: ${product.frontCamera}</p>
          </div>
          <h2 class="price my-3 text-center text-danger">${price}$</h2>
        </div>
        <button type="button" class="to-cart btn btn-primary w-100" onclick="addToCart('${product.id}')">
          <i class="fa-solid fa-plus me-2"></i>ADD TO CART
        </button>
      </div>
    </div>`;
  });
};

let typeSearch = () => {
  let value = DOM("type-select").value;
  console.log(value);
  if (value === "All") {
    productService
      .getList()
      .then((res) => {
        displayProductList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    let searchResult = new Array();
    productService
      .getList()
      .then((res) => {
        res.forEach((product) => {
          if (product.type === value) searchResult.push(product);
        });
        displayProductList(searchResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

let incQuantity = (index) => {
  cart.incQuantity(index);
};

let decQuantity = (index) => {
  cart.decQuantity(index);
};

let removeProduct = (index) => {
  cart.removeProduct(index);
};

let productService = new ProductService();
let cart = new Cart();
if (localStorage.getItem("cart")) {
  cart.list = JSON.parse(localStorage.getItem("cart"));
}
cart.displayCart();
console.log(cart.list);

productService
  .getList()
  .then((res) => {
    displayProductList(res);
    let types = new Array();
    loop01: for (let product of res) {
      loop02: for (let type of types) {
        if (product.type === type) continue loop01;
      }
      types.push(product.type);
    }
    types.forEach((type) => {
      DOM("type-select").innerHTML += `
        <option value="${type}">${type}</option>
      `;
    });
  })
  .catch((err) => {
    console.log(err);
  });

let addToCart = (productID) => {
  cart.addProduct(productID);
};

let clearCart = () => {
  cart.clear();
};
