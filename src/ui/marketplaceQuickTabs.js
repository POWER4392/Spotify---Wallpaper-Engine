const MARKETPLACE_TABS = [
    { id: "Extensions", label: "Extensions" },
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

        const nativeItem = document.querySelector(`.marketplace-tabBar-headerItem[data-tab="${tabId}"]`);
        if (nativeItem) {
            nativeItem.click();
            return;
        }

        const dropdownOption = Array.from(document.querySelectorAll('.marketplace-tabBar .Dropdown-option')).find(
            opt => (opt.textContent || "").trim() === tabId
        );
        if (dropdownOption) {
            dropdownOption.click();
            return;
        }

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

        const strandedTabBar = document.querySelector(".marketplace-tabBar");
        if (strandedTabBar && !header.contains(strandedTabBar)) {
            const rightSide = header.querySelector(".marketplace-header__right");
            if (rightSide) {
                header.insertBefore(strandedTabBar, rightSide);
            } else {
                header.appendChild(strandedTabBar);
            }
            return;
        }

        const nativeTabBar = header.querySelector(".marketplace-tabBar");
        if (nativeTabBar) {
            const moreDropdown = nativeTabBar.querySelector(".Dropdown-root");
            const dataTabs = nativeTabBar.querySelectorAll(".marketplace-tabBar-headerItem[data-tab]");
            if (moreDropdown || dataTabs.length < 5) {
                const ul = nativeTabBar.querySelector(".marketplace-tabBar-header");
                if (ul) {
                    ul.style.minWidth = "450px";
                    ul.style.width = "auto";
                }
            }
            return;
        }

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
            const currentTab = getActiveTab();
            container.querySelectorAll(".marketplace-quick-tab-btn").forEach(btn => {
                btn.classList.toggle("active", btn.getAttribute("data-tab") === currentTab);
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
                setTimeout(updateQuickTabs, 80);
            }
        });
    }
}
