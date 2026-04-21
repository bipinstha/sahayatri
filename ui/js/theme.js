// Theme Management System for Sahayatri

class ThemeManager {
    constructor() {
        this.STORAGE_KEY = 'sahayatri-theme';
        this.LIGHT_MODE = 'light';
        this.DARK_MODE = 'dark';
        this.init();
    }

    init() {
        // Update button icons based on current theme
        this.updateThemeButtons();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? this.DARK_MODE : this.LIGHT_MODE);
            }
        });
    }

    setTheme(theme) {
        const html = document.documentElement;
        
        if (theme === this.DARK_MODE) {
            html.classList.add('dark');
            localStorage.setItem(this.STORAGE_KEY, this.DARK_MODE);
        } else {
            html.classList.remove('dark');
            localStorage.setItem(this.STORAGE_KEY, this.LIGHT_MODE);
        }

        // Update theme toggle buttons
        this.updateThemeButtons();
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? this.LIGHT_MODE : this.DARK_MODE);
    }

    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? this.DARK_MODE : this.LIGHT_MODE;
    }

    updateThemeButtons() {
        const isDark = this.getCurrentTheme() === this.DARK_MODE;
        const buttons = document.querySelectorAll('[data-theme-toggle]');
        
        buttons.forEach(btn => {
            if (isDark) {
                btn.innerHTML = '☀️'; // Sun icon for light mode
                btn.setAttribute('aria-label', 'Switch to Light Mode');
                btn.title = 'Light Mode';
            } else {
                btn.innerHTML = '🌙'; // Moon icon for dark mode
                btn.setAttribute('aria-label', 'Switch to Dark Mode');
                btn.title = 'Dark Mode';
            }
        });
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}
