document.addEventListener('DOMContentLoaded', function () {

    const els = document.querySelectorAll('.animate-title');
    const callback = function(entries, observer) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const ta = new TextAnimation('.animate-title');
                ta.animate();
                observer.unobserve(entry.target);
            } else {
            }
        });
    };
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    };
    const io = new IntersectionObserver(callback, options);
    els.forEach(el => io.observe(el));
});
