class ScrollObserver {
  constructor(els, cb, options) {
      // constructorの中では、基本的にthisのプロパティに値を設定する処理を記載
      this.els = document.querySelectorAll(els);
      const defaultOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0,
          once: true
      };
      this.cb = cb;
      // defaultOptionsにoptionsをマージ（optionsで設定された値が優先される）
      this.options = Object.assign(defaultOptions, options);
      this.once = this.options.once;
      // 複雑な処理は分離する
      this._init();
  }

  // _init()の中に初期化処理を分ける
  _init() {
      const callback = function (entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // callback関数にDOMと交差判定を渡す
                  this.cb(entry.target, true);
                  if(this.once) {
                      observer.unobserve(entry.target);
                  }
              } else {
                  this.cb(entry.target, false);
              }
          });
      };
      // IntersectionObserverはwindowオブジェクトのため、thisをbindする
      this.io = new IntersectionObserver(callback.bind(this), this.options);
      // @see https://github.com/w3c/IntersectionObserver/blob/master/polyfill/intersection-observer.js
      // 100msごとにスクロールを監視する
      this.io.POLL_INTERVAL = 100;
      this.els.forEach(el => this.io.observe(el));
  }

  // ユーザーが不要になったタイミングで交差検出処理を開放
  destroy() {
      // IntersectionObserverの監視を止める
      this.io.disconnect();
  }
}
