const backgrounds = [
    'assets/images/background/police-dep.png',
    'assets/images/background/uwu-cafe.png',
    'assets/images/background/mechanic.png',
    'assets/images/background/hospital-dep.png'
];

let currentBgIndex = 0;
const mainContainer = document.querySelector('.main');

// Preload images to ensure smooth transitions without flickering
backgrounds.forEach(src => {
    const img = new Image();
    img.src = src;
});

function rotateBackground() {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    const nextImage = backgrounds[currentBgIndex];
    
    // Maintain the dark violet gradient overlay for text readability
    mainContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(20, 18, 18, 0.6) 40%, rgba(67, 2, 187, 0.4)), url('${nextImage}')`;
}

// Dynamic Scroll Fade Effect
function handleScrollFade() {
    // Target only elements with the .reveal class (the sections)
    // This explicitly excludes the navbar since it does not use this class
    const sections = document.querySelectorAll('section.reveal');
    const navbarHeight = 100; // Derived from .navbar height in style.css

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        // Calculate the fade as the section moves up towards the sticky navbar
        if (rect.top < navbarHeight + 50 && rect.bottom > navbarHeight) {
            const fadeDistance = rect.height * 0.6; // Transition speed
            const opacity = (rect.bottom - navbarHeight) / fadeDistance;
            section.style.opacity = Math.max(0, Math.min(1, opacity));
        } else if (section.classList.contains('active')) {
            // Reset to full opacity when the section is revealed but not near the top
            section.style.opacity = 1;
        }
    });
}

// Change background every 7 seconds
setInterval(rotateBackground, 7000);
window.addEventListener('scroll', handleScrollFade);

// Scroll Reveal Logic
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(section => {
    sectionObserver.observe(section);
});

// Server Mappings Animation Slides
document.addEventListener('DOMContentLoaded', () => {
    const imageMap = {
        "Police Dpeartment" : "assets/images/mappings/police-dep.png",
        "Hospital Department" : "assets/images/mappings/hospital-dep.png",
        "Federal Bureau Of Investigation" : "assets/images/mappings/fbi-dep.png",
        "Mechanic Autoparts" : "assets/images/mappings/mechanic.png",
        "UwU Cafeteria" : "assets/images/mappings/uwu.png"
    };

    const cards = document.querySelectorAll('mapping-card');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const title = card.querySelector('.mappings-name') .innerText;
            const container = card.querySelector('.img-container');

            // Inject the image from the Object
            if (!container.innerHTML) {
                const img = document.createElement('img');
                img.src = imageMap[title];
                img.alt = title;
                container.appendChild(img);
            }

            // Trigger the slide-up animation
            card.classList.add('slide-in');
        }
    });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observer(card));
});

// Payment Redirection Logic (Discord Account)
const payButtons = document.querySelectorAll('.pay-button');

payButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'assets/pages/payment-page.html';
    });
});

// Form Redirection Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selection = document.getElementById('form-type').value;
        
        // Define your Google Form URLs here
        const urls = {
            'account-appeal': 'https://docs.google.com/forms/d/e/1FAIpQLSdbtx47tnqJRmJkKumFAW2QMrbF2iEkpFjG8zAH4TCV1Z3ZNg/viewform?usp=header',
            'perm-ban-appeal': 'https://docs.google.com/forms/d/e/1FAIpQLSdSqcZyArjg-zOZPHfXpdfqXfYv8YP4PvJZTeXKJrjmLr3XnA/viewform?usp=sharing&ouid=113437481964779147193'
        };

        if (urls[selection]) {
            window.open(urls[selection], '_blank');
        }
    });
}

// Notification Slides when Player Joins (SA-MP Server)
function showJoinNotify(playerTag, message) {
    const container = document.getElementById('join-notify');
    const duration = 5000; // Time in milliseconds (5 seconds)

    // Notification Element
    const toast = document.createElement('div');
    toast.className = 'samp-toast';
    toast.innerHTML = `
        <strong>${playerTag}</strong> ${message}
        <div class="progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    // Add to container
    container.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.4s ease forwards";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, duration);
}

// Job Slideshow Logic
const slidesWrapper = document.querySelector('.slides-wrapper');
if (slidesWrapper) {
    const jobSlides = slidesWrapper.querySelectorAll('.job-card');
    let currentJobIndex = 0;

    const updateJobSlide = () => {
        jobSlides.forEach((slide, index) => {
            slide.classList.toggle('active-slide', index === currentJobIndex);
        });
    };

    const nextSlide = () => {
        currentJobIndex = (currentJobIndex + 1) % jobSlides.length;
        updateJobSlide();
    };

    // Auto-slide every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
}