// Authentication Manager
class AuthManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormSwitching();
    this.setupPasswordToggle();
    this.setupPasswordStrength();
    this.setupFormSubmission();
    this.setupValidation();
  }

  // Form switching between login and register
  setupFormSwitching() {
    window.switchToLogin = () => {
      document.getElementById("registerForm").classList.remove("active");
      document.getElementById("loginForm").classList.add("active");
      document.title = "Leon - Login";
    };

    window.switchToRegister = () => {
      document.getElementById("loginForm").classList.remove("active");
      document.getElementById("registerForm").classList.add("active");
      document.title = "Leon - Register";
    };
  }

  // Password visibility toggle
  setupPasswordToggle() {
    // Login password toggle
    const toggleLoginPassword = document.getElementById("toggleLoginPassword");
    const loginPassword = document.getElementById("loginPassword");
    const loginPasswordIcon = document.getElementById("loginPasswordIcon");

    if (toggleLoginPassword) {
      toggleLoginPassword.addEventListener("click", () => {
        const type =
          loginPassword.getAttribute("type") === "password"
            ? "text"
            : "password";
        loginPassword.setAttribute("type", type);

        if (type === "text") {
          loginPasswordIcon.classList.remove("bi-eye");
          loginPasswordIcon.classList.add("bi-eye-slash");
        } else {
          loginPasswordIcon.classList.remove("bi-eye-slash");
          loginPasswordIcon.classList.add("bi-eye");
        }
      });
    }

    // Register password toggle
    const toggleRegisterPassword = document.getElementById(
      "toggleRegisterPassword"
    );
    const registerPassword = document.getElementById("registerPassword");
    const registerPasswordIcon = document.getElementById(
      "registerPasswordIcon"
    );

    if (toggleRegisterPassword) {
      toggleRegisterPassword.addEventListener("click", () => {
        const type =
          registerPassword.getAttribute("type") === "password"
            ? "text"
            : "password";
        registerPassword.setAttribute("type", type);

        if (type === "text") {
          registerPasswordIcon.classList.remove("bi-eye");
          registerPasswordIcon.classList.add("bi-eye-slash");
        } else {
          registerPasswordIcon.classList.remove("bi-eye-slash");
          registerPasswordIcon.classList.add("bi-eye");
        }
      });
    }

    // Confirm password toggle
    const toggleConfirmPassword = document.getElementById(
      "toggleConfirmPassword"
    );
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmPasswordIcon = document.getElementById("confirmPasswordIcon");

    if (toggleConfirmPassword) {
      toggleConfirmPassword.addEventListener("click", () => {
        const type =
          confirmPassword.getAttribute("type") === "password"
            ? "text"
            : "password";
        confirmPassword.setAttribute("type", type);

        if (type === "text") {
          confirmPasswordIcon.classList.remove("bi-eye");
          confirmPasswordIcon.classList.add("bi-eye-slash");
        } else {
          confirmPasswordIcon.classList.remove("bi-eye-slash");
          confirmPasswordIcon.classList.add("bi-eye");
        }
      });
    }
  }

  // Password strength indicator
  setupPasswordStrength() {
    const registerPassword = document.getElementById("registerPassword");
    const passwordStrength = document.getElementById("passwordStrength");

    if (registerPassword && passwordStrength) {
      registerPassword.addEventListener("input", () => {
        const password = registerPassword.value;
        const strength = this.calculatePasswordStrength(password);

        passwordStrength.className = "password-strength";

        if (password.length === 0) {
          passwordStrength.style.display = "none";
          return;
        }

        if (strength.score < 3) {
          passwordStrength.classList.add("weak");
          passwordStrength.textContent = `Weak password. ${strength.feedback}`;
        } else if (strength.score < 5) {
          passwordStrength.classList.add("medium");
          passwordStrength.textContent = `Medium password. ${strength.feedback}`;
        } else {
          passwordStrength.classList.add("strong");
          passwordStrength.textContent = "Strong password!";
        }

        passwordStrength.style.display = "block";
      });
    }
  }

  // Calculate password strength
  calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("Use at least 8 characters");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("Add lowercase letters");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Add uppercase letters");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("Add numbers");

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else feedback.push("Add special characters");

    return {
      score,
      feedback: feedback.length > 0 ? feedback.join(", ") : "",
    };
  }

  // Form validation
  setupValidation() {
    const confirmPassword = document.getElementById("confirmPassword");
    const registerPassword = document.getElementById("registerPassword");
    const registerUsername = document.getElementById("registerUsername");

    // Username validation
    if (registerUsername) {
      registerUsername.addEventListener("input", () => {
        const username = registerUsername.value;

        // Check for spaces
        if (username.includes(" ")) {
          registerUsername.setCustomValidity("Username cannot contain spaces");
          return;
        }

        // Check minimum length
        if (username.length > 0 && username.length < 3) {
          registerUsername.setCustomValidity(
            "Username must be at least 3 characters long"
          );
          return;
        }

        // Check for valid characters (alphanumeric and underscore only)
        if (username.length > 0 && !/^[a-zA-Z0-9_]+$/.test(username)) {
          registerUsername.setCustomValidity(
            "Username can only contain letters, numbers, and underscores"
          );
          return;
        }

        registerUsername.setCustomValidity("");
      });
    }

    // Password confirmation validation
    if (confirmPassword && registerPassword) {
      confirmPassword.addEventListener("input", () => {
        if (confirmPassword.value !== registerPassword.value) {
          confirmPassword.setCustomValidity("Passwords do not match");
        } else {
          confirmPassword.setCustomValidity("");
        }
      });

      registerPassword.addEventListener("input", () => {
        if (
          confirmPassword.value !== "" &&
          confirmPassword.value !== registerPassword.value
        ) {
          confirmPassword.setCustomValidity("Passwords do not match");
        } else {
          confirmPassword.setCustomValidity("");
        }
      });
    }
  }

  // Form submission
  setupFormSubmission() {
    // Login form
    const loginForm = document.getElementById("loginFormSubmit");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Register form
    const registerForm = document.getElementById("registerFormSubmit");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleRegister();
      });
    }
  }

  // Handle login
  async handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    try {
      // Simulate API call
      await this.simulateApiCall();

      // Store user data
      const userData = {
        email: email,
        name: email.split("@")[0], // Simple name from email
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("userData", JSON.stringify(userData));
      }

      // Show success message
      this.showMessage("Login successful! Redirecting...", "success");

      // Redirect after success
      setTimeout(() => {
        const redirectUrl =
          new URLSearchParams(window.location.search).get("redirect") ||
          "/profile";
        window.location.href = redirectUrl;
      }, 1500);
    } catch (error) {
      this.showMessage("Login failed. Please check your credentials.", "error");
    }
  }

  // Handle registration
  async handleRegister() {
    const name = document.getElementById("registerName").value;
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      // Simulate API call
      await this.simulateApiCall();

      // Store user data
      const userData = {
        name: name,
        username: username,
        email: email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      // Show success message
      this.showMessage(
        "Account created successfully! Redirecting...",
        "success"
      );

      // Redirect after success
      setTimeout(() => {
        const redirectUrl =
          new URLSearchParams(window.location.search).get("redirect") ||
          "/profile";
        window.location.href = redirectUrl;
      }, 1500);
    } catch (error) {
      this.showMessage("Registration failed. Please try again.", "error");
    }
  }

  // Simulate API call
  simulateApiCall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error("API Error"));
        }
      }, 1000);
    });
  }

  // Show message to user
  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".auth-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement("div");
    messageDiv.className = `auth-message alert alert-${
      type === "success" ? "success" : "danger"
    }`;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    messageDiv.textContent = message;

    // Add animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }
}

// Authentication Check Utility
class AuthChecker {
  static isAuthenticated() {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (!userData) return false;

    try {
      const user = JSON.parse(userData);
      return user.isAuthenticated === true;
    } catch {
      return false;
    }
  }

  static getUserData() {
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  static logout() {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    window.location.href = "/pages/auth/login.html";
  }

  static requireAuth(redirectUrl = null) {
    if (!this.isAuthenticated()) {
      const currentUrl = redirectUrl || window.location.pathname;
      window.location.href = `/pages/auth/login.html?redirect=${encodeURIComponent(
        currentUrl
      )}`;
      return false;
    }
    return true;
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new AuthManager();
});

// Export for global use
window.AuthChecker = AuthChecker;
