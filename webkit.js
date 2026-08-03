// Ghost Theme - WebKit JS Handlers
(function() {
    // Keep JS lightweight and prevent infinite DOM mutation loops
    function initTheme() {
        // Any simple non-mutating helpers if needed
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
