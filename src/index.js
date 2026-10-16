import { loadSettings } from './modules/settings.js';
import { setupContainer, startAutoSyncWatcher } from './modules/mediaRenderer.js';
import { setupUI } from './ui/topbarControls.js';
import { setupScrollWatcher } from './modules/scrollWatcher.js';
import { setupMarketplaceQuickTabs } from './ui/marketplaceQuickTabs.js';
import { setupHomeFeedQuickTabs } from './ui/homeFeedQuickTabs.js';
import { setupOfflineHandler } from './modules/offlineHandler.js';

export function injectStyles(cssContent) {
    let style = document.getElementById("we-styles");
    if (!style) {
        style = document.createElement("style");
        style.id = "we-styles";
        const target = document.head || document.documentElement;
        if (target) {
            target.appendChild(style);
        }
    }
    style.textContent = cssContent;
}

export function initExtension(cssContent) {
    try {
        injectStyles(cssContent);
    } catch (_) {}

    if (window.__WALLPAPER_ENGINE_INITIALIZED__) return;
    window.__WALLPAPER_ENGINE_INITIALIZED__ = true;

    try {
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
