import LocalStorage from "./LocalStorage.js";

// Variables :

const categoryLink = document.querySelector(".category-link");
const categoryCancelButton = document.querySelector(
  ".add-category__cancel-button"
);
const categoryAddButton = document.querySelector(".add-category__add-button");

let categories = [];

let category = {};

class Category {
  getCategorySpecs() {
    const categoryInputs = [
      ...document.querySelectorAll(".add-category__input-category"),
    ];
    const titleInput = document.querySelector(".add-category__input-title");
    const descriptionInput = document.querySelector(
      ".add-category__input-description"
    );

    categoryInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const title = titleInput.value;
        const description = descriptionInput.value;

        this.updateCategory(title, description);
      });
    });
  }

  updateCategory(title, description) {
    if (title && description) {
      category = {};

      category.title = title;
      category.description = description;
    } else category = {};
  }

  addCategory() {
    if (category.title && category.description) {
      this.categorySort(category);

      Category.createCategoryHTML();

      this.hideCategory();

      // After creating the category, the entries in the category form are deleted :
      this.emptyCategoryInputs();
    } else return;
  }

  // After creating the category, the entries in the category form are deleted :
  emptyCategoryInputs() {
    const titleInput = document.querySelector(".add-category__input-title");
    const descriptionInput = document.querySelector(
      ".add-category__input-description"
    );

    titleInput.value = "";
    descriptionInput.value = "";

    category = {};
  }

  static createCategoryHTML() {
    const categoryList = document.querySelector(".add-product__dropdown-list");

    categories = LocalStorage.getCategories();

    const categoryFirstOption = `
          <option class="add-product__dropdown-option" selected>
          Select a Category:
          </option>
          `;

    let categoryOptions = "";

    categories.forEach((category) => {
      categoryOptions += `
            <option class="add-product__dropdown-option" value="${category.title}" data-id="${category.id}">
            ${category.title}
            </option>
            `;
    });

    let categoryHTML = `
          ${categoryFirstOption}
          ${categoryOptions}
          `;

    categoryList.innerHTML = categoryHTML;
  }

  categorySort(category) {
    category.id = new Date().getTime();
    category.createdDate = new Date().toISOString();

    categories = [...categories, category];

    categories = categories.sort((a, b) => {
      return new Date(a.createdDate) > new Date(b.createdDate) ? -1 : 1;
    });

    LocalStorage.saveCategories(categories);
  }

  categoryView() {
    this.getCategorySpecs();
    this.showCategory();
  }

  showCategory() {
    const categoryHeader = document.querySelector(".category-header");
    const categoryPage = document.querySelector(".add-category");

    categoryLink.style.display = "none";

    categoryHeader.style.display = "block";
    categoryPage.style.display = "flex";
  }

  hideCategory() {
    const categoryHeader = document.querySelector(".category-header");
    const categoryPage = document.querySelector(".add-category");

    categoryLink.style.display = "block";

    categoryHeader.style.display = "none";
    categoryPage.style.display = "none";
  }
}

export default new Category();

export { Category, categoryLink, categoryCancelButton, categoryAddButton };
