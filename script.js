// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when in view
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const bar = card.querySelector('.skill-level-fill');
        if (bar && !bar.classList.contains('animated')) {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            let width = 0;
            bar.classList.add('animated');
            const interval = setInterval(() => {
                width += 2;
                bar.style.width = width + '%';
                if (width >= parseInt(targetWidth)) {
                    bar.style.width = targetWidth;
                    clearInterval(interval);
                }
            }, 10);
        }
    });
}

// Intersection Observer for skills animation
const skillsSection = document.getElementById('skills');
if ('IntersectionObserver' in window && skillsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
} else {
    animateSkillBars();
}

// Contact form validation and animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            alert('Please fill out all fields.');
            return;
        }
        alert('Thank you for reaching out! I will get back to you soon.');
        contactForm.reset();
    });

    // Animate input borders on focus
    ['focus', 'blur'].forEach(evt => {
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener(evt, () => {
                if (evt === 'focus') {
                    input.style.boxShadow = `0 0 8px var(--primary)`;
                    input.style.borderColor = `var(--primary)`;
                } else {
                    input.style.boxShadow = '';
                    input.style.borderColor = '#ddd';
                }
            });
        });
    });
}
// Add a gradient definition to the page once
if (!document.getElementById('skill-gradient-def')) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svgDef = document.createElementNS(svgNS, "svg");
  svgDef.setAttribute('width', '0');
  svgDef.setAttribute('height', '0');
  svgDef.innerHTML = `
    <defs>
      <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#5f6fff"/>
        <stop offset="100%" stop-color="#ffb347"/>
      </linearGradient>
    </defs>
  `;
  svgDef.id = 'skill-gradient-def';
  document.body.appendChild(svgDef);
}

// Animate skill circles
document.querySelectorAll('.progress-circle').forEach(circle => {
  const percent = parseInt(circle.getAttribute('data-percentage'), 10);
  const bar = circle.querySelector('.bar');
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - percent / 100);
  // Animate when in view
  function animateBar() {
    bar.setAttribute('stroke-dasharray', `${circumference - offset} ${circumference}`);
  }
  // Intersection Observer for animation
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateBar();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(circle);
});



