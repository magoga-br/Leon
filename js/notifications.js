// Notification System for Leon
class NotificationManager {
  constructor() {
    this.settings = {
      browserNotifications: false,
      soundNotifications: true,
      chatNotifications: true,
    };

    this.sounds = {
      notification: "/assets/sounds/notification.mp3",
      message: "/assets/sounds/message.mp3",
      alert: "/assets/sounds/alert.mp3",
    };

    this.init();
  }

  init() {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("leonNotificationSettings");
    if (savedSettings) {
      try {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
      } catch (error) {
        console.error("Error loading notification settings:", error);
      }
    }

    // Request permission if browser notifications are enabled
    if (this.settings.browserNotifications) {
      this.requestPermission();
    }

    // Listen for settings changes
    window.addEventListener("settingsChanged", (event) => {
      if (event.detail.type === "notifications") {
        this.updateSettings(event.detail.settings);
      }
    });
  }

  async requestPermission() {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
      }
      return Notification.permission === "granted";
    }
    return false;
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(
      "leonNotificationSettings",
      JSON.stringify(this.settings)
    );
  }

  // Show browser notification
  async showNotification(title, options = {}) {
    if (!this.settings.browserNotifications) return;

    const hasPermission = await this.requestPermission();
    if (!hasPermission) return;

    const defaultOptions = {
      icon: "/assets/images/leon-icon.png",
      badge: "/assets/images/leon-badge.png",
      requireInteraction: false,
      silent: !this.settings.soundNotifications,
      tag: "leon-notification",
    };

    const notificationOptions = { ...defaultOptions, ...options };

    try {
      const notification = new Notification(title, notificationOptions);

      // Auto close after 5 seconds if not requiring interaction
      if (!notificationOptions.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      return notification;
    } catch (error) {
      console.error("Error showing notification:", error);
      // Fallback to in-app notification
      this.showInAppNotification(title, options.body, "info");
    }
  }

  // Show in-app notification (toast)
  showInAppNotification(title, message = "", type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification-toast alert alert-${this.getAlertType(
      type
    )}`;

    const iconClass = this.getIconClass(type);

    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi ${iconClass} me-2"></i>
        <div class="flex-grow-1">
          <strong>${title}</strong>
          ${message ? `<br><small>${message}</small>` : ""}
        </div>
        <button type="button" class="btn-close btn-close-white ms-2" aria-label="Close"></button>
      </div>
    `;

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: "10000",
      minWidth: "300px",
      maxWidth: "400px",
      opacity: "0",
      transform: "translateX(100%)",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      borderRadius: "8px",
    });

    document.body.appendChild(notification);

    // Handle close button
    const closeBtn = notification.querySelector(".btn-close");
    closeBtn.addEventListener("click", () => {
      this.hideNotification(notification);
    });

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    });

    // Play sound if enabled
    if (this.settings.soundNotifications) {
      this.playSound(type);
    }

    // Auto hide after 5 seconds
    setTimeout(() => {
      this.hideNotification(notification);
    }, 5000);

    return notification;
  }

  hideNotification(notification) {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  getAlertType(type) {
    const types = {
      success: "success",
      error: "danger",
      warning: "warning",
      info: "info",
    };
    return types[type] || "info";
  }

  getIconClass(type) {
    const icons = {
      success: "bi-check-circle-fill",
      error: "bi-exclamation-triangle-fill",
      warning: "bi-exclamation-triangle-fill",
      info: "bi-info-circle-fill",
    };
    return icons[type] || "bi-info-circle-fill";
  }

  // Play notification sound
  playSound(type = "notification") {
    if (!this.settings.soundNotifications) return;

    try {
      const soundFile = this.sounds[type] || this.sounds.notification;
      const audio = new Audio(soundFile);
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.warn("Could not play notification sound:", error);
      });
    } catch (error) {
      console.warn("Error playing sound:", error);
    }
  }

  // Chat notification
  showChatNotification(sender, message) {
    if (!this.settings.chatNotifications) return;

    const title = `New message from ${sender}`;
    const options = {
      body: message.length > 100 ? message.substring(0, 100) + "..." : message,
      icon: "/assets/images/chat-icon.png",
      tag: "chat-notification",
      data: { type: "chat", sender },
    };

    this.showNotification(title, options);
  }

  // System notification (for settings changes, etc.)
  showSystemNotification(message, type = "info") {
    const title = "Leon System";
    const options = {
      body: message,
      icon: "/assets/images/system-icon.png",
      tag: "system-notification",
      data: { type: "system" },
    };

    // For system notifications, prefer in-app notifications
    this.showInAppNotification(title, message, type);
  }

  // Update notification (for app updates)
  showUpdateNotification() {
    const title = "Update Available";
    const message = "A new version of Leon is available. Click to refresh.";

    const options = {
      body: message,
      requireInteraction: true,
      actions: [
        { action: "update", title: "Update Now" },
        { action: "dismiss", title: "Later" },
      ],
      tag: "update-notification",
      data: { type: "update" },
    };

    const notification = this.showNotification(title, options);

    if (notification) {
      notification.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }

  // Clear all notifications
  clearAll() {
    // Clear browser notifications
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CLEAR_NOTIFICATIONS",
      });
    }

    // Clear in-app notifications
    const toasts = document.querySelectorAll(".notification-toast");
    toasts.forEach((toast) => {
      this.hideNotification(toast);
    });
  }

  // Get notification permission status
  getPermissionStatus() {
    if ("Notification" in window) {
      return Notification.permission;
    }
    return "not-supported";
  }

  // Check if notifications are supported
  isSupported() {
    return "Notification" in window;
  }
}

// Initialize notification manager
const notificationManager = new NotificationManager();

// Make it globally available
window.notificationManager = notificationManager;
