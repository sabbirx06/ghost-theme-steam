// Ghost Theme - Library DOM helpers
(() => {
    const selectors = {
        sidebarFilters: '._3x1HklzyDs4TEjACrRO2tB ._1ZS_xta5HMXzR8JgxDH6n7',
        bottomControls: '._3vCzSrrXZzZjVJFZNg9SGu',
        bottomBar: '._1_yS5UP7el0aN4vntx3dx',
    };

    function markWalletBalance() {
        for (const node of document.querySelectorAll('body *')) {
            if (node.children.length || node.classList.contains('ghost-wallet-balance')) continue;
            const text = node.textContent.trim();
            if (/\b\d[\d,]*(?:\.\d{2})?\s*\(\s*[\d,]+\s+pending\s*\)/i.test(text)) {
                node.classList.add('ghost-wallet-balance');
            }
        }
    }

    function createSidebarShortcuts() {
        const sidebarFilters = document.querySelector('._3x1HklzyDs4TEjACrRO2tB ._1ZS_xta5HMXzR8JgxDH6n7') ||
                               document.querySelector('._1ZS_xta5HMXzR8JgxDH6n7');
        if (!sidebarFilters) return;

        // Clean up old separate container if present
        const oldRow = document.querySelector('.ghost-sidebar-actions');
        if (oldRow) oldRow.remove();

        // Target the inner 3-icon container so all 6 icons become direct siblings in Row 1
        const iconRow = sidebarFilters.querySelector('._1PgAonvorr0o_NMxNKiDFU') ||
                        sidebarFilters.querySelector('._36r2az6roul_Oej7D4BMI6') ||
                        sidebarFilters;

        const shortcuts = [
            {
                label: 'Add a game',
                icon: '+',
                action: () => {
                    if (window.SteamClient?.Apps?.AddShortcut) {
                        try { window.SteamClient.Apps.AddShortcut(); return; } catch (e) {}
                    }
                    if (window.SteamClient?.UI?.AddShortcutDialog) {
                        try { window.SteamClient.UI.AddShortcutDialog(); return; } catch (e) {}
                    }
                    if (window.SteamClient?.URL?.ExecuteSteamURL) {
                        try { window.SteamClient.URL.ExecuteSteamURL('steam://url/AddNonSteamGame'); } catch (e) {}
                    }
                    try { window.location.href = 'steam://url/AddNonSteamGame'; } catch (e) {}

                    const selectors = [
                        '._1_yS5UP7el0aN4vntx3dx ._2foCkpRXhqq0UGVE50BWqj',
                        '._2foCkpRXhqq0UGVE50BWqj',
                        '._1_yS5UP7el0aN4vntx3dx button:first-child',
                        '[class*="AddGameButton"]',
                        '[class*="AddGame"]',
                        '[class*="addgame"]'
                    ];
                    for (const sel of selectors) {
                        const el = document.querySelector(sel);
                        if (el) {
                            el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                            el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
                            el.click();
                            return;
                        }
                    }
                }
            },
            {
                label: 'Manage downloads',
                icon: '⇩',
                action: () => {
                    if (window.SteamClient?.URL?.ExecuteSteamURL) {
                        try { window.SteamClient.URL.ExecuteSteamURL('steam://open/downloads'); return; } catch (e) {}
                    }
                    try { window.location.href = 'steam://open/downloads'; return; } catch (e) {}
                    const el = document.querySelector('._2EQ7ghgqIdjKv9jsQC0Zq9, [class*="DownloadStatus"]');
                    if (el) el.click();
                }
            },
            {
                label: 'Friends and chat',
                icon: '♟',
                action: () => {
                    if (window.SteamClient?.UI?.OpenFriendsDialog) {
                        try { window.SteamClient.UI.OpenFriendsDialog(); return; } catch (e) {}
                    }
                    if (window.SteamClient?.URL?.ExecuteSteamURL) {
                        try { window.SteamClient.URL.ExecuteSteamURL('steam://open/friends'); return; } catch (e) {}
                    }
                    try { window.location.href = 'steam://open/friends'; return; } catch (e) {}
                    const el = document.querySelector('._1TdaAqMFadi0UTqilrkelR, [class*="Friends"]');
                    if (el) el.click();
                }
            }
        ];

        for (const shortcut of shortcuts) {
            if (iconRow.querySelector(`button[title="${shortcut.label}"]`)) continue;

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'ghost-sidebar-shortcut';
            button.title = shortcut.label;
            button.setAttribute('aria-label', shortcut.label);
            button.textContent = shortcut.icon;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                shortcut.action();
            });
            iconRow.append(button);
        }

        // Fix cross-platform icon shifting by assigning classes to native icons
        const nativeIcons = Array.from(iconRow.children).filter(el => !el.classList.contains('ghost-sidebar-shortcut'));
        // If there are 5 icons instead of 6, the Windows OS icon is missing, so we shift the index by 1
        const offset = nativeIcons.length <= 5 ? 1 : 0;
        
        nativeIcons.forEach((icon, i) => {
            // Remove previous ghost-filter-icon classes if they exist
            icon.className = icon.className.replace(/\bghost-filter-icon-\d\b/g, '');
            icon.classList.add(`ghost-filter-icon-${i + offset}`);
        });
    }

    function refresh() {
        markWalletBalance();
        createSidebarShortcuts();
    }

    let queued = false;
    const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
            queued = false;
            refresh();
        });
    });

    function init() {
        refresh();
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
