// Component loader system
class ComponentLoader {
  static async loadComponent(componentName, targetElement) {
    try {
      const response = await fetch(`/components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      const html = await response.text();

      if (typeof targetElement === "string") {
        const element = document.querySelector(targetElement);
        if (element) {
          element.innerHTML = html;
        }
      } else if (targetElement instanceof Element) {
        targetElement.innerHTML = html;
      }

      return html;
    } catch (error) {
      console.error("Error loading component:", error);
    }
  }

  static async loadComponents() {
    // Load sidebar
    const sidebarContainer = document.querySelector(
      '[data-component="sidebar"]'
    );
    if (sidebarContainer) {
      await this.loadComponent("sidebar", sidebarContainer);

      // Initialize sidebar resizer after sidebar is loaded
      setTimeout(() => {
        if (window.SidebarResizer) {
          new SidebarResizer();
        }
      }, 50);
    }

    // Load footer
    const footerContainer = document.querySelector('[data-component="footer"]');
    if (footerContainer) {
      await this.loadComponent("footer", footerContainer);
    }

    // Load bottom navigation
    const bottomNavContainer = document.querySelector(
      '[data-component="bottom-nav"]'
    );
    if (bottomNavContainer) {
      await this.loadComponent("bottom-nav", bottomNavContainer);
    }

    // Set active nav link after components are loaded
    this.setActiveNavLink();

    // Setup authentication UI
    this.setupAuthUI();
  }

  static setupAuthUI() {
    // Wait a bit for components to load
    setTimeout(() => {
      if (typeof AuthChecker !== "undefined") {
        const logoutLink = document.querySelector(".logout-link");
        if (logoutLink) {
          if (AuthChecker.isAuthenticated()) {
            logoutLink.style.display = "block";
          } else {
            logoutLink.style.display = "none";
          }
        }
      }
    }, 100);
  }

  static setActiveNavLink() {
    // Remove any existing active classes
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => link.classList.remove("active"));

    // Get current page from URL
    const currentPath = window.location.pathname;
    let currentPage = "home";

    if (currentPath.includes("music")) currentPage = "music";
    else if (currentPath.includes("games")) currentPage = "games";
    else if (currentPath.includes("chat")) currentPage = "chat";
    else if (currentPath.includes("profile")) currentPage = "profile";
    else if (currentPath.includes("settings")) currentPage = "settings";

    // Set active class for sidebar
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }

    // Set active class for bottom navigation
    const bottomNavItems = document.querySelectorAll(".bottom-nav .nav-item");
    bottomNavItems.forEach((item) => item.classList.remove("active"));

    const activeBottomNavItem = document.querySelector(
      `.bottom-nav [data-nav="${currentPage}"]`
    );
    if (activeBottomNavItem) {
      activeBottomNavItem.classList.add("active");
    }
  }
}

// Initialize component loading when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ComponentLoader.loadComponents();
});
