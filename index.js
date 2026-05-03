document.addEventListener('DOMContentLoaded', () => {
    // --- Particles Background ---
    const particlesContainer = document.getElementById('particles-container');
    const colors = ['#EFE8EE', '#F3E6E8', '#F5F0E6', '#E8F0F2', '#ffffff'];

    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }

    // --- Opening Animation ---
    const openBtn = document.getElementById('open-btn');
    const openingPage = document.getElementById('opening-page');
    const mainPage = document.getElementById('main-page');
    const envelope = document.getElementById('envelope');
    const envelopeText = document.getElementById('envelope-text');

    openBtn.addEventListener('click', () => {
        // 1. Button shrinks
        openBtn.style.transform = 'scale(0.95)';

        // 2. Poster/Envelope vibrates
        envelope.classList.add('shake');

        // 3. Text changes after a small delay
        setTimeout(() => {
            envelopeText.style.opacity = '0';
            setTimeout(() => {
                envelopeText.innerText = 'Still trying.';
                envelopeText.style.opacity = '1';
                createSparkles(envelope);
            }, 300);
        }, 500);

        // 4. Transition to main page
        setTimeout(() => {
            openingPage.classList.add('fade-out');

            setTimeout(() => {
                mainPage.classList.remove('hidden');
                mainPage.classList.add('fade-in-up');

                // Initialize scroll animations
                initScrollAnimations();
                // Ensure scroll is at top
                window.scrollTo(0, 0);
            }, 1000); // Wait for opening page to fade out
        }, 1500); // 1.5s total animation before transition
    });

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${Math.random() * rect.width}px`;
            sparkle.style.top = `${Math.random() * rect.height}px`;
            sparkle.style.fontSize = `${Math.random() * 10 + 10}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = `popIn 0.5s ease forwards`;
            sparkle.style.zIndex = '10';
            element.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // --- Scroll Animations ---
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Immediately show the first section
        setTimeout(() => {
            document.querySelector('.hero-section').classList.add('visible');
        }, 300);
    }

    // --- Random Message Generators ---
    const messages = [
        "You don't have to be okay all at once.",
        "Pelan-pelan. Even slow progress is still movement.",
        "Your thesis is important, but your mind matters too.",
        "You are not behind. You are on a path that is heavier than it looks.",
        "Hari ini berat, but you are still here. That matters.",
        "Do not confuse exhaustion with failure.",
        "Kamu nggak harus selalu kuat. Sometimes being honest about being tired is already brave.",
        "One paragraph is progress. One page is progress. One breath is progress.",
        "S2 is not for the weak, and look at you, still trying.",
        "You are allowed to pause without explaining yourself to everyone.",
        "Not everything has to be fixed tonight.",
        "You are doing better than your anxious brain is telling you."
    ];

    // Hero Section Reminder Button
    const reminderBtn = document.getElementById('reminder-btn');
    const randomMsgContainer1 = document.getElementById('random-message-container');

    reminderBtn.addEventListener('click', () => {
        showRandomMessage(randomMsgContainer1);
    });

    // Generator Section Button
    const generatorBtn = document.getElementById('generator-btn');
    const randomMsgContainer2 = document.getElementById('generated-message');

    generatorBtn.addEventListener('click', () => {
        showRandomMessage(randomMsgContainer2);
    });

    function showRandomMessage(container) {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        container.innerText = randomMsg;
        container.classList.remove('hidden');

        // Re-trigger animation
        container.style.animation = 'none';
        container.offsetHeight; /* trigger reflow */
        container.style.animation = null;
    }

    // --- Mini Recharge Checklist ---
    const checklistItems = document.querySelectorAll('.checklist-item');
    const checklistSuccess = document.getElementById('checklist-success');
    let checkedCount = 0;

    checklistItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('checked')) {
                item.classList.add('checked');
                checkedCount++;

                // Play subtle sound or just visual feedback
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 150);

                if (checkedCount === checklistItems.length) {
                    setTimeout(() => {
                        checklistSuccess.classList.remove('hidden');
                    }, 400);
                }
            } else {
                item.classList.remove('checked');
                checkedCount--;
                checklistSuccess.classList.add('hidden');
            }
        });
    });

    // --- Virtual Hug Button ---
    const hugBtn = document.getElementById('hug-btn');
    const hugMessage = document.getElementById('hug-message');

    hugBtn.addEventListener('click', (e) => {
        // Create floating hearts
        const rect = hugBtn.getBoundingClientRect();

        for (let i = 0; i < 8; i++) {
            createHeart(rect.left + rect.width / 2, rect.top + window.scrollY);
        }

        // Show message
        hugMessage.innerHTML = "Virtual hug sent.<br>You are safe. You are enough. You are still worth rooting for.";
        hugMessage.classList.remove('hidden');

        hugMessage.style.animation = 'none';
        hugMessage.offsetHeight;
        hugMessage.style.animation = 'popIn 0.5s ease forwards';
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '🤍'; // Using white heart as per vibe, could also use 💖
        heart.classList.add('heart');

        // Randomize spread
        const spreadX = (Math.random() - 0.5) * 100;

        heart.style.left = `${x + spreadX}px`;
        heart.style.top = `${y}px`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});
