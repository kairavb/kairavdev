function showDiv(divId) {
    // Prevent the default behavior of the link (which would reload the page)
    event.preventDefault();
    
    // Find the parent container
    const contentWrapper = document.querySelector('.content-wrapper');
    
    // Get all divs inside the content-wrapper and hide them
    const divs = contentWrapper.querySelectorAll('.content-div');
    divs.forEach(div => {
      div.style.display = 'none';
    });
    
    // Show the specific div related to the clicked link
    const divToShow = contentWrapper.querySelector('#' + divId);
    if (divToShow) {
      divToShow.style.display = 'block';
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

// Highlight animation logic for desktop
function moveHighlight(e) {
    if (window.innerWidth > 768) {
    const linkRect = e.target.getBoundingClientRect();
    const linksRect = links.getBoundingClientRect();
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.left = `${linkRect.left - linksRect.left}px`;
    }
}

linksArray.forEach((link) => {
    link.addEventListener('click', (e) => {
    // Remove active class from all links
    linksArray.forEach((lnk) => lnk.classList.remove('active'));
    // Add active class to the clicked link
    e.target.classList.add('active');

    // Move the highlight for desktop
    moveHighlight(e);

    // Close menu after selecting on mobile
    if (window.innerWidth <= 768) {
        links.classList.remove('visible');
    }
    });
});

// Initialize the highlight position for the first active link
function initializeHighlight() {
    if (window.innerWidth > 768) {
    const activeLink = links.querySelector('.active');
    if (activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const linksRect = links.getBoundingClientRect();
        highlight.style.width = `${linkRect.width}px`;
        highlight.style.left = `${linkRect.left - linksRect.left}px`;
    }
    }
}

window.addEventListener('resize', initializeHighlight);
initializeHighlight();