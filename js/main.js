// ===== Navigation Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .faq-item, .download-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Dynamic Version from API =====
async function fetchLatestVersion() {
    try {
        const response = await fetch('https://apexclient-backend.blazerkey106.workers.dev/updates');
        const data = await response.json();

        // Update version badge
        const badge = document.querySelector('.hero-badge');
        if (badge && data.version) {
            badge.textContent = `${data.version_tag || data.version} Available`;
        }

        // Update download version
        const downloadVersion = document.querySelector('.download-version');
        if (downloadVersion && data.version) {
            downloadVersion.textContent = `Version ${data.version}`;
        }

        // Update download link
        const downloadBtn = document.querySelector('.btn-download');
        if (downloadBtn && data.download_url) {
            downloadBtn.href = data.download_url;
        }
    } catch (error) {
        console.log('Could not fetch version info');
    }
}

// Fetch version on page load
fetchLatestVersion();

// ===== Online User Count (Optional) =====
async function fetchOnlineUsers() {
    try {
        const response = await fetch('https://apexclient-backend.blazerkey106.workers.dev/users');
        const data = await response.json();

        // You can add a user count display if you want
        console.log(`Online users: ${data.users?.length || 0}`);
    } catch (error) {
        console.log('Could not fetch user count');
    }
}

// Uncomment to show online users
// fetchOnlineUsers();
