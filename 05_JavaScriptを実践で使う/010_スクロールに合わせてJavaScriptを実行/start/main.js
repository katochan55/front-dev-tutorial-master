const child = document.querySelector('.child');
const callback = function(entries, observer) {
  entries.forEach(entry => {  // entrie ... 複数の監視対象DOM
    if(entry.isIntersecting) {
      entry.target.classList.add('inview');  // 画面インした時
      observer.unobserve(entry.target);  // 監視対象DOMを対象から外す
    } else {
      entry.target.classList.remove('inview');  // 画面アウトした時
    }
  })
}

const options = {
  root: null,  // 親要素・先祖要素との交差を検知したい場合は、rootにそのDOMを設定する（あまり使わない）
  rootMargin: "-300px 0px 0px 0px",  // 交差点をずらす
  threshold: 0  // 0がデフォルト。1にすると要素丸々画面インしないと発火しない
}

const io = new IntersectionObserver(callback, options);  // 対象DOMと交差（画面イン、画面アウト）したときcallback関数が呼ばれる
io.observe(child);  // 監視対象のDOMを渡す
