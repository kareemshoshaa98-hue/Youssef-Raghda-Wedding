// Countdown Timer
function updateCountdown() {
    // Wedding date: July 10, 2025 at 6:30 PM
    const weddingDate = new Date('2025-07-10T18:30:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const countdownHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;

        document.getElementById('countdown').innerHTML = countdownHTML;
    } else {
        document.getElementById('countdown').innerHTML = '<h2 style="color: #d4a5a5;">🎉 The Wedding is Here! 🎉</h2>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP Form Handling
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const dietary = document.getElementById('dietary').value;
    const message = document.getElementById('message').value;

    // Prepare email subject and body
    const subject = `RSVP Confirmation - ${name}`;
    const body = `
Wedding RSVP Submission

Name: ${name}
Email: ${email}
Number of Guests: ${guests}
Will Attend: ${attendance === 'yes' ? 'Yes' : 'No'}
Dietary Preferences: ${dietary || 'None'}
Message: ${message || 'None'}

---
This is an automated response from the wedding website.
`;

    // Create mailto link
    const mailtoLink = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    alert(`Thank you, ${name}! Your RSVP has been submitted. We've prepared an email for you to send to confirm your attendance.`);
    
    // Optional: Reset form
    document.getElementById('rsvpForm').reset();
    
    // Optional: Open email client (uncomment if desired)
    // window.location.href = mailtoLink;
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.detail-card, .rsvp-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
