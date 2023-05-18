import product, {
  productAddButton,
  searchInput,
  sortDropdownList,
} from "./Product.js";

import category, {
  categoryLink,
  categoryCancelButton,
  categoryAddButton,
} from "./Category.js";

document.addEventListener("DOMContentLoaded", () => {
  categoryLink.addEventListener("click", () => category.categoryView());
  categoryCancelButton.addEventListener("click", () => category.hideCategory());
  categoryAddButton.addEventListener("click", () => category.addCategory());
  productAddButton.addEventListener("click", () => product.addProduct());
  searchInput.addEventListener("input", () => product.filterProduct());
  sortDropdownList.addEventListener("change", () => product.sortProductsDOM());

  // Set products and categories that already exist :
  product.setupApp();

  product.getProductSpecs();
});
