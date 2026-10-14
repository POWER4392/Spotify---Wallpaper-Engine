import { settings } from '../modules/settings.js';

const RECOMMENDATION_TABS = [
    { id: "all", vi: "Tất cả", en: "All" },
    { id: "music", vi: "Nhạc", en: "Music" },
    { id: "podcasts", vi: "Podcasts", en: "Podcasts" }
];

let isNavigating = false;

function getHomeMainEl() {
    return document.querySelector(
        'main[data-testid="home-page"], main[data-testid="genre-page"], .main-home-content, [data-testid="home-page"], [data-testid="genre-page"], .main-view-container__scroll-node-child > main, .main-view-container__scroll-node-child, main'
    );
}

export function getActiveHomeTab() {
    try {
        const hist = window.Spicetify?.Platform?.History?.location || window.location;
        const search = hist?.search || window.location.search || "";
        const pathname = hist?.pathname || window.location.pathname || "";

        const params = new URLSearchParams(search);
        const facet = (params.get("facet") || "").toLowerCase();

        if (facet === "music" || pathname.includes("0JQ5DAqbMKFSi39LMRT0Cy")) {
            return "music";
        }
        if (facet === "podcasts" || pathname.includes("0JQ5DArNBzkmxXHCqFLx2J")) {
            return "podcasts";
        }

        const mainEl = getHomeMainEl();
        if (mainEl) {
            const activeChip = mainEl.querySelector(
                '.S2e77KLs4Na3yTiaIZgI [aria-checked="true"], .YOYIfKkABUDGQ5vQmg7y [aria-checked="true"], .S2e77KLs4Na3yTiaIZgI [aria-selected="true"], .YOYIfKkABUDGQ5vQmg7y [aria-selected="true"], .S2e77KLs4Na3yTiaIZgI [class*="selected"], .YOYIfKkABUDGQ5vQmg7y [class*="selected"], [data-encore-id="chip"][aria-checked="true"], [data-encore-id="chip"][aria-selected="true"]'
            );
            if (activeChip) {
                const txt = (activeChip.textContent || activeChip.getAttribute("aria-label") || "").toLowerCase().trim();
                if (txt.includes("nhạc") || txt.includes("music") || txt.includes("âm nhạc")) return "music";
                if (txt.includes("podcast")) return "podcasts";
                if (txt.includes("tất cả") || txt.includes("all")) return "all";
            }
        }

        if (pathname === "/" || pathname === "/home" || pathname.startsWith("/home")) {
            return "all";
        }
    } catch (_) { }
    return null;
}

export function isRecommendationRoute() {
    try {
        const hist = window.Spicetify?.Platform?.History?.location || window.location;
        const pathname = hist?.pathname || window.location.pathname || "";
        return (
            pathname === "/" ||
            pathname === "/home" ||
            pathname.startsWith("/home?") ||
            pathname.startsWith("/home/") ||
            pathname.includes("0JQ5DAqbMKFSi39LMRT0Cy") ||
            pathname.includes("0JQ5DArNBzkmxXHCqFLx2J")
        );
    } catch (_) {
        return false;
    }
}

function findNativeChip(type) {
    try {
        const mainEl = getHomeMainEl();
        if (!mainEl) return null;

        const nativeRow = mainEl.querySelector(
            '.S2e77KLs4Na3yTiaIZgI, .YOYIfKkABUDGQ5vQmg7y, .main-home-filterChipsContainer, .EM9V2npqr6_18FGhODtx, .gig6fTpg9wjxwnYIkuMg, [data-encore-id="chipList"]'
        );

        let candidates = [];
        if (nativeRow) {
            candidates = Array.from(nativeRow.querySelectorAll(
                'button, [data-encore-id="chip"], [class*="chip"]'
            )).filter(el => !el.closest('#we-home-quick-tabs'));
        } else {
            candidates = Array.from(mainEl.querySelectorAll(
                '[data-encore-id="chip"]'
            )).filter(el => !el.closest('#we-home-quick-tabs'));
        }

        return candidates.find(btn => {
            const text = (btn.textContent || btn.getAttribute("aria-label") || "").toLowerCase().trim();
            if (!text) return false;
            if (type === "all") {
                return text === "all" || text === "tất cả" || (text.startsWith("all") && !text.includes("installed") && !text.includes("album"));
            }
            if (type === "music") {
                return text === "music" || text === "nhạc" || text.includes("âm nhạc") || (text.includes("music") && !text.includes("search"));
            }
            if (type === "podcasts") {
                return text === "podcasts" || text === "podcast" || text.includes("podcast");
            }
            return false;
        });
    } catch (_) {
        return null;
    }
}

