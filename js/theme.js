// Theme Management System
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    // Initialize theme on page load
    document.addEventListener("DOMContentLoaded", () => {
      const savedTheme = this.getTheme();
      this.setTheme(savedTheme);
      this.initializeThemeSelector();
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update select value if exists
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }

  getTheme() {
    return localStorage.getItem("theme") || "light";
  }

  initializeThemeSelector() {
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
        const selectedTheme = e.target.value;
        this.setTheme(selectedTheme);
      });
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();
