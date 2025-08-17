// Tripease Starter — script.js
document.addEventListener('DOMContentLoaded', () => {
  // Current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Fake search
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn){
    searchBtn.addEventListener('click', () => {
      alert('Search initialized — wire this to your backend or API later. \nTip: use query params like ?q=Bali&from=2025-08-20');
    });
  }

  // Contact form UX
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('contactSuccess');
  if (form && ok){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      ok.classList.remove('d-none');
      form.reset();
      setTimeout(() => ok.classList.add('d-none'), 3500);
    });
  }

  // Simple scroll reveal
  const reveal = (el) => el.classList.add('reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{ if (e.isIntersecting) reveal(e.target) });
  }, {threshold: .12});
  document.querySelectorAll('.fade-up, .scale-in, .destination-card, .pkg-card')
    .forEach(el => observer.observe(el));
});

// Packages section 3 in 1 image
document.querySelectorAll('.package-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    const bg = section.getAttribute('data-bg');
    document.querySelector('.packages-card').style.backgroundImage = `url('${bg}')`;
  });
});


// callback form appears on clicking oncards
// Select all cards and all 'Get a Callback' buttons
const cards = document.querySelectorAll('.book-btn'); // your card class
const callbackButtons = document.querySelectorAll(''); // your button class

const formModal = document.getElementById('formModal');
const closeFormBtn = document.getElementById('closeFormBtn');

// Open modal when clicking on any card
cards.forEach(card => {
  card.addEventListener('click', () => {
    formModal.style.display = 'flex';
  });
});

// Open modal when clicking on "Get a Callback" button
callbackButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent card click event from firing again
    formModal.style.display = 'flex';
  });
});

// Close modal
closeFormBtn.addEventListener('click', () => {
  formModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === formModal) {
    formModal.style.display = 'none';
  }
});




// slideshow hero background
document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "images/img1.jpg",
    "images/img5.jpg",
    "images/img2.jpg",
    "images/img4.jpg",
    "images/img3.jpg"
  ];
  
  let current = 0;
  const slideshow = document.querySelector(".hero-bg-slideshow");

  slideshow.style.backgroundImage = `url(${images[current]})`;
  slideshow.style.transition = "opacity 1s ease-in-out";

  setInterval(() => {
    const next = (current + 1) % images.length;
    const img = new Image();
    img.src = images[next];

    img.onload = () => {
      slideshow.style.opacity = 0; // fade out current
      setTimeout(() => {
        slideshow.style.backgroundImage = `url(${images[next]})`;
        slideshow.style.opacity = 1; // fade in
        current = next;
      }, 50); // tiny delay to trigger CSS transition
    };
  }, 5000);
});

// whatsapp icon
function toggleChat() {
      const chatBox = document.getElementById("chatBox");
      const overlay = document.getElementById("chatOverlay");
      chatBox.classList.toggle("show");
      overlay.classList.toggle("show");
    }

    function openWhatsApp() {
      let phoneNumber = "917018434170"; // Change to your WhatsApp number
      let msg = "Hi, I’d like to know more about your travel packages.";
      let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    }