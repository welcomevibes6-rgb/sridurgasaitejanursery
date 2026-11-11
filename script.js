/**
 * SRI DURGA SAITEJA NURSERY — MASTER JAVASCRIPT
 * Complete Interactive System: One-by-One Carousels, Hero Slider, Lightbox, Filter, Contact Form
 */

// ==========================================
// 1. NURSERY BUSINESS CONFIGURATION
// (Easily customize contact details here)
// ==========================================
const NURSERY_CONFIG = {
    name: "Sri Durga Saiteja Nursery",
    tagline: "Plants • Landscapes • Greener Tomorrow",
    phoneDisplay: "+91 81069 03979",
    phoneRaw: "+918106903979",
    secondaryPhoneDisplay: "+91 63017 60317",
    secondaryPhoneRaw: "+916301760317",
    whatsappNumber: "918106903979",
    email: "sridurgasaitejanursery@gmail.com",
    address: "Sri Durga Sai Teja Nursery, Kadiapulanka, Kadiyam, Rajahmundry, Andhra Pradesh 533126",
    instagramUrl: "https://www.instagram.com/",
    whatsappPrefill: "Hello Sri Durga Saiteja Nursery! I visited your website and would like to know more about your plant varieties. Please share more details. Thank you!"
};

// ==========================================
// 2. DEDICATED PLANTS COLLECTION DATA
// Organized by category pills: All, Outdoor Plants, Indoor Plants, Flowering Plants, Fruit Plants, Ficus
// ==========================================
const PLANTS_COLLECTION_DATA = {
    outdoor: {
        title: "Outdoor Plants",
        emoji: "🌳",
        images: [
            ...Array.from({ length: 13 }, (_, i) => `image copy ${90 + i}.png`),
            ...Array.from({ length: 29 }, (_, i) => `image copy ${41 + i}.png`),
            ...Array.from({ length: 20 }, (_, i) => `image copy ${70 + i}.png`),
            "image copy 160.png"
        ]
    },
    indoor: {
        title: "Indoor Plants",
        emoji: "🪴",
        images: [
            ...Array.from({ length: 29 }, (_, i) => `image copy ${12 + i}.png`),
            "image copy 161.png"
        ]
    },
    flowering: {
        title: "Flowering Plants",
        emoji: "🌸",
        images: [
            ...Array.from({ length: 14 }, (_, i) => `image copy ${140 + i}.png`),
            "image copy 162.png"
        ]
    },
    fruit: {
        title: "Fruit Plants",
        emoji: "🍋",
        images: [
            "image copy 118.png",
            "image copy 105.png",
            "image copy 130.png",
            "image copy 111.png",
            "image copy 133.png",
            ...Array.from({ length: 24 }, (_, i) => `image copy ${103 + i}.png`)
        ]
    },
    ficus: {
        title: "Ficus",
        emoji: "🌿",
        images: [
            "image.png",
            "image copy.png",
            "3.png",
            ...Array.from({ length: 10 }, (_, i) => `image copy ${2 + i}.png`)
        ]
    }
};

// Deduplicate helper
Object.keys(PLANTS_COLLECTION_DATA).forEach(key => {
    PLANTS_COLLECTION_DATA[key].images = Array.from(new Set(PLANTS_COLLECTION_DATA[key].images));
});

// Construct ALL category by combining unique images
const ALL_COLLECTION_IMAGES = Array.from(new Set([
    ...PLANTS_COLLECTION_DATA.outdoor.images,
    ...PLANTS_COLLECTION_DATA.indoor.images,
    ...PLANTS_COLLECTION_DATA.flowering.images,
    ...PLANTS_COLLECTION_DATA.fruit.images,
    ...PLANTS_COLLECTION_DATA.ficus.images
]));

