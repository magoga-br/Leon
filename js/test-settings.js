// Leon Settings Test Script
// Este script pode ser executado no console do navegador para testar as configurações

console.log("🔧 Leon Settings Test Suite");
console.log("==========================");

// Test 1: Check if all managers are loaded
function testManagersLoaded() {
  console.log("\n📋 Test 1: Checking if all managers are loaded...");

  const managers = [
    { name: "settingsManager", obj: window.settingsManager },
    { name: "translationManager", obj: window.translationManager },
    { name: "notificationManager", obj: window.notificationManager },
    { name: "themeManager", obj: window.themeManager },
  ];

  managers.forEach((manager) => {
    if (manager.obj) {
      console.log(`✅ ${manager.name} loaded successfully`);
    } else {
      console.log(`❌ ${manager.name} not found`);
    }
  });
}

// Test 2: Test settings functionality
function testSettings() {
  console.log("\n⚙️ Test 2: Testing settings functionality...");

  if (window.settingsManager) {
    try {
      const currentSettings = settingsManager.getSettings();
      console.log("✅ Settings retrieved:", currentSettings);

      // Test setting update
      const originalTheme = settingsManager.getSetting("theme");
      settingsManager.updateSetting("theme", "dark");

      const newTheme = settingsManager.getSetting("theme");
      console.log(`✅ Theme update test: ${originalTheme} → ${newTheme}`);

      // Restore original theme
      settingsManager.updateSetting("theme", originalTheme);
    } catch (error) {
      console.log("❌ Settings test failed:", error);
    }
  } else {
    console.log("❌ SettingsManager not available");
  }
}

// Test 3: Test translations
function testTranslations() {
  console.log("\n🌍 Test 3: Testing translations...");

  if (window.translationManager) {
    try {
      const currentLang = translationManager.getCurrentLanguage();
      console.log("✅ Current language:", currentLang);

      const testKey = "settings.title";
      const translation = translationManager.getText(testKey);
      console.log(`✅ Translation test (${testKey}):`, translation);

      // Test language change
      const languages = ["en", "pt", "es"];
      languages.forEach((lang) => {
        translationManager.setLanguage(lang);
        const text = translationManager.getText(testKey);
        console.log(`✅ ${lang}: ${text}`);
      });

      // Restore original language
      translationManager.setLanguage(currentLang);
    } catch (error) {
      console.log("❌ Translation test failed:", error);
    }
  } else {
    console.log("❌ TranslationManager not available");
  }
}

// Test 4: Test notifications
function testNotifications() {
  console.log("\n🔔 Test 4: Testing notifications...");

  if (window.notificationManager) {
    try {
      console.log("✅ NotificationManager available");
      console.log(
        "Permission status:",
        notificationManager.getPermissionStatus()
      );
      console.log("Browser support:", notificationManager.isSupported());

      // Test in-app notification
      notificationManager.showInAppNotification(
        "Test Notification",
        "This is a test of the notification system",
        "info"
      );
      console.log("✅ In-app notification test sent");
    } catch (error) {
      console.log("❌ Notification test failed:", error);
    }
  } else {
    console.log("❌ NotificationManager not available");
  }
}

// Test 5: Test theme system
function testThemes() {
  console.log("\n🎨 Test 5: Testing theme system...");

  if (window.themeManager) {
    try {
      const currentTheme = themeManager.getTheme();
      console.log("✅ Current theme:", currentTheme);

      // Test theme change - including new neutral themes
      const themes = [
        "light",
        "dark",
        "blue-dark",
        "purple-light",
        "green-dark",
        "orange-light",
        "red-dark",
        "teal-light",
      ];
      themes.forEach((theme) => {
        themeManager.setTheme(theme);
        console.log(`✅ Theme set to: ${theme}`);

        // Verify neutral themes don't have purple colors
        if (theme === "light" || theme === "dark") {
          const accentColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent-color")
            .trim();
          if (
            accentColor.includes("#555555") ||
            accentColor.includes("#888888")
          ) {
            console.log(`✅ ${theme} theme is properly neutral`);
          } else {
            console.log(
              `⚠️ ${theme} theme might not be neutral: ${accentColor}`
            );
          }
        }
      });

      // Restore original theme
      themeManager.setTheme(currentTheme);
    } catch (error) {
      console.log("❌ Theme test failed:", error);
    }
  } else {
    console.log("❌ ThemeManager not available");
  }
}

// Test 6: Test local storage
function testLocalStorage() {
  console.log("\n💾 Test 6: Testing local storage...");

  try {
    const testKey = "leonTest";
    const testValue = { test: true, timestamp: Date.now() };

    localStorage.setItem(testKey, JSON.stringify(testValue));
    const retrieved = JSON.parse(localStorage.getItem(testKey));

    if (retrieved && retrieved.test === true) {
      console.log("✅ LocalStorage read/write test passed");
      localStorage.removeItem(testKey);
    } else {
      console.log("❌ LocalStorage test failed");
    }

    // Check for existing Leon data
    const leonKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("leon")
    );
    console.log("✅ Leon localStorage keys found:", leonKeys);
  } catch (error) {
    console.log("❌ LocalStorage test failed:", error);
  }
}

// Run all tests
function runAllTests() {
  testManagersLoaded();
  testSettings();
  testTranslations();
  testNotifications();
  testThemes();
  testLocalStorage();

  console.log("\n🎉 All tests completed!");
  console.log("Check the results above for any issues.");
}

// Auto-run tests if this script is executed directly
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(runAllTests, 1000); // Wait 1 second for all scripts to load
    });
  } else {
    setTimeout(runAllTests, 1000);
  }
}

// Export for manual execution
window.leonTests = {
  runAllTests,
  testManagersLoaded,
  testSettings,
  testTranslations,
  testNotifications,
  testThemes,
  testLocalStorage,
};

console.log("\n📝 Manual testing available via:");
console.log("window.leonTests.runAllTests() - Run all tests");
console.log("window.leonTests.testSettings() - Test settings only");
console.log("etc...");
