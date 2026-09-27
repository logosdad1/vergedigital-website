document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isHidden = mobileMenu.classList.contains('hidden');
            menuBtn.innerHTML = isHidden 
                ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
                : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        });
    }

    // 3. Interactive Demo Form Handler
    const demoForm = document.getElementById('ordigit-demo-form');
    const demoResult = document.getElementById('ordigit-demo-result');

    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = demoForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Loading state
            btn.innerHTML = '<span class="inline-block animate-pulse">INVESTIGATING SIGNALS...</span>';
            btn.style.backgroundColor = 'transparent';
            btn.style.color = 'var(--verge-accent)';
            btn.style.border = '1px solid var(--verge-accent)';
            
            // Simulate processing
            setTimeout(() => {
                demoForm.style.display = 'none';
                demoResult.classList.remove('hidden');
            }, 2000);
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                    otherItem.querySelector('.faq-question').classList.remove('text-verge-accent');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.classList.add('hidden');
                icon.textContent = '+';
                question.classList.remove('text-verge-accent');
            } else {
                answer.classList.remove('hidden');
                icon.textContent = '−';
                question.classList.add('text-verge-accent');
            }
        });
    });
});
