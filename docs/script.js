// Email obfuscation to prevent spam
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.getElementById('contactLink');
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Construct email to avoid spam bots
            const username = 'rsnajw'; 
            const domain = 'proton.me'; 
            const email = username + '@' + domain;
            window.location.href = 'mailto:' + email;
        });
    }

    // Mobile: tap to show project info overlay
    if (window.innerWidth <= 768) {
        const photoItems = document.querySelectorAll('.photo-item');
        
        photoItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // If clicking the overlay link, let it proceed
                if (e.target.closest('.photo-overlay')) {
                    return;
                }
                
                // Otherwise toggle active state
                e.preventDefault();
                
                // Remove active from all other items
                photoItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });

        // Close overlay when tapping outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.photo-item')) {
                photoItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }

    // Smooth scroll behavior (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading enhancement
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Optional: Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to photo items if desired
document.querySelectorAll('.photo-item').forEach(item => {
    // Initial state for animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});
