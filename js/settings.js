// Settings Management System
class SettingsManager {
  constructor() {
    this.defaultSettings = {
      theme: "light",
      language: "en",
      dateFormat: "dd/mm/yyyy",
      browserNotifications: false,
      soundNotifications: true,
      chatNotifications: true,
      autoSaveChat: true,
      fontSize: "medium",
      highContrastMode: false,
      reduceMotion: false,
      developerMode: false,
      autoUpdate: true,
    };

    this.settings = { ...this.defaultSettings };
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadSettings();
      this.initializeControls();
      this.bindEvents();
      console.log("Settings page loaded");
    });
  }

  loadSettings() {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("leonSettings");
    if (savedSettings) {
      try {
        this.settings = {
          ...this.defaultSettings,
          ...JSON.parse(savedSettings),
        };
      } catch (error) {
        console.error("Error loading settings:", error);
        this.settings = { ...this.defaultSettings };
      }
    }

    this.applySettings();
  }

  saveSettings() {
    localStorage.setItem("leonSettings", JSON.stringify(this.settings));
    this.applySettings();
  }

  applySettings() {
    // Apply theme
    if (window.themeManager) {
      window.themeManager.setTheme(this.settings.theme);
    }

    // Apply language
    if (window.translationManager) {
      window.translationManager.setLanguage(this.settings.language);
    }

    // Apply font size
    this.applyFontSize(this.settings.fontSize);

    // Apply high contrast
    this.applyHighContrast(this.settings.highContrastMode);

    // Apply reduced motion
    this.applyReducedMotion(this.settings.reduceMotion);

    // Apply developer mode
    this.applyDeveloperMode(this.settings.developerMode);

    // Request notification permission if enabled
    if (this.settings.browserNotifications && "Notification" in window) {
      this.requestNotificationPermission();
    }
  }

  initializeControls() {
    // Set all control values based on current settings
    const controls = {
      themeSelect: this.settings.theme,
      languageSelect: this.settings.language,
      dateFormatSelect: this.settings.dateFormat,
      fontSizeSelect: this.settings.fontSize,
      browserNotifications: this.settings.browserNotifications,
      soundNotifications: this.settings.soundNotifications,
      chatNotifications: this.settings.chatNotifications,
      autoSaveChat: this.settings.autoSaveChat,
      highContrastMode: this.settings.highContrastMode,
      reduceMotion: this.settings.reduceMotion,
      developerMode: this.settings.developerMode,
      autoUpdate: this.settings.autoUpdate,
    };

    Object.entries(controls).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        if (element.type === "checkbox") {
          element.checked = value;
        } else {
          element.value = value;
        }
      }
    });
  }

  bindEvents() {
    // Theme selector
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
        this.updateSetting("theme", e.target.value);
      });
    }

    // Language selector
    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) {
      languageSelect.addEventListener("change", (e) => {
        this.updateSetting("language", e.target.value);
      });
    }

    // Date format selector
    const dateFormatSelect = document.getElementById("dateFormatSelect");
    if (dateFormatSelect) {
      dateFormatSelect.addEventListener("change", (e) => {
        this.updateSetting("dateFormat", e.target.value);
      });
    }

    // Font size selector
    const fontSizeSelect = document.getElementById("fontSizeSelect");
    if (fontSizeSelect) {
      fontSizeSelect.addEventListener("change", (e) => {
        this.updateSetting("fontSize", e.target.value);
      });
    }

    // Notification toggles
    const notificationToggles = [
      "browserNotifications",
      "soundNotifications",
      "chatNotifications",
    ];

    notificationToggles.forEach((id) => {
      const toggle = document.getElementById(id);
      if (toggle) {
        toggle.addEventListener("change", (e) => {
          this.updateSetting(id, e.target.checked);
        });
      }
    });

    // Privacy toggles
    const autoSaveChat = document.getElementById("autoSaveChat");
    if (autoSaveChat) {
      autoSaveChat.addEventListener("change", (e) => {
        this.updateSetting("autoSaveChat", e.target.checked);
      });
    }

    // Accessibility toggles
    const accessibilityToggles = ["highContrastMode", "reduceMotion"];

    accessibilityToggles.forEach((id) => {
      const toggle = document.getElementById(id);
      if (toggle) {
        toggle.addEventListener("change", (e) => {
          this.updateSetting(id, e.target.checked);
        });
      }
    });

    // Advanced toggles
    const advancedToggles = ["developerMode", "autoUpdate"];

    advancedToggles.forEach((id) => {
      const toggle = document.getElementById(id);
      if (toggle) {
        toggle.addEventListener("change", (e) => {
          this.updateSetting(id, e.target.checked);
        });
      }
    });

    // Clear data button
    const clearDataBtn = document.getElementById("clearDataBtn");
    if (clearDataBtn) {
      clearDataBtn.addEventListener("click", () => {
        this.clearAllData();
      });
    }

    // Reset settings button
    const resetSettingsBtn = document.getElementById("resetSettingsBtn");
    if (resetSettingsBtn) {
      resetSettingsBtn.addEventListener("click", () => {
        this.resetToDefaults();
      });
    }
  }

  updateSetting(key, value) {
    this.settings[key] = value;
    this.saveSettings();

    // Show success feedback
    this.showNotification(`Setting updated: ${key}`, "success");
  }

  applyFontSize(size) {
    const sizeMap = {
      small: "0.875rem",
      medium: "1rem",
      large: "1.125rem",
      "extra-large": "1.25rem",
    };

    document.documentElement.style.setProperty(
      "--base-font-size",
      sizeMap[size] || sizeMap.medium
    );
    document.body.setAttribute("data-font-size", size);
  }

  applyHighContrast(enabled) {
    document.body.setAttribute("data-high-contrast", enabled);
  }

  applyReducedMotion(enabled) {
    document.body.setAttribute("data-reduced-motion", enabled);

    if (enabled) {
      document.documentElement.style.setProperty("--transition", "none");
      document.documentElement.style.setProperty("--animation-duration", "0s");
    } else {
      document.documentElement.style.removeProperty("--transition");
      document.documentElement.style.removeProperty("--animation-duration");
    }
  }

  applyDeveloperMode(enabled) {
    document.body.setAttribute("data-developer-mode", enabled);

    if (enabled) {
      console.log("Developer mode enabled");
      // Add developer tools or debug information
      this.addDeveloperTools();
    } else {
      this.removeDeveloperTools();
    }
  }

  addDeveloperTools() {
    // Add a developer info panel
    if (!document.getElementById("dev-info")) {
      const devInfo = document.createElement("div");
      devInfo.id = "dev-info";
      devInfo.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        max-width: 300px;
      `;
      devInfo.innerHTML = `
        <strong>Leon Dev Mode</strong><br>
        Version: 1.0.0<br>
        Theme: ${this.settings.theme}<br>
        Language: ${this.settings.language}<br>
        Performance: ${performance.now().toFixed(2)}ms
      `;
      document.body.appendChild(devInfo);
    }
  }

  removeDeveloperTools() {
    const devInfo = document.getElementById("dev-info");
    if (devInfo) {
      devInfo.remove();
    }
  }

  async requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          this.updateSetting("browserNotifications", false);
          this.showNotification("Notification permission denied", "warning");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }
  }

  clearAllData() {
    const confirmed = confirm(
      "Are you sure you want to clear all data? This action cannot be undone."
    );

    if (confirmed) {
      // Clear all localStorage data
      localStorage.clear();

      // Reset settings to defaults
      this.settings = { ...this.defaultSettings };
      this.saveSettings();
      this.initializeControls();

      this.showNotification("All data cleared successfully", "success");

      // Reload page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  resetToDefaults() {
    const confirmed = confirm(
      "Are you sure you want to reset all settings to their default values?"
    );

    if (confirmed) {
      this.settings = { ...this.defaultSettings };
      this.saveSettings();
      this.initializeControls();

      this.showNotification("Settings reset to defaults", "success");
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert-${
      type === "success" ? "success" : type === "warning" ? "warning" : "info"
    } notification-toast`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Export settings
  exportSettings() {
    const data = {
      version: "1.0.0",
      exported: new Date().toISOString(),
      settings: this.settings,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leon-settings.json";
    a.click();

    URL.revokeObjectURL(url);
    this.showNotification("Settings exported successfully", "success");
  }

  // Import settings
  importSettings(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.settings) {
          this.settings = { ...this.defaultSettings, ...data.settings };
          this.saveSettings();
          this.initializeControls();
          this.showNotification("Settings imported successfully", "success");
        } else {
          throw new Error("Invalid settings file");
        }
      } catch (error) {
        console.error("Error importing settings:", error);
        this.showNotification("Error importing settings file", "warning");
      }
    };
    reader.readAsText(file);
  }

  // Get formatted date based on user preference
  formatDate(date) {
    const formats = {
      "dd/mm/yyyy": { day: "2-digit", month: "2-digit", year: "numeric" },
      "mm/dd/yyyy": { month: "2-digit", day: "2-digit", year: "numeric" },
      "yyyy-mm-dd": { year: "numeric", month: "2-digit", day: "2-digit" },
    };

    const format = formats[this.settings.dateFormat] || formats["dd/mm/yyyy"];
    return new Intl.DateTimeFormat(this.settings.language, format).format(date);
  }

  // Public method to get current settings
  getSettings() {
    return { ...this.settings };
  }

  // Public method to get a specific setting
  getSetting(key) {
    return this.settings[key];
  }
}

// Initialize settings manager
const settingsManager = new SettingsManager();

// Make it globally available
window.settingsManager = settingsManager;
