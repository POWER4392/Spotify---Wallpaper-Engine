/**
 * Spicetify Marketplace Quick Tab Switcher
 * Provides instant 1-click switching between Extensions, Themes, Snippets, Apps, Installed
 * directly inside the Marketplace header.
 */

const MARKETPLACE_TABS = [
    { id: "Extensions", label: "Extens." },
    { id: "Themes", label: "Themes" },
    { id: "Snippets", label: "Snippets" },
    { id: "Apps", label: "Apps" },
    { id: "Installed", label: "Installed" }
];

export function setupMarketplaceQuickTabs() {
    let checkInterval = null;

    function getActiveTab() {
        try {
            return localStorage.getItem("marketplace:active-tab") || "Extensions";
        } catch (e) {
            return "Extensions";
        }
    }

    function switchTab(tabId) {
        try {
            localStorage.setItem("marketplace:active-tab", tabId);
        } catch (e) {}

        // If native tabBar item exists, trigger its click
        const nativeItem = document.querySelector(`.marketplace-tabBar-headerItem[data-tab="${tabId}"]`);
        if (nativeItem) {
            nativeItem.click();
            return;
        }

        // Fallback: reload or notify Spicetify history
        if (window.Spicetify && window.Spicetify.Platform && window.Spicetify.Platform.History) {
            const loc = window.Spicetify.Platform.History.location;
            if (loc && loc.pathname === "/marketplace") {
                window.Spicetify.Platform.History.replace("/marketplace");
            }
        }
    }

    function updateQuickTabs() {
        const header = document.querySelector(".marketplace-header");
        if (!header) return;

        // If native tabBar is present, update active state on it and we're good
        const nativeTabBar = header.querySelector(".marketplace-tabBar");
        if (nativeTabBar) {
            // Already mounted by our patched Marketplace!
            return;
        }

        // If native tabBar is not yet mounted, provide our quick switcher container
        let container = header.querySelector("#marketplace-quick-tabs-container");
        if (!container) {
            container = document.createElement("nav");
            container.id = "marketplace-quick-tabs-container";
            container.className = "marketplace-quick-tabs";

            const ul = document.createElement("ul");
            ul.className = "marketplace-quick-tabs-list";

            const activeTab = getActiveTab();

            MARKETPLACE_TABS.forEach(tab => {
                const li = document.createElement("li");
                li.className = "marketplace-quick-tab-item";

                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = `marketplace-quick-tab-btn ${tab.id === activeTab ? "active" : ""}`;
                btn.setAttribute("data-tab", tab.id);

                const span = document.createElement("span");
                span.textContent = tab.label;
                btn.appendChild(span);

                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    ul.querySelectorAll(".marketplace-quick-tab-btn").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    switchTab(tab.id);
                });

                li.appendChild(btn);
                ul.appendChild(li);
            });

            container.appendChild(ul);

            const rightSide = header.querySelector(".marketplace-header__right");
            if (rightSide) {
                header.insertBefore(container, rightSide);
            } else {
                header.appendChild(container);
            }
        } else {
            // Sync active state
            const currentTab = getActiveTab();
            container.querySelectorAll(".marketplace-quick-tab-btn").forEach(btn => {
                if (btn.getAttribute("data-tab") === currentTab) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }
    }

    function startWatcher() {
        if (checkInterval) clearInterval(checkInterval);
        checkInterval = setInterval(() => {
            const path = window.location?.pathname || window.Spicetify?.Platform?.History?.location?.pathname;
            if (path && path.includes("marketplace")) {
                updateQuickTabs();
            }
        }, 300);
    }

    startWatcher();

    if (window.Spicetify && window.Spicetify.Platform && window.Spicetify.Platform.History) {
        window.Spicetify.Platform.History.listen((location) => {
            if (location.pathname && location.pathname.includes("marketplace")) {
                setTimeout(updateQuickTabs, 100);
                setTimeout(updateQuickTabs, 500);
            }
        });
    }
}
