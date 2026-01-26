document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Header scroll effect
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-dot-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;
        dot.style.opacity = '1';

        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
        outline.style.opacity = '1';
    });

    // Hover effect on links for cursor
    // The instruction mentioned "fix project box selector", but the provided edit was malformed.
    // Assuming the intent was to add a specific class for tech tags to the cursor hover effect,
    // and to ensure the .project-box selector remains correct.
    // The original selector for .project-box is already correct.
    // If 'tech-tag' elements should have a default cursor and not trigger the custom cursor hover effect,
    // they should be excluded from the 'links' selector or handled separately.
    // As the instruction provided a malformed code edit that inserted CSS properties into JS,
    // and mentioned 'cursor: default' for 'tech tags in style.css',
    // I'm keeping the JS selector as is, as it's syntactically correct and functional for .project-box.
    // The CSS change for 'tech tags' cannot be applied to this JS file.
    const links = document.querySelectorAll('a, button, .project-box, .p-img');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.borderColor = 'var(--secondary)';
        });
        link.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.borderColor = 'var(--primary)';
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple mobile toggle style
        if (navLinks.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-dark)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--glass-border)';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Contact form submission (feedback)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message envoyé !';
                btn.style.background = '#22c55e';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Project Modals Management
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.project-modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    // Close modal when clicking the X button
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.project-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            }
        });
    });

    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
});
