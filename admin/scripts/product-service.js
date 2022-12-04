function ProductService() {
  this.getList = () => {
    return axios({
      method: "get",
      url: "https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products",
    });
  };

  this.addProduct = (product) => {
    return axios({
      method: "post",
      url: "https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products",
      data: product,
    });
  };

  this.updateProduct = (id, product) => {
    return axios({
      method: "put",
      url: `https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products/${id}`,
      data: product,
    });
  };

  this.delProduct = (id) => {
    return axios({
      method: "delete",
      url: `https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products/${id}`,
    });
  };
}
