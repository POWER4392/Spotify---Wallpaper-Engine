/**
 * Spotify Home / Recommendation Feed Quick Tab Filter Bar
 * Provides instant 1-click filter switching between:
 * - All (Tất cả): Main home feed ("/" or "/home")
 * - Music (Nhạc): Music recommendation subfeed ("/genre/0JQ5DAqbMKFSi39LMRT0Cy")
 * - Podcasts (Podcasts): Podcasts recommendation subfeed ("/genre/0JQ5DArNBzkmxXHCqFLx2J")
 */

import { settings } from '../modules/settings.js';

const RECOMMENDATION_TABS = [
    { id: "all", vi: "Tất cả", en: "All", path: "/" },
    { id: "music", vi: "Nhạc", en: "Music", path: "/genre/0JQ5DAqbMKFSi39LMRT0Cy" },
    { id: "podcasts", vi: "Podcasts", en: "Podcasts", path: "/genre/0JQ5DArNBzkmxXHCqFLx2J" }
];

export function getActiveHomeTab() {
    try {
        const loc = window.Spicetify?.Platform?.History?.location || window.location;
        const path = loc?.pathname || "";
        const search = loc?.search || "";

        if (path.includes("0JQ5DAqbMKFSi39LMRT0Cy") || search.includes("facet=music")) return "music";
        if (path.includes("0JQ5DArNBzkmxXHCqFLx2J") || search.includes("facet=podcasts")) return "podcasts";
        if (path === "/" || path === "/home" || path.startsWith("/home")) return "all";
    } catch (_) {}
    return null;
}

export function isRecommendationRoute() {
    return getActiveHomeTab() !== null;
}

function findNativeChip(type) {
    try {
        const chips = Array.from(document.querySelectorAll('[data-encore-id="chip"]'));
        return chips.find(chip => {
            const text = (chip.textContent || chip.getAttribute("aria-label") || "").toLowerCase();
            if (type === "all") return text.includes("tất cả") || text.includes("all");
            if (type === "music") return text.includes("nhạc") || text.includes("music");
            if (type === "podcasts") return text.includes("podcast");
            return false;
        });
    } catch (_) {
        return null;
    }
}

export function switchHomeTab(tabId) {
    if (getActiveHomeTab() === tabId) {
        const scrollEl = document.querySelector(
            '.main-view-container__scroll-node, [data-overlayscrollbars-viewport], .os-viewport, .Root__main-view .os-viewport'
        );
        (scrollEl || window).scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const nativeChip = findNativeChip(tabId);
    if (nativeChip) {
        nativeChip.click();
        return;
    }

    const tab = RECOMMENDATION_TABS.find(t => t.id === tabId);
    if (tab && window.Spicetify?.Platform?.History) {
        window.Spicetify.Platform.History.push(tab.path);
    }
}

function getLabel(tab) {
    const pref = settings.homeQuickTabsLang || "auto";
    const isVi = pref === "vi" || (pref !== "en" && (window.Spicetify?.Locale?.getLocale?.() || document.documentElement.lang || "").toLowerCase().startsWith("vi"));
    return isVi ? tab.vi : tab.en;
}

export function updateHomeQuickTabs() {
    const activeTab = getActiveHomeTab();
    if (settings.homeQuickTabs === false || !activeTab) {
        document.getElementById("we-home-quick-tabs")?.remove();
        return;
    }

    if (document.querySelectorAll('.S2e77KLs4Na3yTiaIZgI [data-encore-id="chip"]').length >= 2) {
        document.getElementById("we-home-quick-tabs")?.remove();
        return;
    }

    const mainEl = document.querySelector(
        'main[data-testid="home-page"], main[data-testid="genre-page"], .main-home-content, [data-testid="home-page"], [data-testid="genre-page"], .main-view-container__scroll-node-child > main, .main-view-container__scroll-node-child'
    );
    if (!mainEl) return;

    let container = document.getElementById("we-home-quick-tabs");
    if (!container) {
        container = document.createElement("nav");
        container.id = "we-home-quick-tabs";
        container.className = "we-home-quick-tabs";

        const ul = document.createElement("ul");
        ul.className = "we-home-quick-tabs-list";
        ul.setAttribute("role", "tablist");

        RECOMMENDATION_TABS.forEach(tab => {
            const li = document.createElement("li");
            li.className = "we-home-quick-tab-item";

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "we-home-quick-tab-btn";
            btn.setAttribute("role", "tab");
            btn.setAttribute("data-tab", tab.id);

            const span = document.createElement("span");
            span.textContent = getLabel(tab);
            btn.appendChild(span);

            btn.onclick = (e) => {
                e.preventDefault();
                switchHomeTab(tab.id);
            };

            li.appendChild(btn);
            ul.appendChild(li);
        });

        container.appendChild(ul);
        const native = mainEl.querySelector('.YOYIfKkABUDGQ5vQmg7y, .S2e77KLs4Na3yTiaIZgI');
        if (native) native.before(container);
        else mainEl.prepend(container);
    } else if (!mainEl.contains(container)) {
        mainEl.prepend(container);
    }

    container.querySelectorAll(".we-home-quick-tab-btn").forEach(btn => {
        const tab = RECOMMENDATION_TABS.find(t => t.id === btn.getAttribute("data-tab"));
        const isActive = tab?.id === activeTab;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        const span = btn.firstElementChild;
        if (span && tab) span.textContent = getLabel(tab);
    });
}

export function setupHomeFeedQuickTabs() {
    window.__we_update_home_quick_tabs__ = updateHomeQuickTabs;
    updateHomeQuickTabs();
    setInterval(updateHomeQuickTabs, 350);

    if (window.Spicetify?.Platform?.History?.listen) {
        window.Spicetify.Platform.History.listen(() => setTimeout(updateHomeQuickTabs, 60));
    }
}
