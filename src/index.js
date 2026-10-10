import { loadSettings, settings } from './modules/settings.js';
import { setupContainer, startAutoSyncWatcher, syncFromWallpaperEngine, loadAndApplyCustomMedia } from './modules/mediaRenderer.js';
import { setupUI } from './ui/topbarControls.js';
import { setupScrollWatcher } from './modules/scrollWatcher.js';

export function injectStyles(cssContent) {
    if (document.getElementById("we-styles")) return;
    const style = document.createElement("style");
    style.id = "we-styles";
    style.textContent = cssContent;
    document.head.appendChild(style);
}

export function initExtension(cssContent) {
    if (window.__WALLPAPER_ENGINE_INITIALIZED__) return;
    window.__WALLPAPER_ENGINE_INITIALIZED__ = true;

    function safeInit() {
        if (!document.body) {
            setTimeout(safeInit, 200);
            return;
        }
        loadSettings();
        injectStyles(cssContent);
        setupContainer();
        setupUI();
        setupScrollWatcher();
        startAutoSyncWatcher();
        if (settings.wallpaperSource === "wallpaper-engine") {
            setTimeout(() => syncFromWallpaperEngine(false), 800);
        } else {
            loadAndApplyCustomMedia();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", safeInit);
    } else {
        setTimeout(safeInit, 200);
    }
}
