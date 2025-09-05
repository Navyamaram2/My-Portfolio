document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      document.querySelector('nav ul').classList.remove('active');
    });
  });

  // Hamburger menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => navList.classList.toggle('active'));
  }

  // Section scroll-in animation
  document.querySelectorAll('section, header').forEach(section => {
    section.classList.add('section-animated');
  });
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.section-animated').forEach(sec => sectionObserver.observe(sec));

  // Animate skill bars and counters when skills section is visible
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.skill-level-fill').forEach(bar => {
          bar.style.width = bar.dataset.level || '100%';
        });
        // Counter animation
        document.querySelectorAll('.skill-counter').forEach(counter => {
          let target = +counter.getAttribute('data-count');
          let count = 0;
          counter.textContent = "0";
          let increment = Math.ceil(target / 30);
          function updateCounter() {
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              counter.textContent = count + "%";
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + "%";
            }
          }
          updateCounter();
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  }

  // Contact form validation & highlight
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }
      alert('Thank you for reaching out! I will get back to you soon.');
      contactForm.reset();
    });

    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', () => input.classList.add('input-focus'));
      input.addEventListener('blur', () => input.classList.remove('input-focus'));
    });
  }
});
