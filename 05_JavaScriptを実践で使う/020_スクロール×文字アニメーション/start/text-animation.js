class TextAnimation {
  constructor(el) {
      this.DOM = {};
      if(el instanceof HTMLElement) {
        this.DOM.el = el;  // DOMの場合
      } else {
        this.DOM.el = document.querySelector(el);  // セレクターの文字列('.animate-title')の場合
      }
      this.chars = this.DOM.el.innerHTML.trim().split("");  // 文字の分割処理
      this.DOM.el.innerHTML = this._splitText();  // 分割した文字を<span>で囲う
  }
  _splitText() {
      return this.chars.reduce((acc, curr) => {
          curr = curr.replace(/\s+/, '&nbsp;');
          return `${acc}<span class="char">${curr}</span>`;
      }, "");
  }
  animate() {
      this.DOM.el.classList.toggle('inview');
  }
}
class TweenTextAnimation extends TextAnimation {
  constructor(el) {
      super(el);
      this.DOM.chars = this.DOM.el.querySelectorAll('.char');
  }

  animate() {
      this.DOM.el.classList.add('inview');
      this.DOM.chars.forEach((c, i) => {
          TweenMax.to(c, .6, {
              ease: Back.easeOut,
              delay: i * .05,
              startAt: { y: '-50%', opacity: 0},
              y: '0%',
              opacity: 1
          });
      });
  }
}