// Exactly 10 Curated Gallery Photographs
const GALLERY_ITEMS = [
    // 3 Nursery Landscapes
    { src: "image copy 104.png", category: "nursery", title: "Nursery Rows Cultivation", sub: "Nursery Landscapes" },
    { src: "image copy 105.png", category: "nursery", title: "Sapota Plantation Saplings", sub: "Nursery Landscapes" },
    { src: "image copy 122.png", category: "nursery", title: "Greenhouse Saplings", sub: "Nursery Landscapes" },

    // 3 Exotic Collections
    { src: "image copy 130.png", category: "exotic", title: "Miyazaki Exotic Mangoes", sub: "Exotic Collections" },
    { src: "image copy 111.png", category: "exotic", title: "Harvested Exotic Palm Fruit", sub: "Exotic Collections" },
    { src: "image copy 133.png", category: "exotic", title: "Grafted Rare Fruit Plants", sub: "Exotic Collections" },

    // 2 Lush Foliage
    { src: "image copy 125.png", category: "greens", title: "Cinnamon & Spice Foliage", sub: "Lush Foliage" },
    { src: "image copy 128.png", category: "greens", title: "Tropical Herbaceous Garden", sub: "Lush Foliage" },

    // 2 Loading & Dispatch
    { src: "image copy 115.png", category: "dispatch", title: "Plant Packing & Dispatch", sub: "Loading & Dispatch" },
    { src: "image copy 120.png", category: "dispatch", title: "Wholesale Shipment Ready", sub: "Loading & Dispatch" }
];

// Active State for Lightbox
let activeLightboxItems = [];
let currentLightboxIndex = 0;

// ==========================================
// 3. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroSlider();
    initHeroWelcomeTyping();
    initFicusCarousel();
    initPlantsCollection();
    renderGallery();
    initGalleryFilter();
    initScrollReveals();
    initBackToTop();
    initContactForm();
    initLightboxListeners();
});

// ==========================================
// 4. NAVBAR & MOBILE DRAWER
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileClose = document.getElementById('mobileNavClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sublink');

    // Sticky shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggles
    const openMenu = () => {
        hamburger.classList.add('active');
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburger) hamburger.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('active')) closeMenu();
        else openMenu();
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Smooth active state on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// 5. HERO SLIDER
// ==========================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    if (!slides.length) return;

    let current = 0;
    let timer = null;
    const duration = 6500; // 6.5s comfortable viewing duration

    const showSlide = (index) => {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        current = index;
    };

    const nextSlide = () => {
        const nextIndex = (current + 1) % slides.length;
        showSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (current - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    };

    const startTimer = () => {
        clearInterval(timer);
        timer = setInterval(nextSlide, duration);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startTimer();
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startTimer();
        });
    });

    // Pause on hover
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(timer));
        heroSection.addEventListener('mouseleave', startTimer);

        // Mobile touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 45) {
                if (diff < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startTimer();
            }
        }, { passive: true });
    }

    startTimer();
}

// ==========================================
// 5.1. HERO SLIDE 1 WELCOME TYPING ANIMATION
// ==========================================
function initHeroWelcomeTyping() {
    const eyebrowEl = document.getElementById('heroWelcomeEyebrow');
    const titleEl = document.getElementById('heroWelcomeTitle');
    if (!eyebrowEl || !titleEl) return;

    if (eyebrowEl.dataset.typingDone === 'true') return;

    const eyebrowText = "Welcome To";
    const titleText = "Sri Durga SaiTeja Nursery";

    eyebrowEl.innerHTML = '';
    titleEl.innerHTML = '';

    let eyebrowIndex = 0;
    let titleIndex = 0;

    function typeEyebrowLetter() {
        if (eyebrowIndex < eyebrowText.length) {
            const span = document.createElement('span');
            span.className = 'type-letter';
            span.textContent = eyebrowText[eyebrowIndex];
            eyebrowEl.appendChild(span);
            eyebrowIndex++;
            setTimeout(typeEyebrowLetter, 80);
        } else {
            // Short natural pause before starting the nursery name
            setTimeout(typeTitleLetter, 280);
        }
    }

    function typeTitleLetter() {
        if (titleIndex < titleText.length) {
            const span = document.createElement('span');
            span.className = 'type-letter';
            span.textContent = titleText[titleIndex];
            titleEl.appendChild(span);
            titleIndex++;
            setTimeout(typeTitleLetter, 60);
        } else {
            eyebrowEl.dataset.typingDone = 'true';
        }
    }

    // Start typing shortly after website opens
    setTimeout(typeEyebrowLetter, 450);
}

