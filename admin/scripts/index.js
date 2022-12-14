DOM = (id) => document.getElementById(id);

let displayProductList = (list) => {
  DOM("product-table").innerHTML = "";
  list.forEach((product, index) => {
    let price = parseInt(product.price);
    price = price.toLocaleString("en-US");
    DOM("product-table").innerHTML += `
      <tr>
        <td scope="row">${index + 1}</td>
        <td class="product-name">${product.name}</td>
        <td class="product-price">${price}$</td>
        <td class="product-image"><img src="${product.image}" /></td>
        <td>${product.description}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-success" id="update-btn" data-bs-toggle="modal" data-bs-target="#productModal" onclick="updateProduct('${
              product.id
            }')">Update</button>
            <button type="button" class="btn btn-danger" onclick="delProduct('${product.id}')">Delete</button>
          </div> 
        </td>
      </tr>
    `;
  });
};

let productService = new ProductService();
let getList = () => {
  productService
    .getList()
    .then((res) => {
      displayProductList(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

let initializeNewForm = () => {
  DOM("form").reset();
  DOM("productModalLabel").innerHTML = "NEW PRODUCT";
  DOM("add-new-btn").style.display = "block";
  DOM("save-update-btn").style.display = "none";
};

let addNewProduct = () => {
  let _name = DOM("name").value;
  let _type = DOM("type").value;
  let _price = DOM("price").value;
  let _description = DOM("description").value;
  let _image = DOM("image").value;
  let _screen = DOM("screen").value;
  let _backCamera = DOM("back-camera").value;
  let _frontCamera = DOM("front-camera").value;
  let newProduct = {
    name: _name,
    type: _type,
    price: _price,
    description: _description,
    image: _image,
    screen: _screen,
    backCamera: _backCamera,
    frontCamera: _frontCamera,
  };
  productService
    .getList()
    .then((res) => {
      let isExisted = false;
      res.forEach((product) => {
        if (product.name === newProduct.name) {
          isExisted = true;
        }
      });
      if (isExisted) {
        alert("This phone has already exists.");
        return;
      } else {
        productService
          .addProduct(newProduct)
          .then((res) => {
            DOM("close-btn").click();
            getList();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let updateProduct = (id) => {
  DOM("productModalLabel").innerHTML = "UPDATE PRODUCT";
  DOM("add-new-btn").style.display = "none";
  DOM("save-update-btn").style.display = "block";
  productService
    .getList()
    .then((res) => {
      res.forEach((product) => {
        if (product.id === id) {
          DOM("name").value = product.name;
          DOM("type").value = product.type;
          DOM("price").value = product.price;
          DOM("description").value = product.description;
          DOM("image").value = product.image;
          DOM("screen").value = product.screen;
          DOM("back-camera").value = product.backCamera;
          DOM("front-camera").value = product.frontCamera;
          DOM("form").onsubmit = () => {
            let newProduct = {
              name: DOM("name").value,
              type: DOM("type").value,
              price: DOM("price").value,
              description: DOM("description").value,
              image: DOM("image").value,
              screen: DOM("screen").value,
              backCamera: DOM("back-camera").value,
              frontCamera: DOM("front-camera").value,
            };
            productService
              .updateProduct(id, newProduct)
              .then((res) => {
                DOM("close-btn").click();
                getList();
              })
              .catch();
          };
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

let delProduct = (id) => {
  productService
    .delProduct(id)
    .then((res) => {
      getList();
    })
    .catch((err) => {
      console.log(err);
    });
};

getList();
