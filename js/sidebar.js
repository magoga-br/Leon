// Sidebar resize functionality
class SidebarResizer {
  constructor() {
    this.sidebar = document.querySelector(".sidebar");
    this.mainContent = document.querySelector(".main-content");
    this.footer = document.querySelector(".footer");
    this.isResizing = false;
    this.minWidth = 80;
    this.maxWidth = 350;
    this.collapsedThreshold = 140;

    this.init();
  }

  init() {
    if (!this.sidebar || !this.mainContent) return;

    // Sync with any pre-applied width from inline script
    const currentWidth = getComputedStyle(document.documentElement)
      .getPropertyValue("--sidebar-width")
      .replace("px", "");

    if (currentWidth && currentWidth !== "240") {
      // Width was already applied by inline script, just sync the classes
      this.setSidebarWidth(parseInt(currentWidth));
    } else {
      // Load saved width from localStorage as fallback
      const savedWidth = localStorage.getItem("sidebar-width");
      if (savedWidth) {
        this.setSidebarWidth(parseInt(savedWidth));
      } else {
        // Se não há largura salva, use a largura padrão
        this.setSidebarWidth(240);
      }
    }

    this.addEventListeners();
  }

  addEventListeners() {
    // Mouse events for resizing
    this.sidebar.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    // Prevent text selection during resize
    document.addEventListener("selectstart", this.preventSelection.bind(this));
  }

  handleMouseDown(e) {
    const rect = this.sidebar.getBoundingClientRect();
    const isNearRightEdge =
      e.clientX >= rect.right - 10 && e.clientX <= rect.right + 10;

    if (isNearRightEdge) {
      this.isResizing = true;
      this.sidebar.classList.add("resizing");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    }
  }

  handleMouseMove(e) {
    if (!this.isResizing) {
      // Show resize cursor when hovering near edge
      const rect = this.sidebar.getBoundingClientRect();
      const isNearRightEdge =
        e.clientX >= rect.right - 10 && e.clientX <= rect.right + 10;
      document.body.style.cursor = isNearRightEdge ? "col-resize" : "";
      return;
    }

    const newWidth = Math.max(
      this.minWidth,
      Math.min(this.maxWidth, e.clientX)
    );
    this.setSidebarWidth(newWidth);
    e.preventDefault();
  }

  handleMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      this.sidebar.classList.remove("resizing");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";

      // Save width to localStorage
      const currentWidth = parseInt(this.sidebar.style.width) || 240;
      localStorage.setItem("sidebar-width", currentWidth.toString());
    }
  }

  setSidebarWidth(width) {
    const clampedWidth = Math.max(
      this.minWidth,
      Math.min(this.maxWidth, width)
    );

    // Update CSS custom property
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${clampedWidth}px`
    );

    // Add/remove collapsed class based on width
    if (clampedWidth <= this.collapsedThreshold) {
      this.sidebar.classList.add("collapsed");
      document.documentElement.classList.add("sidebar-collapsed");
    } else {
      this.sidebar.classList.remove("collapsed");
      document.documentElement.classList.remove("sidebar-collapsed");
    }

    // Remove inline styles to let CSS variables work properly
    this.mainContent.style.marginLeft = "";
    if (this.footer) {
      this.footer.style.marginLeft = "";
    }
  }

  updateFooterMargin() {
    // Remove this method as we're using CSS variables instead of inline styles
  }

  preventSelection(e) {
    if (this.isResizing) {
      e.preventDefault();
    }
  }
}

// Expose SidebarResizer globally
window.SidebarResizer = SidebarResizer;

// Initialize sidebar resizer when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for components to be loaded before initializing sidebar
  const initSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      new SidebarResizer();
    } else {
      // If sidebar not found, wait a bit and try again
      setTimeout(initSidebar, 100);
    }
  };

  // Try to initialize immediately, but with fallback
  setTimeout(initSidebar, 100);
});

// Also apply immediately if DOM is already loaded
if (document.readyState === "loading") {
  // DOM is still loading
  document.addEventListener("DOMContentLoaded", function () {
    const initSidebar = () => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        new SidebarResizer();
      } else {
        setTimeout(initSidebar, 100);
      }
    };
    setTimeout(initSidebar, 100);
  });
} else {
  // DOM is already loaded
  const initSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      new SidebarResizer();
    } else {
      setTimeout(initSidebar, 100);
    }
  };
  setTimeout(initSidebar, 100);
}

// Guarantee width persistence on page navigation
window.addEventListener("beforeunload", function () {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    const currentWidth = getComputedStyle(document.documentElement)
      .getPropertyValue("--sidebar-width")
      .replace("px", "");
    if (currentWidth && currentWidth !== "240") {
      localStorage.setItem("sidebar-width", currentWidth);
    }
  }
});

// Apply width on page show (for back/forward navigation)
window.addEventListener("pageshow", function () {
  const savedWidth = localStorage.getItem("sidebar-width");
  if (savedWidth) {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${savedWidth}px`
    );
  }
});
