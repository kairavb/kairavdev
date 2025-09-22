function triggerLinkClick(divId) {
  const link = document.getElementById(divId);
  link.click();
}

function showDiv(divId, event) {
  event.preventDefault();

  // Hide all content divs
  const divs = document.querySelectorAll('.content-div');
  divs.forEach(div => {
    div.style.display = 'none';
  });

  // Show selected content div
  const divToShow = document.getElementById(divId);
  if (divToShow) {
    divToShow.style.display = 'block';
  }

  // Manage active class
  const allLinks = document.querySelectorAll('.navbar a');
  allLinks.forEach(link => link.classList.remove('active'));

  if (event.currentTarget) {
    event.currentTarget.classList.add('active');
    moveHighlight(event.currentTarget);
  }
} 

// JavaScript for Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const links = document.querySelector('.links');
const highlight = document.querySelector('.highlight');
const linksArray = Array.from(links.querySelectorAll('a'));

hamburger.addEventListener('click', () => {
    links.classList.toggle('visible');
});

linksArray.forEach((link) => {
    link.addEventListener('click', (e) => {
    // Remove active class from all links
    linksArray.forEach((lnk) => lnk.classList.remove('active'));
    // Add active class to the clicked link
    e.target.classList.add('active');

    // Move the highlight for desktop
    // moveHighlight(e);

    // Close menu after selecting on mobile
    if (window.innerWidth <= 768) {
        links.classList.remove('visible');
    }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const highlight = document.getElementById('highlight');
  const navbar = document.querySelector('.navbar');

  // Combine all clickable links into one array
  const links = navbar.querySelectorAll('.brand a, .links a, .right-links a');

  // Default to brand link highlight
  const defaultLink = document.querySelector('.brand a');
  moveHighlight(defaultLink);
  defaultLink.classList.add('active');

  // Add click event to move highlight
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      moveHighlight(e.currentTarget);
    });
  });

  // Highlight movement logic
  function moveHighlight(element) {
    const rect = element.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();

    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.left = `${rect.left - navbarRect.left}px`;
    highlight.style.top = `${rect.top - navbarRect.top}px`;
  }

  // Adjust on resize
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.navbar a.active') || defaultLink;
    moveHighlight(activeLink);
  });
});