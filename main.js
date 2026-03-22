document.addEventListener('DOMContentLoaded', () => {
    // Mobilne Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Zabezpieczenie scrolla body gry otwarte menu
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    };

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Zmiana paska nawigacji na scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Aktualizacja aktywnego fragmentu menu dla wskaźnika
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Zmiana aktywnego elementu trochę mniejsza niż pozycja sekcji (bufor nawigacji)
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Płynne Animacje Pojawienia (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Jeśli chcesz odtwarzać animacje ciagle w gore/doł wyrzuć `unobserve`
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        // Dodaj wstępne opóźnienie dla płynniejszego załadowania
        observer.observe(el);
    });
    
    // Prosta obsługa formularza, bo to statyczny html dla Vercel
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Wysyłanie...';
            btn.disabled = true;
            
            // Symulacja Vercel Functions/Forms Submit
            setTimeout(() => {
                alert('Dziękujemy za zapytanie! Skontaktujemy się tak szybko jak to możliwe.');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
});
