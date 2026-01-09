// ====================
// Utility Functions
// ====================

// Set current year in footer and calculate age
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("bday-year").textContent = new Date().getFullYear() - 2004;

// Move the highlight under the active link
function moveHighlight(element) {
  const highlight = document.getElementById('highlight');
  const navbar = document.querySelector('.navbar');

  const rect = element.getBoundingClientRect();
  const navbarRect = navbar.getBoundingClientRect();

  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.left = `${rect.left - navbarRect.left}px`;
  highlight.style.top = `${rect.top - navbarRect.top}px`;
}

// Trigger another link click programmatically
function triggerLinkClick(divId) {
  const link = document.getElementById(divId);
  if (link) link.click();
}

// Show a specific content section and update active link + highlight
function showDiv(divId, event) {
  if (event) event.preventDefault();

  // Hide all content divs
  document.querySelectorAll('.content-div').forEach(div => {
    div.style.display = 'none';
  });

  // Show selected content div
  const divToShow = document.getElementById(divId);
  if (divToShow) {
    divToShow.style.display = 'block';
  }

  // Update active link class
  const allLinks = document.querySelectorAll('.navbar a');
  allLinks.forEach(link => link.classList.remove('active'));

  if (event?.currentTarget) {
    event.currentTarget.classList.add('active');
    moveHighlight(event.currentTarget);
  }
}

// ====================
// DOM Ready
// ====================

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const highlight = document.getElementById('highlight');
  const allNavLinks = navbar.querySelectorAll('.brand a, .links a, .right-links a');
  const brandLink = document.querySelector('.brand a');

  // Initial highlight and active state
  moveHighlight(brandLink);
  brandLink.classList.add('active');

  // Attach click event to all nav links
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Prevent duplicate highlight logic
      showDiv(link.getAttribute('onclick')?.match(/'(.*?)'/)?.[1], e);
    });
  });

  // Reposition highlight on resize
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.navbar a.active') || brandLink;
    moveHighlight(activeLink);
  });

  // ====================
  // Hamburger Menu Logic
  // ====================
  const hamburger = document.querySelector('.hamburger');
  const linksContainer = document.querySelector('.links');

  if (hamburger && linksContainer) {
    hamburger.addEventListener('click', () => {
      linksContainer.classList.toggle('visible');
    });

    // Auto-close on link click (mobile)
    linksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          linksContainer.classList.remove('visible');
          const activeLink = document.querySelector('.navbar a.active');
          if (activeLink) moveHighlight(activeLink);
        }
      });
    });
  }
});


// ====================
// Toast Notification Logic
// ====================

let toastTimeout;

function showToast() {
  const toast = document.getElementById("toast");
  const progress = toast.querySelector(".progress");

  // Reset animation
  progress.style.animation = "none";
  void progress.offsetWidth;  // trigger reflow
  progress.style.animation = "toastProgress 3s linear forwards";

  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 3000);
}

function hideToast() {
  const toast = document.getElementById("toast");
  toast.classList.remove("show");
}


// ====================
// Contact form submission (fetch + timeout + honeypot + UX)
// ====================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const submitBtn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('contact-status');
  const honeypot = document.getElementById('company');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot && honeypot.value.trim() !== '') {
      statusEl.style.color = 'crimson';
      statusEl.textContent = 'Spam detected.';
      return;
    }

    const name = (contactForm.name && contactForm.name.value || '').trim();
    const email = (contactForm.email && contactForm.email.value || '').trim();
    const message = (contactForm.message && contactForm.message.value || '').trim();

    if (!name || !email || !message) {
      statusEl.style.color = 'crimson';
      statusEl.textContent = 'Please complete all fields.';
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';

    const controller = new AbortController();
    const TIMEOUT_MS = 10000;
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch('https://api.kairav.dev/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site: 'kairav.dev', name, email, message }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        statusEl.style.color = 'green';
        statusEl.textContent = "✅ Message sent — thank you!";
        contactForm.reset();
      } else {
        let errText = res.statusText || 'Server error';
        try { errText = await res.text(); } catch (err) {}
        statusEl.style.color = 'crimson';
        statusEl.textContent = `❌ Error sending message: ${errText}`;
      }
    } catch (err) {
      statusEl.style.color = 'crimson';
      if (err.name === 'AbortError') {
        statusEl.textContent = '❌ Request timed out. Please try again.';
      } else {
        statusEl.textContent = '❌ Network error. Please try again.';
      }
    } finally {
      clearTimeout(timeoutId);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});