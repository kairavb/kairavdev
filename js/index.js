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