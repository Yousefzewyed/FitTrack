// ===== ANIMATION SECTION =====
// أنيميشن بسيط لظهور العناصر عند السكرول
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // نطبق الأنيميشن على الكروت
    const cards = document.querySelectorAll('.feature-card, .hero-card, .cta-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
// ===== END ANIMATION SECTION =====