// ==========================================
// 5.5. FICUS PLANTS CAROUSEL (TOUCH PAUSE)
// ==========================================
function initFicusCarousel() {
    const wrap = document.querySelector('.ficus-track-wrap');
    const track = document.getElementById('ficusTrack');
    if (!wrap || !track) return;

    wrap.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    }, { passive: true });

    wrap.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    }, { passive: true });
}

// ==========================================
// 6. DEDICATED SEPARATE PLANTS COLLECTION VIEW & ROUTING
// ==========================================
let currentPlantsFilter = 'all';
let currentVisiblePlants = [];

function renderPlantsGrid(filter = 'all') {
    const container = document.getElementById('plantsGridContainer');
    if (!container) return;

    currentPlantsFilter = filter;
    let imagesList = [];
    let categoryTitle = "All Plants";

    if (filter === 'all') {
        imagesList = ALL_COLLECTION_IMAGES;
        categoryTitle = "Our Plants Collection";
    } else if (PLANTS_COLLECTION_DATA[filter]) {
        imagesList = PLANTS_COLLECTION_DATA[filter].images;
        categoryTitle = PLANTS_COLLECTION_DATA[filter].title;
    }

    currentVisiblePlants = imagesList;

    container.innerHTML = imagesList.map((src, index) => {
        const encodedSrc = encodeURI(src);
        return `
            <div class="plant-grid-item" data-index="${index}" data-src="${encodedSrc}" data-category="${categoryTitle}">
                <div class="plant-grid-img-wrap">
                    <img src="${encodedSrc}" 
                         alt="${categoryTitle} Specimen - Sri Durga Sai Teja Nursery" 
                         class="plant-grid-img" 
                         loading="lazy"
                         decoding="async">
                    <div class="plant-grid-hover-overlay">
                        <span class="plant-grid-zoom-icon"><i class="fas fa-search-plus"></i></span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Update active pill button state
    const pills = document.querySelectorAll('.plant-pill-btn');
    pills.forEach(pill => {
        if (pill.getAttribute('data-filter') === filter) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

function openDedicatedCollection(category = 'all', updateHash = true) {
    const homeView = document.getElementById('homepageView');
    const varietiesView = document.getElementById('dedicatedVarietiesView');
    if (!varietiesView) return;

    if (homeView) homeView.style.display = 'none';
    varietiesView.style.display = 'block';

    // Render the selected category
    renderPlantsGrid(category);

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHash) {
        const targetHash = category === 'all' ? '#collection' : `#collection=${category}`;
        if (window.location.hash !== targetHash) {
            history.pushState(null, '', targetHash);
        }
    }

    // Update active state in navbar
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const varietiesNav = document.getElementById('navVarietiesLink');
    if (varietiesNav) varietiesNav.classList.add('active');
}

function returnToHomepage(targetSectionId = '') {
    const homeView = document.getElementById('homepageView');
    const varietiesView = document.getElementById('dedicatedVarietiesView');
    if (!homeView) return;

    if (varietiesView) varietiesView.style.display = 'none';
    homeView.style.display = 'block';

    // If specific section on homepage was requested
    if (targetSectionId && targetSectionId !== 'home') {
        const targetElem = document.getElementById(targetSectionId);
        if (targetElem) {
            setTimeout(() => {
                targetElem.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (window.location.hash.startsWith('#collection') || window.location.hash.startsWith('#varieties')) {
        history.pushState(null, '', targetSectionId ? `#${targetSectionId}` : '#home');
    }
}

function handleRoute() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#collection') || hash.startsWith('#varieties')) {
        let category = 'all';
        if (hash.includes('=')) {
            category = hash.split('=')[1].toLowerCase();
        }
        openDedicatedCollection(category, false);
    } else {
        const sectionId = hash.replace(/^#/, '');
        returnToHomepage(sectionId);
    }
}

function initPlantsCollection() {
    // 1. Listen for browser Back/Forward navigation
    window.addEventListener('popstate', handleRoute);
    window.addEventListener('hashchange', handleRoute);

    // 2. Check initial route on load
    handleRoute();

    // 3. Category Pill button clicks on collection page
    const pillButtons = document.querySelectorAll('.plant-pill-btn');
    pillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            openDedicatedCollection(filter, true);
        });
    });

    // 4. Back to Homepage button & breadcrumb Home link
    const backBtn = document.getElementById('btnBackHome');
    const breadcrumbHome = document.getElementById('breadcrumbHome');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            returnToHomepage('home');
        });
    }
    if (breadcrumbHome) {
        breadcrumbHome.addEventListener('click', (e) => {
            e.preventDefault();
            returnToHomepage('home');
        });
    }

    // 5. Homepage Explore Collection buttons (5 cards)
    const exploreButtons = document.querySelectorAll('.collection-card-btn[data-category]');
    exploreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = btn.getAttribute('data-category');
            openDedicatedCollection(cat, true);
        });
    });

    // 6. Navbar Varieties link & dropdown items
    const varietiesNav = document.getElementById('navVarietiesLink');
    if (varietiesNav) {
        varietiesNav.addEventListener('click', (e) => {
            e.preventDefault();
            openDedicatedCollection('all', true);
        });
    }

    const filterLinks = document.querySelectorAll('a[data-filter]');
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter') || 'all';
            openDedicatedCollection(filter, true);

            // Close mobile drawer if open
            const mobileDrawer = document.getElementById('mobileNavDrawer');
            const mobileOverlay = document.getElementById('mobileNavOverlay');
            if (mobileDrawer) mobileDrawer.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 7. Navbar other section links (Home, About, Landscaping, Gallery, Contact)
    // If clicked while on collection view, return to homepage and scroll to section
    const homeSectionLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .navbar-brand');
    homeSectionLinks.forEach(link => {
        if (link.id === 'navVarietiesLink' || link.classList.contains('mobile-sublink')) return;
        link.addEventListener('click', () => {
            const varietiesView = document.getElementById('dedicatedVarietiesView');
            if (varietiesView && varietiesView.style.display !== 'none') {
                const href = link.getAttribute('href') || '';
                const sectionId = href.replace(/^#/, '');
                returnToHomepage(sectionId);
            }
        });
    });
}

