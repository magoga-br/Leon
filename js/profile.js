// Profile Page Scripts
document.addEventListener("DOMContentLoaded", function () {
  // Photo upload preview
  const photoUpload = document.getElementById("photo-upload");
  const profileImage = document.getElementById("profile-image");

  if (photoUpload && profileImage) {
    photoUpload.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Toggle Password Visibility functions
  function togglePasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(iconId);

    if (passwordInput && passwordIcon) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.className = "bi bi-eye-slash";
      } else {
        passwordInput.type = "password";
        passwordIcon.className = "bi bi-eye";
      }
    }
  }

  // Toggle Password Visibility - Current Password
  const toggleCurrentPassword = document.getElementById(
    "toggleCurrentPassword"
  );
  if (toggleCurrentPassword) {
    toggleCurrentPassword.addEventListener("click", function () {
      togglePasswordVisibility("inputCurrentPassword", "currentPasswordIcon");
    });
  }

  // Toggle Password Visibility - New Password
  const toggleNewPassword = document.getElementById("toggleNewPassword");
  if (toggleNewPassword) {
    toggleNewPassword.addEventListener("click", function () {
      togglePasswordVisibility("inputNewPassword", "newPasswordIcon");
    });
  }

  // Toggle Confirm Password Visibility
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener("click", function () {
      togglePasswordVisibility("inputConfirmPassword", "confirmPasswordIcon");
    });
  }

  // Password strength checker
  const newPasswordInput = document.getElementById("inputNewPassword");
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", function (e) {
      checkPasswordStrength(e.target.value);
    });
  }

  // Password confirmation checker
  const confirmPasswordInput = document.getElementById("inputConfirmPassword");
  if (confirmPasswordInput && newPasswordInput) {
    confirmPasswordInput.addEventListener("input", function (e) {
      checkPasswordMatch(newPasswordInput.value, e.target.value);
    });
  }

  function checkPasswordStrength(password) {
    // This is a simple password strength checker
    const strengthIndicator = document.getElementById("passwordStrength");
    if (!strengthIndicator) return;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthClasses = [
      "password-strength-weak",
      "password-strength-medium",
      "password-strength-strong",
    ];
    strengthIndicator.className = "password-strength";

    if (strength < 3) {
      strengthIndicator.classList.add("password-strength-weak");
      strengthIndicator.textContent = "Weak password";
    } else if (strength < 5) {
      strengthIndicator.classList.add("password-strength-medium");
      strengthIndicator.textContent = "Medium password";
    } else {
      strengthIndicator.classList.add("password-strength-strong");
      strengthIndicator.textContent = "Strong password";
    }
  }

  function checkPasswordMatch(password, confirmPassword) {
    const matchIndicator = document.getElementById("passwordMatch");
    if (!matchIndicator) return;

    if (confirmPassword === "") {
      matchIndicator.textContent = "";
      return;
    }

    if (password === confirmPassword) {
      matchIndicator.className = "password-strength password-strength-strong";
      matchIndicator.textContent = "Passwords match";
    } else {
      matchIndicator.className = "password-strength password-strength-weak";
      matchIndicator.textContent = "Passwords do not match";
    }
  }
});
