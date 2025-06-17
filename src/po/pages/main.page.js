class MainPage {
  async open() {
    await browser.url("/");
  }
  get combinationPiliers() {
    return $('img[alt="Combination Pliers"]');
  }
  get brandCheckbox() {
    return $(
      "#filters > fieldset:nth-child(16) > div:nth-child(2) > label > input"
    );
  }
  get category1() {
    return $(
      "#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input"
    );
  }
  get category2() {
    return $(
      "#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input"
    );
  }
  get hammer() {
    return $('img[alt="Hammer"]');
  }
  get woodSaw() {
    return $('img[alt="Wood Saw"]');
  }
  get languageButton() {
    return $('[data-test="language-select"]');
  }
  get languageFrButton() {
    return $('[data-test="lang-fr"]');
  }
  get navHome() {
    return $('[data-test="nav-home"]');
  }
}

module.exports = MainPage;
