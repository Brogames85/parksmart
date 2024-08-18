
// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
});

// Initialize dark mode based on localStorage or default
window.addEventListener('load', function() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', darkMode);
    document.getElementById('toggleDarkMode').checked = darkMode;
});

// Save dark mode preference
document.getElementById('toggleDarkMode').addEventListener('change', function() {
    localStorage.setItem('darkMode', this.checked);
});