// ==========================================
// 7. OUR GREEN GALLERY
// ==========================================
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';

    GALLERY_ITEMS.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-item reveal-init';

        const encodedSrc = encodeURI(item.src);
        card.innerHTML = `
            <div class="gallery-item-inner">
                <img src="${encodedSrc}" alt="${item.title} - Sri Durga Sai Teja Nursery" class="gallery-item-img" loading="lazy" decoding="async">
                <div class="gallery-zoom-badge">
                    <i class="fas fa-expand-alt"></i>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            const list = GALLERY_ITEMS.map(f => ({
                src: encodeURI(f.src),
                title: f.title,
                category: f.sub
            }));
            openLightbox(idx, list);
        });

        grid.appendChild(card);
    });

    // Staggered smooth entrance animation
    setTimeout(() => {
        grid.querySelectorAll('.gallery-item').forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('reveal-visible');
            }, i * 50);
        });
    }, 40);
}

function initGalleryFilter() {
    const buttons = document.querySelectorAll('.gallery-filter-tabs .tab-btn');
    if (!buttons || !buttons.length) return;
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery();
        });
    });
}

// ==========================================
// 8. LIGHTBOX SYSTEM WITH WHATSAPP ENQUIRY
// ==========================================
function initLightboxListeners() {
    // Click on plant grid items opens lightbox
    document.addEventListener('click', (e) => {
        const item = e.target.closest('.plant-grid-item');
        if (item) {
            const cardIndex = parseInt(item.getAttribute('data-index'), 10);
            const categoryName = item.getAttribute('data-category') || "Our Plants Collection";
            const list = currentVisiblePlants.map((src, i) => ({
                src: encodeURI(src),
                title: `${categoryName} Specimen #${i + 1}`,
                category: categoryName
            }));
            openLightbox(cardIndex, list);
        }
    });

    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const modal = document.getElementById('lightboxModal');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index, items) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const category = document.getElementById('lightboxCategory');
    const counter = document.getElementById('lightboxCounter');
    const whatsappBtn = document.getElementById('lightboxEnquireBtn');

    if (!modal || !items.length) return;

    activeLightboxItems = items;
    currentLightboxIndex = index;

    const item = items[index];
    img.src = item.src;
    title.textContent = item.title;
    category.textContent = item.category;
    counter.textContent = `${index + 1} / ${items.length}`;

    // WhatsApp enquiry for this specific plant
    const msg = encodeURIComponent(`Hello Sri Durga Saiteja Nursery! I am interested in ${item.title} (${item.category}) that I saw on your website. Please share price, size, and availability. Thank you!`);
    whatsappBtn.href = `https://wa.me/${NURSERY_CONFIG.whatsappNumber}?text=${msg}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (!activeLightboxItems.length) return;
    currentLightboxIndex = (currentLightboxIndex + direction + activeLightboxItems.length) % activeLightboxItems.length;
    
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const category = document.getElementById('lightboxCategory');
    const counter = document.getElementById('lightboxCounter');
    const whatsappBtn = document.getElementById('lightboxEnquireBtn');

    const item = activeLightboxItems[currentLightboxIndex];

    img.style.opacity = '0';
    setTimeout(() => {
        img.src = item.src;
        title.textContent = item.title;
        category.textContent = item.category;
        counter.textContent = `${currentLightboxIndex + 1} / ${activeLightboxItems.length}`;
        
        const msg = encodeURIComponent(`Hello Sri Durga Saiteja Nursery! I am interested in ${item.title} (${item.category}) that I saw on your website. Please share price, size, and availability. Thank you!`);
        whatsappBtn.href = `https://wa.me/${NURSERY_CONFIG.whatsappNumber}?text=${msg}`;

        img.onload = () => { img.style.opacity = '1'; };
    }, 150);
}

