/**
 * Offline & Error Modal Handler
 * Fixes Spotify's fatal error takeover / offline modal (_NFePmYV2P6aLGrjLvuR, EvmeKyemPmmbdjRZQezw, FnUUCAJ79nf4_lZGH0DB)
 * - Restores sleek dark frosted-glass aesthetics with readable high-contrast text
 * - Provides corner close button and "Dismiss / Bỏ qua" button so user is never trapped
 * - Automatically detects network reconnection and reloads Spotify seamlessly
 * - Supports keyboard ESC to dismiss
 */

export function setupOfflineHandler() {
    let autoReloadTimer = null;

    // 1. Auto-reload when network reconnects if error takeover is visible
    function handleOnline() {
        console.log("[Wallpaper Engine] Network connection restored!");
        const errorTakeover = document.querySelector(
            "._NFePmYV2P6aLGrjLvuR, .EvmeKyemPmmbdjRZQezw, .FnUUCAJ79nf4_lZGH0DB"
        );
        if (errorTakeover && errorTakeover.style.display !== "none") {
            console.log("[Wallpaper Engine] Connection back online! Reloading Spotify in 1s...");
            if (autoReloadTimer) clearTimeout(autoReloadTimer);
            autoReloadTimer = setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    window.addEventListener("online", handleOnline);

    // 2. Allow ESC key to dismiss error modals
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            dismissAllErrorModals();
        }
    });

    function dismissAllErrorModals() {
        const backdrops = document.querySelectorAll("._NFePmYV2P6aLGrjLvuR, [class*='_NFePmYV2P6aLGrjLvuR']");
        backdrops.forEach((el) => {
            el.style.setProperty("display", "none", "important");
            el.style.setProperty("pointer-events", "none", "important");
        });
        const dialogs = document.querySelectorAll(".EvmeKyemPmmbdjRZQezw, .FnUUCAJ79nf4_lZGH0DB");
        dialogs.forEach((el) => {
            const parent = el.closest("._NFePmYV2P6aLGrjLvuR") || el.parentElement;
            if (parent && parent !== document.body) {
                parent.style.setProperty("display", "none", "important");
                parent.style.setProperty("pointer-events", "none", "important");
            } else {
                el.style.setProperty("display", "none", "important");
            }
        });
    }

    // 3. Patch and enhance any error modal when it enters DOM
    function enhanceModal(modalEl) {
        if (!modalEl || modalEl.dataset.weEnhanced) return;
        modalEl.dataset.weEnhanced = "true";

        const backdrop = modalEl.closest("._NFePmYV2P6aLGrjLvuR") || modalEl.parentElement;

        // Ensure relative positioning on dialog so corner close button can be anchored
        modalEl.style.setProperty("position", "relative", "important");

        // Add corner close 'x' button if not present
        if (!modalEl.querySelector(".we-modal-corner-close")) {
            const closeBtn = document.createElement("button");
            closeBtn.className = "we-modal-corner-close";
            closeBtn.type = "button";
            closeBtn.innerHTML = "&times;";
            closeBtn.title = "Dismiss (Đóng) - Esc";
            closeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                dismissAllErrorModals();
            };
            modalEl.appendChild(closeBtn);
        }

        // Add secondary "Dismiss / Bỏ qua" button to action button container
        const btnContainer = modalEl.querySelector(".KubpT42JTL9IbK8ixLiC, .YBUiYN9k0MC_fAgWUau7") || modalEl.lastElementChild;
        if (btnContainer && !modalEl.querySelector(".we-offline-dismiss-btn")) {
            const dismissBtn = document.createElement("button");
            dismissBtn.className = "we-offline-dismiss-btn";
            dismissBtn.type = "button";
            dismissBtn.textContent = "Dismiss / Bỏ qua";
            dismissBtn.title = "Dismiss this notice and continue using Spotify";
            dismissBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                dismissAllErrorModals();
            };
            btnContainer.insertBefore(dismissBtn, btnContainer.firstElementChild);
        }

        // Fix primary button text
        const primaryBtn = modalEl.querySelector("._fA4q2hl7XY7z6Sh5pRv, button:not(.we-offline-dismiss-btn):not(.we-modal-corner-close)");
        if (primaryBtn) {
            primaryBtn.style.setProperty("color", "#000000", "important");
            primaryBtn.style.setProperty("background-color", "#1ed760", "important");
            if (!primaryBtn.textContent || primaryBtn.textContent.trim() === "") {
                primaryBtn.textContent = "Reload Page / Thử lại";
            }
        }

        // If offline or network error, provide clear informative notice
        const isOffline = !navigator.onLine;
        const titleEl = modalEl.querySelector("h1");
        if (titleEl && !titleEl.dataset.weTextUpdated) {
            titleEl.dataset.weTextUpdated = "true";
            if (isOffline) {
                titleEl.textContent = "No Internet Connection (Mất kết nối mạng)";
            } else {
                titleEl.textContent = "Connection / Loading Notice";
            }
        }

        const descEl = modalEl.querySelector("p");
        if (descEl && !descEl.dataset.weTextUpdated) {
            descEl.dataset.weTextUpdated = "true";
            descEl.innerHTML = `
                Spotify could not reach server endpoints.<br>
                Wallpaper and local playback remain active.<br>
                <span style="display:inline-flex; align-items:center; gap:6px; margin-top:8px; font-size:12px; color:#1ed760; font-weight:500;">
                    <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#1ed760; box-shadow:0 0 6px #1ed760;"></span>
                    Spotify will automatically reconnect once your internet returns.
                </span>
            `;
        }
    }

    const scanModals = () => {
        document.querySelectorAll(".EvmeKyemPmmbdjRZQezw, .FnUUCAJ79nf4_lZGH0DB").forEach(enhanceModal);
    };

    try {
        const observer = new MutationObserver(scanModals);
        observer.observe(document.documentElement, { childList: true, subtree: true });
    } catch (_) {}

    setInterval(scanModals, 500);
    scanModals();
}
