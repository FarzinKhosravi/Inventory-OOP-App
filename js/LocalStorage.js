import { Product } from "./Product.js";

class LocalStorage {
  // Local Storage (Category) :

  static saveCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  static getCategories() {
    return localStorage.getItem("categories")
      ? JSON.parse(localStorage.getItem("categories"))
      : [];
  }

  // Local Storage (Product) :

  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProducts() {
    return localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [];
  }

  static editProduct(title, id, productsTitle, editCancelButtons, products) {
    if (title && id) {
      const editedProduct = products.find((product) => product.id == id);

      editedProduct.title = title;
      editedProduct.createdDate = new Date().toISOString();

      products = products.sort((a, b) => {
        return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
      });

      LocalStorage.saveProducts(products);

      Product.createProductHTML(products);
    } else {
      Product.enableTitleInput(productsTitle, editCancelButtons, id);
    }
  }

  static removeProduct(id, products) {
    products = products.filter((product) => product.id != id);
    LocalStorage.saveProducts(products);
  }
}

export default LocalStorage;
