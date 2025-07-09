// Mobile Navigation Manager
class MobileNavigation {
  constructor() {
    this.init();
  }

  init() {
    // Wait for components to load before initializing
    if (document.querySelector(".bottom-nav")) {
      this.setupBottomNavigation();
    } else {
      // Wait for component to load
      setTimeout(() => this.init(), 100);
    }

    this.setupMobileViewport();
  }

  setupBottomNavigation() {
    // Add click handlers
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.handleNavClick(e, item);
      });
    });
  }

  handleNavClick(e, item) {
    // Remove active class from all items
    document.querySelectorAll(".bottom-nav .nav-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // Add active class to clicked item
    item.classList.add("active");
  }

  setupMobileViewport() {
    // Add mobile-specific touch handling
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device");
    }

    // Handle orientation changes
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.adjustForOrientation();
      }, 100);
    });

    // Set initial viewport height
    this.adjustForOrientation();
  }

  adjustForOrientation() {
    // Adjust layout for orientation changes if needed
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // Method to programmatically set active nav item
  setActiveNav(path) {
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === path) {
        item.classList.add("active");
      }
    });
  }
}

// Initialize mobile navigation when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) {
    // Delay initialization to allow components to load
    setTimeout(() => {
      new MobileNavigation();
    }, 200);
  }
});

// Re-initialize on window resize if crossing mobile breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768 && !window.mobileNav) {
    window.mobileNav = new MobileNavigation();
  } else if (window.innerWidth > 768 && window.mobileNav) {
    // Clean up mobile nav when switching to desktop
    window.mobileNav = null;
  }
});
