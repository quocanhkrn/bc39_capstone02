function Cart() {
  this.list = [];

  this.addProduct = (productID) => {
    axios({
      method: "get",
      url: `https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products/${productID}`,
    })
      .then((res) => {
        let isInCart = false;
        let indexInCart = 0;
        loop: for (let index in this.list) {
          if (this.list[index].id === res.id) {
            isInCart = true;
            indexInCart = index;
            break loop;
          }
        }
        if (isInCart) {
          let quantity = ++this.list[indexInCart].quantity;
          let updatedProduct = new productInCart(res.id, res.name, res.price, quantity, res.image);
          updatedProduct.getTotal();
          this.list[indexInCart] = updatedProduct;
        } else {
          let newProduct = new productInCart(res.id, res.name, res.price, 1, res.image);
          newProduct.getTotal();
          this.list.push(newProduct);
        }
        this.updateLocalStorage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  this.incQuantity = (index) => {
    this.list[index].quantity++;
    this.list[index].total = this.list[index].price * this.list[index].quantity;
    this.updateLocalStorage();
  };

  this.decQuantity = (index) => {
    this.list[index].quantity--;
    this.list[index].total = this.list[index].price * this.list[index].quantity;
    if (this.list[index].quantity === 0) {
      this.list.splice(index, 1);
    }
    this.updateLocalStorage();
  };

  this.removeProduct = (index) => {
    this.list.splice(index, 1);
    this.updateLocalStorage();
  };

  this.clear = () => {
    this.list = [];
    this.updateLocalStorage();
  };

  this.displayCart = () => {
    document.getElementById("cart-quantity").innerHTML = this.list.length;
    document.querySelector(".cart-products").innerHTML = "";
    let cartTotal = 0;
    this.list.forEach((product, index) => {
      cartTotal += product.total;
      total = product.total.toLocaleString("en-US");
      document.querySelector(".cart-products").innerHTML += `
        <div class="cart-product d-flex justify-content-between align-items-center mb-3 py-1 p-3">
          <div class="cart-product__image">
            <img src="${product.image}" alt="" />
          </div>
          <p class="cart-product__name">${product.name}</p>
          <div class="cart-product__quantity d-flex justify-content-between align-items-center">
            <button class="p-0 rounded-circle" type="button" onclick="decQuantity('${index}')"><i class="fa-solid fa-chevron-left"></i></button>
            <span>${product.quantity}</span>
            <button class="p-0 rounded-circle" type="button" onclick="incQuantity('${index}')"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
          <div class="cart-product__total">${total}$</div>
          <button class="p-0 rounded-circle" type="button" onclick="removeProduct('${index}')"><i class="fa-solid fa-circle-minus"></i></button>
        </div>
      `;
    });
    DOM("cart-total").innerHTML = `${cartTotal.toLocaleString("en-US")}$`;
  };

  this.updateLocalStorage = () => {
    let cartJSONString = JSON.stringify(this.list);
    localStorage.setItem("cart", cartJSONString);
    this.displayCart();
  };
}

function productInCart(_id, _name, _price, _quantity, _image) {
  this.id = _id;
  this.name = _name;
  this.price = parseInt(_price);
  this.quantity = _quantity;
  this.image = _image;
  this.total = 0;

  this.getTotal = () => {
    this.total = this.quantity * this.price;
  };
}