// ==========================================
// 9. SCROLL REVEALS & NATURAL MICRO-ANIMATIONS
// ==========================================
function initScrollReveals() {
    const targets = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(t => t.classList.add('reveal-visible'));
        document.querySelectorAll('.stagger-group, .about-collections').forEach(g => g.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px'
    });

    targets.forEach(t => observer.observe(t));

    // Staggered Groups (stagger-group, about-collections, why-grid, contact-cards-grid)
    const staggerGroups = document.querySelectorAll('.stagger-group, .about-collections');
    if (staggerGroups.length) {
        const groupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    const children = entry.target.children;
                    Array.from(children).forEach((child, idx) => {
                        setTimeout(() => {
                            child.classList.add('reveal-visible');
                        }, idx * 110);
                    });
                    groupObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
        staggerGroups.forEach(g => groupObserver.observe(g));
    }
}

// ==========================================
// 10. BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// 11. CONTACT FORM & WHATSAPP GENERATOR
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('formWhatsappBtn');
    const statusMsg = document.getElementById('formStatusMsg');

    if (!form) return;

    // Direct WhatsApp submit from form fields
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const name = form.querySelector('[name="name"]')?.value.trim() || 'Visitor';
            const phone = form.querySelector('[name="phone"]')?.value.trim() || 'Not specified';
            const category = form.querySelector('[name="category"]')?.value || 'General Nursery Enquiry';
            const message = form.querySelector('[name="message"]')?.value.trim() || 'Looking for details on your plant varieties.';

            const text = encodeURIComponent(
                `*New Plant Enquiry — Sri Durga Saiteja Nursery*\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Plant Category:* ${category}\n` +
                `*Message:* ${message}\n\n` +
                `Thank you!`
            );

            window.open(`https://wa.me/${NURSERY_CONFIG.whatsappNumber}?text=${text}`, '_blank');
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-form-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Submitting Enquiry... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Enquiry Sent! <i class="fas fa-check"></i>';
            submitBtn.style.background = '#25D366';

            if (statusMsg) {
                statusMsg.className = 'form-status-msg success';
                statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your enquiry has been recorded. You can also chat directly with us on WhatsApp for instantaneous plant photos & quotes.';
            }

            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 4000);
        }, 1200);
    });
}
