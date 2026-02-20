/* Interactivity for Sai Academy Clone */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const navContainer = document.querySelector(".nav-container");

  mobileMenuBtn.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navContainer.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // 2. Fade-in Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  // Track elements for fade-in
  const animatedElements = document.querySelectorAll(
    ".fade-in, .reveal-up, .reveal-left, .reveal-right",
  );
  animatedElements.forEach((el) => observer.observe(el));

  // 3. Image Modal for Gallery
  window.openModal = function (src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = src;
    document.body.style.overflow = "hidden"; // Stop scrolling
  };

  window.closeModal = function () {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Close modal on Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 4. Active Link Highlighting
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active");
      }
    });

    // Navbar compression on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.padding = "15px 0";
      navbar.style.boxShadow = "none";
    }
  });

  // 5. Initial animation for hero (since it's already in view)
  setTimeout(() => {
    document
      .querySelectorAll(".hero .fade-in")
      .forEach((el) => el.classList.add("active"));
  }, 100);
});
