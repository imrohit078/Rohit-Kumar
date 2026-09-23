// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Close Mobile Menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Typing Text Effect for Headers / Roles
const roles = [
    "Generative AI & LLMs",
    "Computer Vision & Deep Learning",
    "Python & Backend Engineering",
    "Full-Stack AI Applications"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 120;
const erasingDelay = 70;
const newRoleDelay = 1500;
const typingElement = document.querySelector('.typing-text');

function type() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, newRoleDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
}

// Start typing effect after page loads
document.addEventListener("DOMContentLoaded", () => {
    if (typingElement) {
        setTimeout(type, 800);
    }
});

// Working Contact Form via Web3Forms API
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const resultText = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        resultText.style.color = '#38bdf8';
        resultText.innerText = 'Please wait...';

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (response.status === 200) {
                resultText.style.color = '#4ade80'; // Green color
                resultText.innerText = 'Message sent successfully! Check your email.';
                contactForm.reset();
            } else {
                resultText.style.color = '#f87171'; // Red color
                resultText.innerText = result.message || 'Something went wrong. Please try again.';
            }
        } catch (error) {
            resultText.style.color = '#f87171';
            resultText.innerText = 'Failed to send message. Please check connection.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
            setTimeout(() => {
                resultText.innerText = '';
            }, 6000);
        }
    });
}


// Fetch latest commit date from GitHub
async function fetchLastUpdated() {
    const updateElement = document.getElementById('update-date');
    if (!updateElement) return;

    try {
        const response = await fetch('https://api.github.com/repos/imrohit078/portfolio/commits/main');
        if (response.ok) {
            const data = await response.json();
            const commitDate = new Date(data.commit.committer.date);
            
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            updateElement.textContent = commitDate.toLocaleDateString('en-US', options);
        } else {
            updateElement.textContent = 'Recently';
        }
    } catch (err) {
        updateElement.textContent = 'Recently';
    }
}

fetchLastUpdated();