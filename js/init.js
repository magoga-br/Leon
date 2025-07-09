// App initialization system
class AppInitializer {
  static init() {
    // Apply saved sidebar width immediately to prevent flash
    const savedWidth = localStorage.getItem("sidebar-width");
    if (savedWidth) {
      const width = parseInt(savedWidth);
      document.documentElement.style.setProperty(
        "--sidebar-width",
        width + "px"
      );

      if (width <= 140) {
        document.documentElement.classList.add("sidebar-collapsed");
      }
    }

    // Apply saved theme immediately to prevent flash
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    // Mark as components loaded after initialization
    document.documentElement.classList.add("components-loaded");
  }
}

// Initialize immediately when script loads
AppInitializer.init();
