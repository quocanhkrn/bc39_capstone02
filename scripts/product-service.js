function ProductService() {
  this.getList = () => {
    return axios({
      method: "get",
      url: "https://6386f01de399d2e473f019bb.mockapi.io/api/capstone-02-products",
    });
  };
}
