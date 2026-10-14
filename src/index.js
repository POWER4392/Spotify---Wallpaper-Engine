import { loadSettings } from './modules/settings.js';
import { setupContainer, startAutoSyncWatcher } from './modules/mediaRenderer.js';
import { setupUI } from './ui/topbarControls.js';
import { setupScrollWatcher } from './modules/scrollWatcher.js';
import { setupMarketplaceQuickTabs } from './ui/marketplaceQuickTabs.js';
import { setupHomeFeedQuickTabs } from './ui/homeFeedQuickTabs.js';
import { setupOfflineHandler } from './modules/offlineHandler.js';

export function injectStyles(cssContent) {
    if (document.getElementById("we-styles")) return;
    const style = document.createElement("style");
    style.id = "we-styles";
    style.textContent = cssContent;
    const target = document.head || document.documentElement;
    if (target) {
        target.appendChild(style);
    }
}

export function initExtension(cssContent) {
    if (window.__WALLPAPER_ENGINE_INITIALIZED__) return;
    window.__WALLPAPER_ENGINE_INITIALIZED__ = true;

    try {
        injectStyles(cssContent);
        setupOfflineHandler();
    } catch (_) {}

    function safeInit() {
        if (!document.body) {
            setTimeout(safeInit, 200);
            return;
        }
        loadSettings();
        setupContainer();
        setupUI();
        setupScrollWatcher();
        setupHomeFeedQuickTabs();
        setupMarketplaceQuickTabs();
        startAutoSyncWatcher();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", safeInit);
    } else {
        setTimeout(safeInit, 200);
    }
}
