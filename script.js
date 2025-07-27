/**
 * Developed by: Muratcan Çetinkaya
 * GitHub: github.com/muratcetinkaya
 */

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Language Management
let currentLanguage = 'tr';

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update all elements with language data
    document.querySelectorAll('[data-tr]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update form placeholders
    document.querySelectorAll('[data-placeholder-tr]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.setAttribute('placeholder', placeholder);
        }
    });
    
    // Save language preference
    localStorage.setItem('language', lang);
}

// Load saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language') || 'tr';
    if (savedLanguage !== 'tr') {
        changeLanguage(savedLanguage);
    }
    updateNavigationButtons();
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.service-card, .feature, .contact-item');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show success message (in a real application, you would send this to a server)
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification content styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Add active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styles
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-link.active {
        color: #ff6b35;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .loading-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    body.loaded .loading-container {
        opacity: 0;
        pointer-events: none;
    }
    
    .loading-logo {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
        background-image: url('neksus_move.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        animation: logoSpin 2s linear infinite;
        filter: brightness(0) invert(1);
    }
    
    .loading-spinner {
        width: 80px;
        height: 80px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .loading-text {
        color: white;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 500;
        margin-top: 20px;
        text-align: center;
    }
    
    @keyframes logoSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Hide loading after page loads */
    body.loaded::before {
        opacity: 0;
        pointer-events: none;
    }
`;
document.head.appendChild(loadingStyles);

// Create loading elements
document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    loadingContainer.innerHTML = `
        <div class="loading-logo"></div>
        <div class="loading-spinner"></div>
        <div class="loading-text">Yükleniyor...</div>
    `;
    document.body.appendChild(loadingContainer);
});

// --- Enhanced Reference Slider Logic ---

function initializeReferenceSlider() {
    const slider = document.querySelector('.references-slider');
    const track = document.getElementById('referencesTrack');
    if (!track || !slider) {
        console.error("Slider or track not found!");
        return;
    }

    // Add all your logos here
    const originalItems = [
        { url: 'unilever.png', name: 'Unilever' },
        { url: 'camplaza.png', name: 'Cam Plaza' },
        { url: 'cagdas.png', name: 'Çağdaş Cam' },
        { url: 'langyuzer.jpg', name: 'Lang Yüzer' },
        { url: 'andropack.png', name: 'Andropack' },
        { url: 'europtec.jpeg', name: 'Europtec' },
        { url: 'kansan.png', name: 'Kansan' },
        { url: 'cms.svg', name: 'CMS' },
        { url: 'maxion.png', name: 'Maxion' },
        { url: 'Danone.jpg', name: 'Danone' },
        { url: 'fanuc.png', name: 'Fanuc' },
        { url: 'abb.png', name: 'ABB' },
    ];

    track.innerHTML = '';

    // Add logos to the track
    originalItems.forEach(item => {
        const referenceItem = document.createElement('div');
        referenceItem.className = 'reference-item';
        referenceItem.innerHTML = `
            <div class="reference-logo">
                <img src="${item.url}" alt="${item.name}" title="${item.name}" style="width: 100%; height: 70px; object-fit: contain; object-position: center; display: block;" onerror="this.style.display='none'">
            </div>
        `;
        track.appendChild(referenceItem);
    });

    // Wait for all images to load before calculating widths
    const images = track.querySelectorAll('img');
    let loaded = 0;
    if (images.length === 0) {
        setupSliderAnimation();
        return;
    }
    images.forEach(img => {
        if (img.complete) {
            loaded++;
        } else {
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded === images.length) {
                    setupSliderAnimation();
                }
            };
        }
    });
    if (loaded === images.length) {
        setupSliderAnimation();
    }
}

function setupSliderAnimation() {
    const slider = document.querySelector('.references-slider');
    const track = document.getElementById('referencesTrack');
    const items = track.querySelectorAll('.reference-item');
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    let totalWidth = 0;
    items.forEach(item => {
        totalWidth += item.offsetWidth + gap;
    });
    if (totalWidth > slider.offsetWidth) {
        // Clone items for seamless loop
        const clones = Array.from(items).map(item => item.cloneNode(true));
        clones.forEach(clone => track.appendChild(clone));
        const duration = totalWidth / 60;
        track.style.setProperty('--animation-duration', `${duration.toFixed(2)}s`);
        track.style.setProperty('--track-width', `${totalWidth.toFixed(2)}px`);
        slider.classList.add('is-animated');
    } else {
        slider.classList.remove('is-animated');
        track.style.justifyContent = 'center';
    }
}

document.addEventListener('DOMContentLoaded', initializeReferenceSlider);
window.addEventListener('resize', initializeReferenceSlider);

// Initialize reference slider when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initializeReferenceSlider();
});

// Palletizer PDF açma fonksiyonu
function openPalletizerPDF() {
    // PDF dosyasını yeni sekmede aç
    window.open('NeksusPalletizer.pdf', '_blank');
}

// Conveyor Manager PDF açma fonksiyonu (dummy)
function openConveyorPDF() {
    // Dummy ürün için bilgi mesajı
    alert('Neksus Conveyor Manager teknik dokümantasyonu hazırlanmaktadır.');
}

// Ürünler arası geçiş fonksiyonu
let currentProductIndex = 0;

function scrollProducts(direction) {
    const productCards = document.querySelectorAll('.product-card');
    const totalProducts = productCards.length;
    
    // Mevcut kartı gizle
    productCards[currentProductIndex].classList.remove('active');
    
    // Yeni index hesapla
    if (direction === 1) {
        currentProductIndex = (currentProductIndex + 1) % totalProducts;
    } else {
        currentProductIndex = (currentProductIndex - 1 + totalProducts) % totalProducts;
    }
    
    // Yeni kartı göster
    productCards[currentProductIndex].classList.add('active');
    
    // Butonları güncelle
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const productCards = document.querySelectorAll('.product-card');
    const totalProducts = productCards.length;
    
    // Buton durumlarını güncelle
    prevBtn.disabled = currentProductIndex === 0;
    nextBtn.disabled = currentProductIndex === totalProducts - 1;
}

// Sayfa yüklendiğinde butonları güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationButtons();
});

console.log('Neksus website initialized successfully!');
