// Translation System for Leon
class TranslationManager {
  constructor() {
    this.currentLanguage = "en";
    this.translations = {
      en: {
        // Navigation
        "nav.home": "Home",
        "nav.profile": "Profile",
        "nav.chat": "Chat",
        "nav.music": "Music",
        "nav.games": "Games",
        "nav.settings": "Settings",

        // Settings Page
        "settings.title": "Settings",
        "settings.appearance": "Appearance",
        "settings.appearance.desc":
          "Customize the visual appearance of the application",
        "settings.theme": "Theme",
        "settings.theme.desc": "Choose your preferred color scheme",
        "settings.theme.light": "Light",
        "settings.theme.dark": "Dark",
        "settings.theme.bluedark": "Dark Blue",
        "settings.theme.purplelight": "Light Purple",
        "settings.theme.greendark": "Dark Green",
        "settings.theme.orangelight": "Light Orange",
        "settings.theme.reddark": "Dark Red",
        "settings.theme.teallight": "Light Teal",
        "settings.theme.auto": "System (Coming Soon)",

        // Language & Region
        "settings.language": "Language & Region",
        "settings.language.desc": "Customize language and regional preferences",
        "settings.language.select": "Language",
        "settings.language.select.desc": "Choose your preferred language",
        "settings.dateformat": "Date Format",
        "settings.dateformat.desc": "Choose how dates are displayed",

        // Notifications
        "settings.notifications": "Notifications",
        "settings.notifications.desc": "Manage notification preferences",
        "settings.notifications.browser": "Browser Notifications",
        "settings.notifications.browser.desc":
          "Allow notifications from this website",
        "settings.notifications.sound": "Sound Notifications",
        "settings.notifications.sound.desc": "Play sound for notifications",
        "settings.notifications.chat": "Chat Notifications",
        "settings.notifications.chat.desc":
          "Notify when receiving new messages",

        // Privacy & Security
        "settings.privacy": "Privacy & Security",
        "settings.privacy.desc": "Manage your privacy and security settings",
        "settings.privacy.autosave": "Auto-save Chat History",
        "settings.privacy.autosave.desc":
          "Automatically save chat conversations",
        "settings.privacy.cleardata": "Clear All Data",
        "settings.privacy.cleardata.desc":
          "Remove all saved data and preferences",
        "settings.privacy.cleardata.btn": "Clear Data",

        // Accessibility
        "settings.accessibility": "Accessibility",
        "settings.accessibility.desc":
          "Improve accessibility and user experience",
        "settings.accessibility.fontsize": "Font Size",
        "settings.accessibility.fontsize.desc":
          "Adjust text size for better readability",
        "settings.accessibility.fontsize.small": "Small",
        "settings.accessibility.fontsize.medium": "Medium",
        "settings.accessibility.fontsize.large": "Large",
        "settings.accessibility.fontsize.extralarge": "Extra Large",
        "settings.accessibility.contrast": "High Contrast Mode",
        "settings.accessibility.contrast.desc":
          "Increase contrast for better visibility",
        "settings.accessibility.motion": "Reduce Motion",
        "settings.accessibility.motion.desc":
          "Minimize animations and transitions",

        // Advanced
        "settings.advanced": "Advanced",
        "settings.advanced.desc": "Advanced settings and developer options",
        "settings.advanced.developer": "Developer Mode",
        "settings.advanced.developer.desc":
          "Enable developer tools and debug information",
        "settings.advanced.autoupdate": "Auto-update",
        "settings.advanced.autoupdate.desc": "Automatically check for updates",
        "settings.advanced.reset": "Reset to Defaults",
        "settings.advanced.reset.desc":
          "Reset all settings to their default values",
        "settings.advanced.reset.btn": "Reset Settings",

        // Common
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.confirm": "Confirm",
        "common.yes": "Yes",
        "common.no": "No",
      },

      pt: {
        // Navigation
        "nav.home": "Início",
        "nav.profile": "Perfil",
        "nav.chat": "Chat",
        "nav.music": "Música",
        "nav.games": "Jogos",
        "nav.settings": "Configurações",

        // Settings Page
        "settings.title": "Configurações",
        "settings.appearance": "Aparência",
        "settings.appearance.desc":
          "Personalize a aparência visual da aplicação",
        "settings.theme": "Tema",
        "settings.theme.desc": "Escolha seu esquema de cores preferido",
        "settings.theme.light": "Claro",
        "settings.theme.dark": "Escuro",
        "settings.theme.bluedark": "Azul Escuro",
        "settings.theme.purplelight": "Roxo Claro",
        "settings.theme.greendark": "Verde Escuro",
        "settings.theme.orangelight": "Laranja Claro",
        "settings.theme.reddark": "Vermelho Escuro",
        "settings.theme.teallight": "Azul-Verde Claro",
        "settings.theme.auto": "Sistema (Em Breve)",

        // Language & Region
        "settings.language": "Idioma e Região",
        "settings.language.desc": "Personalize preferências de idioma e região",
        "settings.language.select": "Idioma",
        "settings.language.select.desc": "Escolha seu idioma preferido",
        "settings.dateformat": "Formato de Data",
        "settings.dateformat.desc": "Escolha como as datas são exibidas",

        // Notifications
        "settings.notifications": "Notificações",
        "settings.notifications.desc": "Gerencie preferências de notificação",
        "settings.notifications.browser": "Notificações do Navegador",
        "settings.notifications.browser.desc":
          "Permitir notificações deste site",
        "settings.notifications.sound": "Notificações Sonoras",
        "settings.notifications.sound.desc": "Reproduzir som para notificações",
        "settings.notifications.chat": "Notificações de Chat",
        "settings.notifications.chat.desc":
          "Notificar ao receber novas mensagens",

        // Privacy & Security
        "settings.privacy": "Privacidade e Segurança",
        "settings.privacy.desc":
          "Gerencie suas configurações de privacidade e segurança",
        "settings.privacy.autosave": "Salvar Histórico de Chat Automaticamente",
        "settings.privacy.autosave.desc":
          "Salvar conversas de chat automaticamente",
        "settings.privacy.cleardata": "Limpar Todos os Dados",
        "settings.privacy.cleardata.desc":
          "Remover todos os dados salvos e preferências",
        "settings.privacy.cleardata.btn": "Limpar Dados",

        // Accessibility
        "settings.accessibility": "Acessibilidade",
        "settings.accessibility.desc":
          "Melhorar acessibilidade e experiência do usuário",
        "settings.accessibility.fontsize": "Tamanho da Fonte",
        "settings.accessibility.fontsize.desc":
          "Ajustar tamanho do texto para melhor legibilidade",
        "settings.accessibility.fontsize.small": "Pequeno",
        "settings.accessibility.fontsize.medium": "Médio",
        "settings.accessibility.fontsize.large": "Grande",
        "settings.accessibility.fontsize.extralarge": "Extra Grande",
        "settings.accessibility.contrast": "Modo Alto Contraste",
        "settings.accessibility.contrast.desc":
          "Aumentar contraste para melhor visibilidade",
        "settings.accessibility.motion": "Reduzir Movimento",
        "settings.accessibility.motion.desc":
          "Minimizar animações e transições",

        // Advanced
        "settings.advanced": "Avançado",
        "settings.advanced.desc":
          "Configurações avançadas e opções de desenvolvedor",
        "settings.advanced.developer": "Modo Desenvolvedor",
        "settings.advanced.developer.desc":
          "Habilitar ferramentas de desenvolvedor e informações de debug",
        "settings.advanced.autoupdate": "Atualização Automática",
        "settings.advanced.autoupdate.desc":
          "Verificar atualizações automaticamente",
        "settings.advanced.reset": "Restaurar Padrões",
        "settings.advanced.reset.desc":
          "Restaurar todas as configurações para valores padrão",
        "settings.advanced.reset.btn": "Restaurar Configurações",

        // Common
        "common.save": "Salvar",
        "common.cancel": "Cancelar",
        "common.confirm": "Confirmar",
        "common.yes": "Sim",
        "common.no": "Não",
      },

      es: {
        // Navigation
        "nav.home": "Inicio",
        "nav.profile": "Perfil",
        "nav.chat": "Chat",
        "nav.music": "Música",
        "nav.games": "Juegos",
        "nav.settings": "Configuración",

        // Settings Page
        "settings.title": "Configuración",
        "settings.appearance": "Apariencia",
        "settings.appearance.desc":
          "Personaliza la apariencia visual de la aplicación",
        "settings.theme": "Tema",
        "settings.theme.desc": "Elige tu esquema de colores preferido",
        "settings.theme.light": "Claro",
        "settings.theme.dark": "Oscuro",
        "settings.theme.bluedark": "Azul Oscuro",
        "settings.theme.purplelight": "Púrpura Claro",
        "settings.theme.greendark": "Verde Oscuro",
        "settings.theme.orangelight": "Naranja Claro",
        "settings.theme.reddark": "Rojo Oscuro",
        "settings.theme.teallight": "Verde Azulado Claro",
        "settings.theme.auto": "Sistema (Próximamente)",

        // Language & Region
        "settings.language": "Idioma y Región",
        "settings.language.desc": "Personaliza preferencias de idioma y región",
        "settings.language.select": "Idioma",
        "settings.language.select.desc": "Elige tu idioma preferido",
        "settings.dateformat": "Formato de Fecha",
        "settings.dateformat.desc": "Elige cómo se muestran las fechas",

        // Notifications
        "settings.notifications": "Notificaciones",
        "settings.notifications.desc": "Gestiona preferencias de notificación",
        "settings.notifications.browser": "Notificaciones del Navegador",
        "settings.notifications.browser.desc":
          "Permitir notificaciones de este sitio web",
        "settings.notifications.sound": "Notificaciones de Sonido",
        "settings.notifications.sound.desc":
          "Reproducir sonido para notificaciones",
        "settings.notifications.chat": "Notificaciones de Chat",
        "settings.notifications.chat.desc":
          "Notificar al recibir nuevos mensajes",

        // Privacy & Security
        "settings.privacy": "Privacidad y Seguridad",
        "settings.privacy.desc":
          "Gestiona tu configuración de privacidad y seguridad",
        "settings.privacy.autosave":
          "Guardar Historial de Chat Automáticamente",
        "settings.privacy.autosave.desc":
          "Guardar conversaciones de chat automáticamente",
        "settings.privacy.cleardata": "Borrar Todos los Datos",
        "settings.privacy.cleardata.desc":
          "Eliminar todos los datos guardados y preferencias",
        "settings.privacy.cleardata.btn": "Borrar Datos",

        // Accessibility
        "settings.accessibility": "Accesibilidad",
        "settings.accessibility.desc":
          "Mejorar accesibilidad y experiencia del usuario",
        "settings.accessibility.fontsize": "Tamaño de Fuente",
        "settings.accessibility.fontsize.desc":
          "Ajustar tamaño del texto para mejor legibilidad",
        "settings.accessibility.fontsize.small": "Pequeño",
        "settings.accessibility.fontsize.medium": "Mediano",
        "settings.accessibility.fontsize.large": "Grande",
        "settings.accessibility.fontsize.extralarge": "Extra Grande",
        "settings.accessibility.contrast": "Modo Alto Contraste",
        "settings.accessibility.contrast.desc":
          "Aumentar contraste para mejor visibilidad",
        "settings.accessibility.motion": "Reducir Movimiento",
        "settings.accessibility.motion.desc":
          "Minimizar animaciones y transiciones",

        // Advanced
        "settings.advanced": "Avanzado",
        "settings.advanced.desc":
          "Configuraciones avanzadas y opciones de desarrollador",
        "settings.advanced.developer": "Modo Desarrollador",
        "settings.advanced.developer.desc":
          "Habilitar herramientas de desarrollador e información de depuración",
        "settings.advanced.autoupdate": "Actualización Automática",
        "settings.advanced.autoupdate.desc":
          "Verificar actualizaciones automáticamente",
        "settings.advanced.reset": "Restaurar Valores Predeterminados",
        "settings.advanced.reset.desc":
          "Restaurar todas las configuraciones a valores predeterminados",
        "settings.advanced.reset.btn": "Restaurar Configuración",

        // Common
        "common.save": "Guardar",
        "common.cancel": "Cancelar",
        "common.confirm": "Confirmar",
        "common.yes": "Sí",
        "common.no": "No",
      },
    };

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.currentLanguage = localStorage.getItem("language") || "en";
      this.updatePageTexts();
    });
  }

  setLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem("language", language);
    this.updatePageTexts();

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Dispatch custom event for other components
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language },
      })
    );
  }

  getText(key) {
    const text =
      this.translations[this.currentLanguage]?.[key] ||
      this.translations["en"][key] ||
      key;
    return text;
  }

  updatePageTexts() {
    // Update all elements with data-translate attribute
    const translatableElements = document.querySelectorAll("[data-translate]");
    translatableElements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      element.textContent = this.getText(key);
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll(
      "[data-translate-placeholder]"
    );
    placeholderElements.forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      element.placeholder = this.getText(key);
    });

    // Update titles
    const titleElements = document.querySelectorAll("[data-translate-title]");
    titleElements.forEach((element) => {
      const key = element.getAttribute("data-translate-title");
      element.title = this.getText(key);
    });
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Initialize translation manager
const translationManager = new TranslationManager();