export function switchHomeTab(tabId) {
    if (isNavigating) return;

    const active = getActiveHomeTab();
    if (active === tabId) {
        const scrollEl = document.querySelector(
            '.main-view-container__scroll-node, [data-overlayscrollbars-viewport], .os-viewport, .Root__main-view .os-viewport'
        );
        if (scrollEl) {
            scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    isNavigating = true;
    setTimeout(() => {
        isNavigating = false;
    }, 500);

    const nativeChip = findNativeChip(tabId);
    if (nativeChip) {
        try {
            nativeChip.click();
            return;
        } catch (_) { }
    }

    if (window.Spicetify?.Platform?.History) {
        const hist = window.Spicetify.Platform.History;
        try {
            if (tabId === "all") {
                hist.push("/");
            } else if (tabId === "music") {
                hist.push("/home?facet=music");
            } else if (tabId === "podcasts") {
                hist.push("/home?facet=podcasts");
            }
        } catch (_) { }
    }
}

function getTabLabels() {
    const pref = settings.homeQuickTabsLang || "auto";
    let isVi = false;
    if (pref === "vi") {
        isVi = true;
    } else if (pref === "en") {
        isVi = false;
    } else {
        const detected = (window.Spicetify?.Locale?.getLocale?.() || document.documentElement.lang || "en").toLowerCase();
        isVi = detected.startsWith("vi");
    }

    return {
        isVi,
        all: isVi ? "Tất cả" : "All",
        music: isVi ? "Nhạc" : "Music",
        podcasts: isVi ? "Podcasts" : "Podcasts"
    };
}

export function updateHomeQuickTabs() {
    if (settings.homeQuickTabs === false || !isRecommendationRoute()) {
        const existing = document.getElementById("we-home-quick-tabs");
        if (existing) existing.remove();
        return;
    }

    const mainEl = getHomeMainEl();
    if (!mainEl) return;

    mainEl.querySelectorAll(
        '.S2e77KLs4Na3yTiaIZgI, .YOYIfKkABUDGQ5vQmg7y, .main-home-filterChipsContainer, .EM9V2npqr6_18FGhODtx, .gig6fTpg9wjxwnYIkuMg, [data-encore-id="chipList"]'
    ).forEach(el => {
        if (el.style.display === 'none') el.style.display = '';
        if (el.style.visibility === 'hidden') el.style.visibility = '';
    });

    const hasNativeMusic = findNativeChip("music");
    const hasNativeAll = findNativeChip("all");
    const hasNativePodcasts = findNativeChip("podcasts");

    if (hasNativeMusic || (hasNativeAll && hasNativePodcasts)) {
        const existing = document.getElementById("we-home-quick-tabs");
        if (existing) existing.remove();
        return;
    }

    const activeTab = getActiveHomeTab() || "all";
    const labels = getTabLabels();

    let container = document.getElementById("we-home-quick-tabs");
    if (!container) {
        container = document.createElement("nav");
        container.id = "we-home-quick-tabs";
        container.className = "we-home-quick-tabs";
        container.setAttribute("aria-label", labels.isVi ? "Bộ lọc Đề xuất" : "Home recommendation filters");

        const ul = document.createElement("ul");
        ul.className = "we-home-quick-tabs-list";
        ul.setAttribute("role", "tablist");

        RECOMMENDATION_TABS.forEach(tab => {
            const li = document.createElement("li");
            li.className = "we-home-quick-tab-item";
            li.setAttribute("role", "presentation");

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `we-home-quick-tab-btn ${tab.id === activeTab ? "active" : ""}`;
            btn.setAttribute("role", "tab");
            btn.setAttribute("aria-selected", tab.id === activeTab ? "true" : "false");
            btn.setAttribute("data-tab", tab.id);

            const span = document.createElement("span");
            span.textContent = labels[tab.id];
            btn.appendChild(span);

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                container.querySelectorAll(".we-home-quick-tab-btn").forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");
                switchHomeTab(tab.id);
            });

            li.appendChild(btn);
            ul.appendChild(li);
        });

        container.appendChild(ul);

        const nativeContainer = mainEl.querySelector('.YOYIfKkABUDGQ5vQmg7y, .S2e77KLs4Na3yTiaIZgI, .EM9V2npqr6_18FGhODtx, .gig6fTpg9wjxwnYIkuMg, [data-encore-id="chipList"]');
        if (nativeContainer) {
            nativeContainer.parentNode.insertBefore(container, nativeContainer);
        } else if (mainEl.firstChild) {
            mainEl.insertBefore(container, mainEl.firstChild);
        } else {
            mainEl.appendChild(container);
        }
    } else {
        if (!mainEl.contains(container)) {
            if (mainEl.firstChild) {
                mainEl.insertBefore(container, mainEl.firstChild);
            } else {
                mainEl.appendChild(container);
            }
        }

        container.querySelectorAll(".we-home-quick-tab-btn").forEach(btn => {
            const tabId = btn.getAttribute("data-tab");
            const isActive = tabId === activeTab;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-selected", isActive ? "true" : "false");
            const span = btn.querySelector("span");
            if (span && labels[tabId]) {
                span.textContent = labels[tabId];
            }
        });
    }
}

export function setupHomeFeedQuickTabs() {
    window.__we_update_home_quick_tabs__ = updateHomeQuickTabs;

    updateHomeQuickTabs();
    setInterval(updateHomeQuickTabs, 350);

    if (window.Spicetify && window.Spicetify.Platform && window.Spicetify.Platform.History) {
        window.Spicetify.Platform.History.listen(() => {
            setTimeout(updateHomeQuickTabs, 50);
            setTimeout(updateHomeQuickTabs, 200);
            setTimeout(updateHomeQuickTabs, 500);
        });
    }
}
