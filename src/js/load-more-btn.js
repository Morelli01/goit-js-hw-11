export class LoadMoreBtn {
  constructor(selector) {
    this.button = this.getBtn(selector);
  }

  getBtn(selector) {
    const button = document.querySelector(selector);
    return button;
  }

  show() {
    this.button.classList.remove('is-hidden');
  }

  hide() {
    this.button.classList.add('is-hidden');
  }
}