class MobileMenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector('.mobile-menu__btn');
    this.DOM.cover = document.querySelector('.mobile-menu__cover');
    this.DOM.container = document.querySelector('#global-container');  // これ以下のDOMを左にずらすため
    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getEventType() {
    // click ... スマホでボタンタッチ後、300msで発火する => スマホではレスポンス悪い
    // touchstart ... スマホ画面をタッチした瞬間に発火するイベント
    // window.ontouchstartが存在する => スマホで閲覧している
    return window.ontouchstart ? 'touchstart' : 'click'
  }

  _toggle() {
    this.DOM.container.classList.toggle('menu-open');
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
  }
}

new MobileMenu();
