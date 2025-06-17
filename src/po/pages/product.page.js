class ProductPage {
  get combinationPiliers() {
    return $('img[alt="Combination Pliers"]');
  }
  get productQuantity() {
    return $('[data-test="quantity"]');
  }
  get addToCard() {
    return $('[data-test="add-to-cart"]');
  }

  get toast() {
    return $("div.toast-message");
  }
}

module.exports = ProductPage;
