document.addEventListener('DOMContentLoaded', () => {
    // Buton Back to Top
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animatie Numere (Counters) cu IntersectionObserver
    const counters = document.querySelectorAll('.counter-val');
    
    if (counters.length > 0) {
        const startCounting = (counter) => {
            const target = +counter.getAttribute('data-target');
            const speed = 150;
            const increment = target / speed;
            
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateNumber, 10);
                } else {
                    counter.innerText = target + (target === 98 ? '%' : '');
                }
            };
            
            updateNumber();
        };

        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting(entry.target);
                    observer.unobserve(entry.target); // Rulează o sing. data
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }
});