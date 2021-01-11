document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('#btn');
    const ta = new TextAnimation('.animate-title');
    const ta2 = new TextAnimation('.animate-title-2');
    ta.animate();
    ta2.animate();
    // クリックイベントのthisはクリックされたボタンのDOMが渡ってきてしまうため、TextAnimationのインスタンスで束縛
    btn.addEventListener('click', ta.animate.bind(ta));
});

console.log(this);  // ここのthisはグローバルオブジェクトを指す

class TextAnimation {
    constructor(el) {
        // ここのthisはクラスがインスタンス化がされて代入された変数オブジェクトを指す
        this.el = document.querySelector(el);
        this.chars = this.el.innerHTML.trim().split("");
        this.el.innerHTML = this._splitText();
    }
    _splitText() {
        return this.chars.reduce((acc, curr) => {
            curr = curr.replace(/\s+/, '&nbsp;');
            return `${acc}<span class="char">${curr}</span>`;
        }, "");
    }
    animate() {
        _that = this;  // bindで束縛する以外に、この階層でthisを変数に格納し、_thatをsetTimeout内で呼び出す方法もある
        setTimeout(function () {  // setTimeoutはwindowオブジェクトのメソッド
            console.log(this);  // => window (グローバルオブジェクト)
            this.el.classList.toggle('inview');
        }.bind(this));  // thisをTextAnimationのインスタンスに束縛
    }
}
