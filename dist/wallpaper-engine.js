(function () {
    const THEME_CSS = ":root {\n                --we-bg-opacity: var(--we-bg-opacity, 0.4);\n                --we-sidebar-opacity: var(--we-sidebar-opacity, 0);\n                --we-player-opacity: var(--we-player-opacity, 0);\n                --we-header-opacity: var(--we-header-opacity, 0.35);\n                --we-header-blur: var(--we-header-blur, 0px);\n                --we-topbar-opacity: var(--we-topbar-opacity, 0);\n                --we-topbar-blur: var(--we-topbar-blur, 0px);\n                --we-search-bg-color: var(--we-search-bg-color, #181818);\n                --we-search-bg-opacity: var(--we-search-bg-opacity, 0.96);\n                --we-img-blur: var(--we-img-blur, 0px);\n                --we-img-brightness: var(--we-img-brightness, 100%);\n                --we-fit-mode: var(--we-fit-mode, cover);\n                --we-pos: var(--we-pos, center);\n                --we-zoom: var(--we-zoom, 100);\n\n                --background-base: rgba(18, 18, 18, var(--we-bg-opacity));\n                --background-elevated-base: rgba(24, 24, 24, calc(var(--we-bg-opacity) + 0.1)) !important;\n                --background-elevated-highlight: rgba(35, 35, 35, calc(var(--we-bg-opacity) + 0.15)) !important;\n                --background-highlight: rgba(30, 30, 30, calc(var(--we-bg-opacity) + 0.1)) !important;\n                --background-tinted-base: rgba(18, 18, 18, var(--we-bg-opacity));\n                --spice-main: transparent !important;\n                --spice-sidebar: rgba(18, 18, 18, var(--we-sidebar-opacity)) !important;\n                --spice-player: rgba(12, 12, 12, var(--we-player-opacity)) !important;\n                --spice-card: rgba(255, 255, 255, 0.05) !important;\n            }\n\n            #we-container {\n                position: fixed !important;\n                inset: 0 !important;\n                width: 100vw !important;\n                height: 100vh !important;\n                z-index: 0 !important;\n                pointer-events: none !important;\n                overflow: hidden !important;\n                background-color: #121212 !important;\n            }\n\n            #we-image, #we-video {\n                width: 100% !important;\n                height: 100% !important;\n                object-fit: var(--we-fit-mode) !important;\n                object-position: var(--we-pos) !important;\n                position: absolute !important;\n                top: 0 !important;\n                left: 0 !important;\n                filter: blur(var(--we-img-blur)) brightness(var(--we-img-brightness)) !important;\n                transform: scale(calc(var(--we-zoom) / 100)) !important;\n                transform-origin: center center !important;\n                transition: filter 0.15s ease, transform 0.15s ease !important;\n            }\n\n            .we-media-hidden {\n                display: none !important;\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n            }\n\n            #we-overlay {\n                position: absolute !important;\n                inset: 0 !important;\n                width: 100% !important;\n                height: 100% !important;\n                background: rgba(0, 0, 0, 0.22) !important;\n                pointer-events: none !important;\n            }\n\n            html, body, #main,\n            .Root__top-container,\n            .Root__main-view,\n            .main-view-container,\n            .main-view-container__scroll-node,\n            .main-view-container__scroll-node-child,\n            .under-main-view,\n            .RootContainer,\n            .Root__globalNav,\n            main, section,\n            .main-home-content,\n            .bTgBWvuzt0s_dQWLj2OL,\n            .Js8eeZY421_5B7PBMMbb,\n            [class*=\"Js8eeZY421_5B7PBMMbb\"],\n            .kqeAXHJzFfJ_27frg58J,\n            [class*=\"kqeAXHJzFfJ_27frg58J\"],\n            .YcaaSDZAKPOLI5dw6Knt,\n            [class*=\"YcaaSDZAKPOLI5dw6Knt\"],\n            .RzqDWBjV5htZanYHtMOj,\n            [class*=\"RzqDWBjV5htZanYHtMOj\"],\n            .gCzTaHIMnDRaHPeVzrbp,\n            [class*=\"gCzTaHIMnDRaHPeVzrbp\"],\n            .bokji1jrN2MBe7RA0384,\n            [class*=\"bokji1jrN2MBe7RA0384\"],\n            [grid-area=\"main-view\"],\n            [data-testid=\"main-view\"],\n            .main-entityHeader-backgroundColor,\n            .main-entityHeader-overlay,\n            .main-actionBarBackground-background,\n            [data-testid=\"home-page\"],\n            .main-shelf-shelf,\n            .main-trackList-trackListHeader,\n            .rl0QlbVbrvgO0fB5Pkua,\n            .e-10860-table-header-cell,\n            [class*=\"table-header-cell\"] {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                backdrop-filter: none !important;\n                -webkit-backdrop-filter: none !important;\n            }\n\n            .rLb4jRJmAjuDMN1b9Atw,\n            [class*=\"rLb4jRJmAjuDMN1b9Atw\"],\n            [aria-label=\"global-nav-bar\"],\n            #global-nav-bar {\n                background: rgba(18, 18, 18, var(--we-topbar-opacity, 0)) !important;\n                backdrop-filter: blur(var(--we-topbar-blur, 0px)) !important;\n                -webkit-backdrop-filter: blur(var(--we-topbar-blur, 0px)) !important;\n                z-index: 99 !important;\n                transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease !important;\n            }\n\n            #global-nav-bar .custom-navlinks-scrollable_container,\n            [aria-label=\"global-nav-bar\"] .custom-navlinks-scrollable_container,\n            .Root__globalNav .custom-navlinks-scrollable_container,\n            .main-globalNav-historyButtons ~ .custom-navlinks-scrollable_container,\n            #global-nav-bar [aria-label*=\"Marketplace\"],\n            .Root__globalNav [aria-label*=\"Marketplace\"],\n            #global-nav-bar [title*=\"Marketplace\"],\n            .Root__globalNav [title*=\"Marketplace\"],\n            #global-nav-bar a[href=\"/marketplace\"],\n            .Root__globalNav a[href=\"/marketplace\"],\n            #global-nav-bar .custom-navlink,\n            .Root__globalNav .custom-navlink,\n            .main-globalNav-historyButtons .custom-navlink,\n            .main-globalNav-historyButtons ~ .custom-navlink,\n            .spicetify-topbar-button:has([aria-label*=\"Marketplace\"]),\n            .spicetify-topbar-button:has([title*=\"Marketplace\"]) {\n                display: none !important;\n                width: 0 !important;\n                height: 0 !important;\n                margin: 0 !important;\n                padding: 0 !important;\n                opacity: 0 !important;\n                pointer-events: none !important;\n                visibility: hidden !important;\n            }\n\n            #we-topbar-controls-group {\n                display: inline-flex !important;\n                align-items: center !important;\n                gap: 6px !important;\n                margin-right: 12px !important;\n                margin-left: 8px !important;\n                flex-shrink: 0 !important;\n                z-index: 1000 !important;\n                -webkit-app-region: no-drag !important;\n                pointer-events: auto !important;\n                position: relative !important;\n            }\n\n            #we-topbar-pause-btn,\n            #we-topbar-source-btn {\n                display: inline-flex !important;\n                align-items: center !important;\n                justify-content: center !important;\n                width: 32px !important;\n                height: 32px !important;\n                min-width: 32px !important;\n                background: rgba(255, 255, 255, 0.08) !important;\n                border: 1px solid rgba(255, 255, 255, 0.12) !important;\n                border-radius: 50% !important;\n                color: #b3b3b3 !important;\n                cursor: pointer !important;\n                margin: 0 !important;\n                padding: 0 !important;\n                transition: all 0.2s ease !important;\n                flex-shrink: 0 !important;\n                vertical-align: middle !important;\n                -webkit-app-region: no-drag !important;\n                pointer-events: auto !important;\n                position: relative !important;\n                z-index: 1001 !important;\n            }\n\n            #we-topbar-pause-btn *,\n            #we-topbar-source-btn * {\n                pointer-events: none !important;\n            }\n\n            #we-topbar-pause-btn:hover,\n            #we-topbar-source-btn:hover {\n                background: rgba(255, 255, 255, 0.2) !important;\n                color: #fff !important;\n                border-color: rgba(255, 255, 255, 0.3) !important;\n                transform: scale(1.08) !important;\n            }\n\n            #we-topbar-pause-btn.we-is-paused {\n                background: rgba(234, 179, 8, 0.15) !important;\n                border-color: rgba(234, 179, 8, 0.4) !important;\n                color: #facc15 !important;\n            }\n\n            #we-topbar-source-btn.we-is-custom {\n                background: rgba(80, 155, 245, 0.18) !important;\n                border-color: rgba(80, 155, 245, 0.45) !important;\n                color: #509bf5 !important;\n            }\n\n            #we-sidebar-marketplace-btn {\n                display: inline-flex !important;\n                align-items: center !important;\n                justify-content: center !important;\n                width: 32px !important;\n                height: 32px !important;\n                min-width: 32px !important;\n                min-height: 32px !important;\n                border-radius: 50% !important;\n                background: transparent !important;\n                border: none !important;\n                color: #b3b3b3 !important;\n                cursor: pointer !important;\n                padding: 0 !important;\n                margin: 0 4px 0 0 !important;\n                transition: color 0.15s ease, background-color 0.15s ease, transform 0.15s ease !important;\n                vertical-align: middle !important;\n                flex-shrink: 0 !important;\n                outline: none !important;\n            }\n\n            #we-sidebar-marketplace-btn:hover {\n                color: #ffffff !important;\n                background: rgba(255, 255, 255, 0.12) !important;\n                transform: scale(1.08) !important;\n            }\n\n            #we-sidebar-marketplace-btn:active {\n                transform: scale(0.96) !important;\n            }\n\n            #we-sidebar-marketplace-btn.we-active {\n                color: #1ed760 !important;\n                background: rgba(30, 215, 96, 0.18) !important;\n            }\n\n            #we-sidebar-marketplace-btn svg {\n                width: 16px !important;\n                height: 16px !important;\n                fill: currentColor !important;\n                pointer-events: none !important;\n            }\n\n            ._ddPhxHdxmpT13IbjTmr,\n            [class*=\"_ddPhxHdxmpT13IbjTmr\"],\n            .mkLf3oHSpzyF02_8URcp,\n            [class*=\"mkLf3oHSpzyF02_8URcp\"],\n            .YOYIfKkABUDGQ5vQmg7y,\n            [class*=\"YOYIfKkABUDGQ5vQmg7y\"],\n            .kflHPd1wGLg8GjJjmpc6,\n            [class*=\"kflHPd\"],\n            [class*=\"HomeHeader\"],\n            [class*=\"home-header\"],\n            .main-entityHeader-backgroundColor,\n            .main-entityHeader-overlay {\n                opacity: var(--we-header-opacity) !important;\n                backdrop-filter: blur(var(--we-header-blur)) !important;\n                -webkit-backdrop-filter: blur(var(--we-header-blur)) !important;\n                transition: opacity 0.2s ease !important;\n            }\n\n            .U9oB67sd8gEL7q96iimU,\n            .hCmXvvXW8zs7RN1MPuy8,\n            .JicSmsOnmRYwWa_s1EFw,\n            [class*=\"U9oB67sd8gEL7q96iimU\"],\n            [class*=\"hCmXvvXW8zs7RN1MPuy8\"],\n            .main-shelf-title,\n            .main-entityHeader-title,\n            .main-trackInfo-name,\n            .main-trackInfo-artists,\n            [data-testid=\"context-item-info-title\"],\n            [data-testid=\"context-item-info-artist\"] {\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            .main-nowPlayingWidget-nowPlaying,\n            .main-trackInfo-container,\n            [data-testid=\"now-playing-widget\"] {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            [data-testid=\"context-item-info-title\"] a,\n            [data-testid=\"context-item-info-title\"] span,\n            .main-trackInfo-name a,\n            .main-trackInfo-name span {\n                color: var(--text-base, #ffffff) !important;\n                opacity: 1 !important;\n            }\n\n            [data-testid=\"context-item-info-artist\"] a,\n            [data-testid=\"context-item-info-artist\"] span,\n            .main-trackInfo-artists a,\n            .main-trackInfo-artists span {\n                color: var(--text-subdued, #b3b3b3) !important;\n                opacity: 1 !important;\n            }\n\n            svg,\n            [data-encore-id=\"icon\"],\n            .main-topBar-container svg,\n            .main-nowPlayingBar-container svg,\n            .Root__nav-bar svg,\n            .Root__right-sidebar svg {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            button:disabled svg,\n            [aria-disabled=\"true\"] svg {\n                opacity: 0.45 !important;\n            }\n\n            .gknHoFwcFh2WOkAgFZO3,\n            .d7X9aolm5TS8_LZJnMlL,\n            .ZkAIsM9Tz3jTaPXEtrAO,\n            .HAar7rzRpAeBrQTxx8zt,\n            .u1Nn8NuqlGfivWHb0MzS,\n            ._BbSuw7bQ6wM5s49U_SZ {\n                color: #000000 !important;\n            }\n\n            :is([class*=\"checkbox-indicator--selected\"], [class*=\"checkbox-indicator--indeterminate\"]):after {\n                background-color: #ffffff !important;\n            }\n            .cpe7XCQ9Xn2cGKY9mg1y {\n                color: #ffffff !important;\n            }\n\n            #search-dropdown,\n            [id=\"search-dropdown\"],\n            .c4S_V1zrMUEnmhi4Qaps,\n            [class*=\"c4S_V1zrMUEnmhi4Qaps\"],\n            .irnScW1A4fL00g6ugVVT,\n            [class*=\"irnScW1A4fL00g6ugVVT\"],\n            .rsWqM7GKHhCUtFP6zaZp,\n            [class*=\"rsWqM7GKHhCUtFP6zaZp\"],\n            .izeKI97uT3xjkJSjKotg,\n            dialog[open],\n            [data-testid=\"search-modal\"] {\n                background-color: var(--we-search-bg-color, #181818) !important;\n                background: var(--we-search-bg-color, #181818) !important;\n                opacity: var(--we-search-bg-opacity, 0.96) !important;\n                border: 1px solid rgba(255, 255, 255, 0.14) !important;\n                border-radius: 12px !important;\n                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.08) !important;\n                backdrop-filter: blur(30px) !important;\n                -webkit-backdrop-filter: blur(30px) !important;\n                z-index: 9999 !important;\n            }\n\n            #search-dropdown *,\n            [id=\"search-dropdown\"] *,\n            .c4S_V1zrMUEnmhi4Qaps *,\n            [class*=\"c4S_V1zrMUEnmhi4Qaps\"] *,\n            .rsWqM7GKHhCUtFP6zaZp *,\n            [class*=\"rsWqM7GKHhCUtFP6zaZp\"] * {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            #search-dropdown [role=\"row\"]:hover,\n            #search-dropdown li:hover,\n            .c4S_V1zrMUEnmhi4Qaps [role=\"row\"]:hover,\n            .c4S_V1zrMUEnmhi4Qaps li:hover,\n            .rsWqM7GKHhCUtFP6zaZp .aL2PJnD23YU4xMPS_hD_:hover,\n            [class*=\"rsWqM7GKHhCUtFP6zaZp\"] [class*=\"aL2PJnD\"]:hover {\n                background-color: rgba(255, 255, 255, 0.08) !important;\n                border-radius: 6px !important;\n            }\n\n            .encore-inverted-light-set,\n            .encore-dark-theme .encore-inverted-light-set,\n            .encore-light-theme .encore-inverted-light-set,\n            [data-encore-id=\"chip\"][aria-selected=\"true\"],\n            [data-encore-id=\"chip\"][aria-checked=\"true\"],\n            [data-encore-id=\"chip\"].encore-inverted-light-set,\n            button[aria-checked=\"true\"][class*=\"chip\"],\n            button[aria-selected=\"true\"][class*=\"chip\"],\n            .e-10860-chip[aria-checked=\"true\"],\n            .e-10860-chip[aria-selected=\"true\"],\n            .e-10860-legacy-chip--selected,\n            .e-10860-legacy-chip__inner--selected,\n            .o9cVZ8KdDdXGhGS2t2p4 [aria-selected=\"true\"],\n            .o9cVZ8KdDdXGhGS2t2p4 [aria-checked=\"true\"],\n            .o9cVZ8KdDdXGhGS2t2p4 button:first-child[aria-selected=\"true\"] {\n                --text-base: #000000 !important;\n                --text-subdued: #383838 !important;\n                --essential-base: #000000 !important;\n                --decorative-base: #000000 !important;\n                --parents-essential-base: #000000 !important;\n                color: #000000 !important;\n            }\n\n            .encore-inverted-light-set *,\n            .encore-dark-theme .encore-inverted-light-set *,\n            .encore-light-theme .encore-inverted-light-set *,\n            [data-encore-id=\"chip\"][aria-selected=\"true\"] *,\n            [data-encore-id=\"chip\"][aria-checked=\"true\"] *,\n            [data-encore-id=\"chip\"].encore-inverted-light-set *,\n            button[aria-checked=\"true\"][class*=\"chip\"] *,\n            button[aria-selected=\"true\"][class*=\"chip\"] *,\n            .e-10860-chip[aria-checked=\"true\"] *,\n            .e-10860-chip[aria-selected=\"true\"] *,\n            .e-10860-legacy-chip--selected *,\n            .e-10860-legacy-chip__inner--selected *,\n            .o9cVZ8KdDdXGhGS2t2p4 [aria-selected=\"true\"] *,\n            .o9cVZ8KdDdXGhGS2t2p4 [aria-checked=\"true\"] * {\n                color: #000000 !important;\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            .OsDLl_EbSaDJzGA6kqjL .GtL6v5f4OhSsTWIFTm5j,\n            .GtL6v5f4OhSsTWIFTm5j,\n            [class*=\"GtL6v5f4OhSsTWIFTm5j\"],\n            .Kycla0k6aBuyHNByTQ5o,\n            [class*=\"Kycla0k6aBuyHNByTQ5o\"],\n            .Y9plb9njHKs43f4rlAVp,\n            [class*=\"Y9plb9njHKs43f4rlAVp\"],\n            .BN47g2Kc5QfLWhsUCe8N,\n            .JicSmsOnmRYwWa_s1EFw,\n            [data-testid=\"lyrics-npv-section\"],\n            [data-testid=\"lyrics-npv-section\"] *,\n            [data-testid=\"lyrics-fullscreen-container\"],\n            [data-testid=\"lyrics-fullscreen-container\"] * {\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n                mask: none !important;\n                -webkit-mask: none !important;\n            }\n\n            [data-testid=\"lyrics-npv-section\"] p,\n            [data-testid=\"lyrics-npv-section\"] span,\n            [data-testid=\"lyrics-npv-section\"] div,\n            .GtL6v5f4OhSsTWIFTm5j p,\n            .GtL6v5f4OhSsTWIFTm5j span,\n            .GtL6v5f4OhSsTWIFTm5j div {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            .main-card-card {\n                background-color: rgba(255, 255, 255, 0.04) !important;\n                transition: background-color 0.2s ease !important;\n            }\n            .main-card-card:hover {\n                background-color: rgba(255, 255, 255, 0.1) !important;\n            }\n\n            #Desktop_LeftSidebar_Id,\n            .bQsutxbyIOatthweRHfK,\n            [class*=\"bQsutxbyIOatthweRHfK\"],\n            .jpHQLr33ZT5pJGBVFmjJ,\n            [class*=\"jpHQLr33ZT5pJGBVFmjJ\"],\n            .pYAcF6iYbY9AXoobvgmd,\n            .wS8WRtgpp8hCpDALPMTR,\n            [class*=\"wS8WRtgpp8hCpDALPMTR\"],\n            [grid-area=\"left-sidebar\"],\n            .Root__nav-bar,\n            .main-yourLibraryX-entryPoints,\n            .main-yourLibraryX-navItems,\n            [data-testid=\"your-library-x\"],\n            .main-yourLibraryX-libraryRoot,\n            .main-yourLibraryX-libraryContainer,\n            .main-yourLibraryX-library,\n            .main-yourLibraryX-scrollNode,\n            .main-yourLibraryX-isCollapsed,\n            [class*=\"yourLibraryX\"],\n            .Root__nav-bar nav,\n            .main-yourLibraryX-header,\n            aside.main-buddyFeed-container,\n            .Root__right-sidebar {\n                --background-base: rgba(18, 18, 18, var(--we-sidebar-opacity, 0)) !important;\n                background-color: rgba(18, 18, 18, var(--we-sidebar-opacity, 0)) !important;\n                background: rgba(18, 18, 18, var(--we-sidebar-opacity, 0)) !important;\n                background-image: none !important;\n                border-radius: 8px !important;\n            }\n\n            #Desktop_LeftSidebar_Id *,\n            .bQsutxbyIOatthweRHfK *,\n            .jpHQLr33ZT5pJGBVFmjJ *,\n            .wS8WRtgpp8hCpDALPMTR *,\n            .Root__nav-bar *,\n            [data-testid=\"your-library-x\"] * {\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n            }\n\n            .Root__nav-bar svg:not([role=\"search\"] .CJ6qUy8V0xcpm2BAXmsI *),\n            .Root__nav-bar [data-encore-id=\"icon\"],\n            .Root__nav-bar [data-encore-id=\"chip\"],\n            .Root__nav-bar button:not(.JfvAd_noA1Ap88JWjSXb),\n            .Root__nav-bar p,\n            .Root__nav-bar span:not([role=\"search\"] *),\n            .Root__nav-bar a,\n            .Root__nav-bar img,\n            [data-testid=\"your-library-x\"] svg:not([role=\"search\"] .CJ6qUy8V0xcpm2BAXmsI *),\n            [data-testid=\"your-library-x\"] [data-encore-id=\"icon\"],\n            [data-testid=\"your-library-x\"] [data-encore-id=\"chip\"],\n            [data-testid=\"your-library-x\"] p,\n            [data-testid=\"your-library-x\"] span:not([role=\"search\"] *),\n            [data-testid=\"your-library-x\"] a,\n            [data-testid=\"your-library-x\"] button:not(.JfvAd_noA1Ap88JWjSXb),\n            [data-testid=\"your-library-x\"] img {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            [role=\"search\"] input[role=\"searchbox\"],\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) input,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) .ojTYAIsRQtFIMsaigH6a,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) .CJ6qUy8V0xcpm2BAXmsI,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) .CJ6qUy8V0xcpm2BAXmsI *,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) .BhZkB0gqPWkL7muCrc74,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) .BhZkB0gqPWkL7muCrc74 * {\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n                width: 0 !important;\n                min-width: 0 !important;\n                max-width: 0 !important;\n                padding: 0 !important;\n                margin: 0 !important;\n                border: none !important;\n                font-size: 0 !important;\n                line-height: 0 !important;\n                color: transparent !important;\n            }\n\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) button.K1tdqP5dATWqE2bXBrJ2,\n            .VLEMHA84xhh14jNJs1xQ:not(.FPcKeuKmKv0ViAZdaAkL) button[aria-hidden=\"false\"],\n            [role=\"search\"] button.K1tdqP5dATWqE2bXBrJ2 {\n                opacity: 1 !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n            }\n\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL button.K1tdqP5dATWqE2bXBrJ2,\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL button[aria-hidden=\"true\"] {\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n                z-index: -1 !important;\n            }\n\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL input,\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL .ojTYAIsRQtFIMsaigH6a,\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL .CJ6qUy8V0xcpm2BAXmsI,\n            .VLEMHA84xhh14jNJs1xQ.FPcKeuKmKv0ViAZdaAkL .CJ6qUy8V0xcpm2BAXmsI * {\n                opacity: 1 !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n                color: inherit !important;\n                font-size: inherit !important;\n                line-height: inherit !important;\n                width: 188px !important;\n                max-width: 100% !important;\n                padding: 8px 32px !important;\n            }\n\n            .z0qdvwslOFVOAihShLIq,\n            [class*=\"z0qdvwslOFVOAihShLIq\"],\n            .L5dM7nzQpMJtRkvZZBZL,\n            [class*=\"L5dM7nzQpMJtRkvZZBZL\"],\n            [grid-area=\"now-playing-bar\"],\n            .Root__now-playing-bar,\n            .Root__now-playing-bar footer,\n            .main-nowPlayingBar-container,\n            .main-nowPlayingBar-nowPlayingBar,\n            footer,\n            .Q7CmqShAn9DbDiuZrFJg {\n                background-color: rgba(12, 12, 12, var(--we-player-opacity, 0)) !important;\n                background: rgba(12, 12, 12, var(--we-player-opacity, 0)) !important;\n                border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n            }\n\n            .main-nowPlayingBar-container *,\n            .Root__now-playing-bar *,\n            .L5dM7nzQpMJtRkvZZBZL *,\n            [data-testid=\"now-playing-widget\"] *,\n            .player-controls *,\n            .main-nowPlayingBar-right * {\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n            }\n\n            .main-nowPlayingBar-container svg,\n            .main-nowPlayingBar-container button,\n            .main-nowPlayingBar-container img,\n            .main-nowPlayingBar-container a,\n            .main-nowPlayingBar-container span,\n            .main-nowPlayingBar-container p,\n            .playback-bar,\n            .playback-progressbar-isInteractive,\n            [data-testid=\"playback-progressbar\"],\n            .x-progressBar-progressBarBg,\n            .x-progressBar-fillColor {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            .ap_ioWdVFWJkrRicJB8C,\n            [class*=\"ap_ioWdVFWJkrRicJB8C\"],\n            .NTX5QnnAPQ3vbP3jyNlk,\n            [class*=\"NTX5QnnAPQ3vbP3jyNlk\"],\n            .goKxWei7aIJdA857U744,\n            [class*=\"goKxWei7aIJdA857U744\"] {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                box-shadow: none !important;\n                opacity: 1 !important;\n                display: flex !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n            }\n\n            .goKxWei7aIJdA857U744:after,\n            [class*=\"goKxWei7aIJdA857U744\"]:after {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                opacity: 0 !important;\n                display: none !important;\n            }\n\n            .EM9V2npqr6_18FGhODtx,\n            .gig6fTpg9wjxwnYIkuMg,\n            .QUZmsMEchZ10dIQyE93Q,\n            [aria-label*=\"filter\"]:not(input):not([role=\"searchbox\"]),\n            [aria-label*=\"Filter\"]:not(input):not([role=\"searchbox\"]),\n            [aria-label*=\"bộ lọc\"]:not(input):not([role=\"searchbox\"]),\n            [aria-label*=\"Bộ lọc\"]:not(input):not([role=\"searchbox\"]),\n            [data-encore-id=\"chip\"],\n            [class*=\"chip\"],\n            [class*=\"Chip\"],\n            [aria-label*=\"Previous\"],\n            [aria-label*=\"Next\"],\n            [aria-label*=\"Trước\"],\n            [aria-label*=\"Tiếp\"],\n            button[data-testid*=\"chevron\"],\n            [class*=\"chevrons\"],\n            [class*=\"chevron\"],\n            [data-testid*=\"play-button\"],\n            .main-card-card button,\n            [data-encore-id=\"buttonPrimary\"],\n            [data-encore-id=\"buttonSecondary\"],\n            [data-encore-id=\"buttonTertiary\"] {\n                opacity: 1 !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n            }\n\n            .QqprhKqwqIsC3c9SIKOE,\n            [class*=\"QqprhKqwqIsC3c9SIKOE\"],\n            .huL1DwMxKXMSuoZ02LmZ,\n            [class*=\"huL1DwMxKXMSuoZ02LmZ\"],\n            .OAo3buanAkrm481YoQm6,\n            [class*=\"OAo3buanAkrm481YoQm6\"],\n            .OAo3buanAkrm481YoQm6:after,\n            .V7ICuEr1ZBtemPGKXeZb,\n            [class*=\"V7ICuEr1ZBtemPGKXeZb\"],\n            .AJjP1RzhySWiLWVcLlNA,\n            [class*=\"AJjP1RzhySWiLWVcLlNA\"],\n            .xWAGb7rkhYb1eQ8LiDaB,\n            [class*=\"xWAGb7rkhYb1eQ8LiDaB\"],\n            .xWAGb7rkhYb1eQ8LiDaB:after,\n            .hiswRzE0bx1SgRvxBqW0,\n            [class*=\"hiswRzE0bx1SgRvxBqW0\"],\n            .wT74N9ojpAVDTx_TugfQ,\n            [class*=\"wT74N9ojpAVDTx_TugfQ\"],\n            .Zsz_4IzlyaFvu7jBCd06,\n            [class*=\"Zsz_4IzlyaFvu7jBCd06\"],\n            [data-testid=\"overscroll-background\"],\n            [data-testid=\"entity-header\"],\n            .Xx4EJR6ZWcW7jro0XDK2,\n            [class*=\"Xx4EJR6ZWcW7jro0XDK2\"],\n            .main-entityHeader-backgroundColor,\n            .main-entityHeader-overlay,\n            .main-entityHeader-gradient,\n            .main-actionBarBackground-background,\n            .rTHahewpyEmhd4usx52E,\n            [class*=\"rTHahewpyEmhd4usx52E\"],\n            .bP_s9AAlJVbM9CnSKRER,\n            [class*=\"bP_s9AAlJVbM9CnSKRER\"],\n            .As01tIbw5N5_eVOMmA7z,\n            [class*=\"As01tIbw5N5_eVOMmA7z\"],\n            .JpSQVHjL43tApu3BBboT,\n            [class*=\"JpSQVHjL43tApu3BBboT\"],\n            .gwdWMEes3HmtvEn4vSk2,\n            [class*=\"gwdWMEes3HmtvEn4vSk2\"],\n            .GD_sCWOL__rZjEUkNTYA,\n            [class*=\"GD_sCWOL__rZjEUkNTYA\"],\n            .ZU0Qwr33pAxgdxVYR21m,\n            [class*=\"ZU0Qwr33pAxgdxVYR21m\"],\n            .epX9OZEs2WWSRuky6bIs,\n            [class*=\"epX9OZEs2WWSRuky6bIs\"],\n            .ob4NiMt7UN8LQ1UniBIx,\n            [class*=\"ob4NiMt7UN8LQ1UniBIx\"],\n            [data-testid=\"action-bar\"],\n            [data-testid=\"artist-page\"],\n            [data-seamless-gradient],\n            .main-view-container__mh-footer-container,\n            [class*=\"mh-footer-container\"] {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                box-shadow: none !important;\n            }\n\n            .sxMpFt17cJVTesE9u6fX,\n            [class*=\"sxMpFt17cJVTesE9u6fX\"],\n            .oCSWtOAH_CgjIsi_H_PS,\n            [class*=\"oCSWtOAH_CgjIsi_H_PS\"] {\n                display: none !important;\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n            }\n\n            body.we-scrolled .wT74N9ojpAVDTx_TugfQ,\n            body.we-scrolled [class*=\"wT74N9ojpAVDTx_TugfQ\"],\n            body.we-scrolled .Zsz_4IzlyaFvu7jBCd06,\n            body.we-scrolled [class*=\"Zsz_4IzlyaFvu7jBCd06\"],\n            body.we-scrolled [data-testid=\"overscroll-background\"] {\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n            }\n\n            #global-nav-bar,\n            .Root__globalNav,\n            .main-topBar-container,\n            .main-topBar-background,\n            [data-testid=\"top-bar\"],\n            body.we-scrolled #global-nav-bar,\n            body.we-scrolled .Root__globalNav,\n            body.we-scrolled .main-topBar-container,\n            body.we-scrolled .main-topBar-background,\n            body.we-scrolled [data-testid=\"top-bar\"] {\n                background: rgba(18, 18, 18, var(--we-topbar-opacity, 0)) !important;\n                backdrop-filter: blur(var(--we-topbar-blur, 0px)) !important;\n                -webkit-backdrop-filter: blur(var(--we-topbar-blur, 0px)) !important;\n                box-shadow: none !important;\n                border: none !important;\n                border-bottom: none !important;\n            }\n\n            body:not(.we-scrolled) header[data-testid=\"topbar\"],\n            body:not(.we-scrolled) .main-topBar-container,\n            body:not(.we-scrolled) .main-topBar-background,\n            body:not(.we-scrolled) .GnA7hn48eswLETlFDJp4,\n            body:not(.we-scrolled) .Ac2raqVCOQ_HYbbCkBAP,\n            body:not(.we-scrolled) .oCEpJz9qQElJmB4tFybO,\n            .main-actionBar-ActionBarRow,\n            [data-testid=\"action-bar-row\"],\n            .main-actionBarBackground-background {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                box-shadow: none !important;\n                border: none !important;\n            }\n\n            .main-trackList-trackListHeader,\n            [class*=\"trackListHeader\"],\n            .rl0QlbVbrvgO0fB5Pkua,\n            .wS4RXx56HUXHPjf7agj1,\n            .e-10860-table-header-cell,\n            [class*=\"table-header-cell\"] {\n                position: sticky !important;\n                top: var(--we-tracklist-top, 64px) !important;\n                z-index: 10 !important;\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                backdrop-filter: none !important;\n                -webkit-backdrop-filter: none !important;\n                box-shadow: none !important;\n                border: none !important;\n                border-bottom: none !important;\n                transition: background 0.15s ease, background-color 0.15s ease !important;\n            }\n            body:not(.we-tracklist-stuck) .main-trackList-trackListHeader,\n            body:not(.we-tracklist-stuck) [class*=\"trackListHeader\"],\n            body:not(.we-tracklist-stuck) .rl0QlbVbrvgO0fB5Pkua,\n            body:not(.we-tracklist-stuck) .wS4RXx56HUXHPjf7agj1,\n            body:not(.we-tracklist-stuck) .e-10860-table-header-cell,\n            body:not(.we-tracklist-stuck) [class*=\"table-header-cell\"],\n            body:not(.we-tracklist-stuck) .e-10860-table-container--sticky-header .e-10860-table-header-cell,\n            body:not(.we-tracklist-stuck) .e-10860-table-container--is-sticky .e-10860-table-header-cell,\n            body:not(.we-tracklist-stuck) [class*=\"table-container--is-sticky\"] [class*=\"table-header-cell\"],\n            body:not(.we-tracklist-stuck) [class*=\"table-container--sticky-header\"] [class*=\"table-header-cell\"],\n            .main-trackList-trackListHeader:not(.we-tracklist-stuck):not(.wS4RXx56HUXHPjf7agj1):not(.main-trackList-trackListHeaderStuck) {\n                background: transparent !important;\n                background-color: transparent !important;\n                background-image: none !important;\n                backdrop-filter: none !important;\n                -webkit-backdrop-filter: none !important;\n                box-shadow: none !important;\n                border: none !important;\n                border-bottom: none !important;\n            }\n\n            body:not(.we-scrolled) .main-topBar-topbarContent > *,\n            body:not(.we-scrolled) [data-testid=\"topbar-content\"] > *,\n            body:not(.we-scrolled) .main-topBar-title,\n            body:not(.we-scrolled) .main-topBar-topbarContent,\n            body:not(.we-scrolled) .Q1NfqgV_yRJmogHJOsmI > *,\n            body:not(.we-scrolled) [class*=\"Q1NfqgV_yRJmogHJOsmI\"] > * {\n                opacity: 0 !important;\n                visibility: hidden !important;\n                pointer-events: none !important;\n                transform: translateY(6px);\n                transition: opacity 0.2s ease, transform 0.2s ease !important;\n            }\n\n            body.we-scrolled header[data-testid=\"topbar\"],\n            body.we-scrolled .main-topBar-container,\n            body.we-scrolled .main-topBar-background,\n            body.we-scrolled .GnA7hn48eswLETlFDJp4,\n            body.we-scrolled .Ac2raqVCOQ_HYbbCkBAP,\n            body.we-scrolled .oCEpJz9qQElJmB4tFybO {\n                background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--we-page-color, #181818) !important;\n                background-color: var(--we-page-color, #181818) !important;\n                backdrop-filter: blur(25px) !important;\n                -webkit-backdrop-filter: blur(25px) !important;\n                border: none !important;\n                border-bottom: none !important;\n                box-shadow: none !important;\n                opacity: 1 !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n            }\n\n            body.we-tracklist-stuck .main-trackList-trackListHeader,\n            body.we-tracklist-stuck .rl0QlbVbrvgO0fB5Pkua,\n            body.we-tracklist-stuck .wS4RXx56HUXHPjf7agj1,\n            body.we-tracklist-stuck [class*=\"wS4RXx56HUXHPjf7agj1\"],\n            body.we-tracklist-stuck .main-trackList-trackListHeader.we-tracklist-stuck,\n            body.we-tracklist-stuck [class*=\"trackListHeader\"].we-tracklist-stuck,\n            body.we-tracklist-stuck .main-trackList-trackListHeaderStuck,\n            body.we-tracklist-stuck .wS4RXx56HUXHPjf7agj1.rl0QlbVbrvgO0fB5Pkua,\n            body.we-tracklist-stuck [class*=\"trackListHeaderStuck\"],\n            body.we-tracklist-stuck .e-10860-table-header-cell,\n            body.we-tracklist-stuck [class*=\"table-header-cell\"],\n            body.we-tracklist-stuck .e-10860-table-container--sticky-header .e-10860-table-header-cell,\n            body.we-tracklist-stuck .e-10860-table-container--is-sticky .e-10860-table-header-cell,\n            body.we-tracklist-stuck [class*=\"table-container--is-sticky\"] [class*=\"table-header-cell\"],\n            body.we-tracklist-stuck [class*=\"table-container--sticky-header\"] [class*=\"table-header-cell\"] {\n                background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--we-page-color, #181818) !important;\n                background-color: var(--we-page-color, #181818) !important;\n                backdrop-filter: blur(25px) !important;\n                -webkit-backdrop-filter: blur(25px) !important;\n                border: none !important;\n                border-top: none !important;\n                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5) !important;\n                z-index: 10 !important;\n            }\n\n            .Zh3rQRncNEHrT9Zvp61n,\n            [class*=\"Zh3rQRncNEHrT9Zvp61n\"],\n            .WU7dTdoNA51czqGivj8T,\n            [class*=\"WU7dTdoNA51czqGivj8T\"],\n            .cciGXIL4H2kwy1SlhFHO,\n            [class*=\"cciGXIL4H2kwy1SlhFHO\"] {\n                animation: none !important;\n                background: transparent !important;\n                background-color: transparent !important;\n                backdrop-filter: none !important;\n                -webkit-backdrop-filter: none !important;\n                border: none !important;\n                border-bottom: none !important;\n                box-shadow: none !important;\n                transition: background 0.25s ease, background-color 0.25s ease, backdrop-filter 0.25s ease, box-shadow 0.25s ease !important;\n            }\n\n            body.we-right-scrolled .Zh3rQRncNEHrT9Zvp61n,\n            body.we-right-scrolled [class*=\"Zh3rQRncNEHrT9Zvp61n\"],\n            body.we-right-scrolled .WU7dTdoNA51czqGivj8T,\n            body.we-right-scrolled [class*=\"WU7dTdoNA51czqGivj8T\"],\n            body.we-right-scrolled .cciGXIL4H2kwy1SlhFHO,\n            body.we-right-scrolled [class*=\"cciGXIL4H2kwy1SlhFHO\"] {\n                background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), var(--we-page-color, #181818) !important;\n                background-color: var(--we-page-color, #181818) !important;\n                backdrop-filter: blur(25px) !important;\n                -webkit-backdrop-filter: blur(25px) !important;\n                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6) !important;\n                opacity: 1 !important;\n                visibility: visible !important;\n                z-index: 99 !important;\n            }\n\n            .Zh3rQRncNEHrT9Zvp61n *,\n            [class*=\"Zh3rQRncNEHrT9Zvp61n\"] *,\n            .WU7dTdoNA51czqGivj8T *,\n            [class*=\"WU7dTdoNA51czqGivj8T\"] *,\n            .cciGXIL4H2kwy1SlhFHO *,\n            [class*=\"cciGXIL4H2kwy1SlhFHO\"] * {\n                opacity: 1 !important;\n                visibility: visible !important;\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n            }\n\n            .rl0QlbVbrvgO0fB5Pkua *,\n            [class*=\"rl0QlbVbrvgO0fB5Pkua\"] *,\n            .main-trackList-trackListHeaderStuck *,\n            [class*=\"trackListHeaderStuck\"] * {\n                color: #e0e0e0 !important;\n                opacity: 1 !important;\n                visibility: visible !important;\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n            }\n\n            .Q1NfqgV_yRJmogHJOsmI.gDQ_ybfqiGIG_T_lUN7L *,\n            [class*=\"Q1NfqgV_yRJmogHJOsmI\"][class*=\"gDQ_ybfqiGIG_T_lUN7L\"] *,\n            .GnA7hn48eswLETlFDJp4.TjakbamUlMlWoiEysK__ .Q1NfqgV_yRJmogHJOsmI *,\n            body.we-scrolled .Q1NfqgV_yRJmogHJOsmI.gDQ_ybfqiGIG_T_lUN7L *,\n            body.we-scrolled [class*=\"Q1NfqgV_yRJmogHJOsmI\"][class*=\"gDQ_ybfqiGIG_T_lUN7L\"] *,\n            body.we-scrolled .main-topBar-title,\n            body.we-scrolled .main-topBar-topbarContent,\n            body.we-scrolled .zyugqDUpsiWa8v7oczU1 *,\n            body.we-scrolled .cJhY7bOAfbdpUsMavIvn *,\n            body.we-scrolled .ap_ioWdVFWJkrRicJB8C * {\n                opacity: 1 !important;\n                visibility: visible !important;\n                pointer-events: auto !important;\n                transform: translateY(0) !important;\n                -webkit-mask-image: none !important;\n                mask-image: none !important;\n            }\n\n            [data-testid=\"action-bar-row\"] *,\n            .main-actionBar-ActionBarRow * {\n                opacity: 1 !important;\n                visibility: visible !important;\n            }\n\n            #we-float-btn {\n                position: fixed !important;\n                bottom: 100px !important;\n                right: 25px !important;\n                z-index: 99999 !important;\n                background: linear-gradient(135deg, #1ed760, #179e46) !important;\n                color: #000 !important;\n                border: none !important;\n                border-radius: 50px !important;\n                padding: 8px 18px !important;\n                font-weight: 700 !important;\n                font-size: 13px !important;\n                cursor: pointer !important;\n                box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;\n                display: flex !important;\n                align-items: center !important;\n                gap: 6px !important;\n                transition: transform 0.2s ease !important;\n            }\n\n            #we-float-btn:hover {\n                transform: scale(1.06) !important;\n            }\n\n            #we-modal-overlay {\n                position: fixed !important;\n                inset: 0 !important;\n                background: rgba(0,0,0,0.72) !important;\n                z-index: 100000 !important;\n                display: flex !important;\n                align-items: center !important;\n                justify-content: center !important;\n            }\n\n            .we-dialog {\n                background: #1c1c1c !important;\n                border: 1px solid #333 !important;\n                border-radius: 14px !important;\n                padding: 22px 24px !important;\n                width: 480px !important;\n                max-width: 92vw !important;\n                max-height: 90vh !important;\n                overflow-y: auto !important;\n                color: #fff !important;\n                box-shadow: 0 20px 45px rgba(0,0,0,0.85) !important;\n                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif !important;\n            }\n\n            .we-row { margin-bottom: 13px !important; }\n            .we-row label { display: flex; justify-content: space-between; font-size: 13px; color: #b3b3b3; margin-bottom: 5px; }\n            .we-slider { width: 100%; accent-color: #1ed760; cursor: pointer; }\n            \n            .we-btn-group { display: flex; gap: 8px; margin-top: 5px; }\n            .we-btn-pill {\n                flex: 1;\n                background: rgba(255,255,255,0.08);\n                color: #ccc;\n                border: 1px solid rgba(255,255,255,0.1);\n                border-radius: 6px;\n                padding: 7px 10px;\n                font-size: 12px;\n                cursor: pointer;\n                transition: all 0.15s ease;\n                text-align: center;\n            }\n            .we-btn-pill:hover { background: rgba(255,255,255,0.15); color: #fff; }\n            .we-btn-pill.active {\n                background: #1ed760 !important;\n                color: #000 !important;\n                font-weight: 700 !important;\n                border-color: #1ed760 !important;\n            }\n\n            .we-btn-sync {\n                width: 100%;\n                background: #1ed760;\n                color: #000;\n                border: none;\n                border-radius: 8px;\n                padding: 10px;\n                font-weight: 700;\n                font-size: 13px;\n                cursor: pointer;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                gap: 8px;\n            }\n            .we-btn-sync:hover { background: #1fdf64; }\n";

    const DB_NAME = "SpotifyWallpaperEngineDB_v2";
const STORE_NAME = "wallpapers";
const SETTINGS_KEY = "WE_Spotify_Settings_v2";
const BRIDGE_API = "http://127.0.0.1:43196";

const defaultSettings = {
    opacity: 0.35,
    sidebarOpacity: 0,
    playerOpacity: 0,
    headerOpacity: 0.35,
    headerBlur: 0,
    topBarOpacity: 0,
    topBarBlur: 0,
    searchBgColor: "#181818",
    searchBgOpacity: 0.96,
    bgBlur: 8,
    brightness: 95,
    fitMode: "cover",
    position: "center",
    zoom: 100,
    autoSync: true,
    wallpaperPaused: false,
    wallpaperSource: "wallpaper-engine",
    mediaType: "unknown",
    mediaName: "No file selected",
    customMediaName: "",
    lastSyncFile: "",
};

let settings = Object.assign({}, defaultSettings);

function loadSettings() {
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) settings = Object.assign({}, defaultSettings, JSON.parse(saved));
        if (settings.wallpaperSource === undefined) settings.wallpaperSource = "wallpaper-engine";
        if (settings.sidebarOpacity === undefined) settings.sidebarOpacity = 0;
        if (settings.playerOpacity === undefined) settings.playerOpacity = 0;
        if (settings.topBarOpacity === undefined) settings.topBarOpacity = 0;
        if (settings.topBarBlur === undefined) settings.topBarBlur = 0;
        if (settings.wallpaperPaused === undefined) settings.wallpaperPaused = false;
        if (settings.searchBgColor === undefined) settings.searchBgColor = "#181818";
        if (settings.searchBgOpacity === undefined) settings.searchBgOpacity = 0.96;
    } catch (e) {
        console.warn("[Wallpaper Engine] Failed to read localStorage:", e);
    }
    applyVisualSettings();
    return settings;
}

function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) { }
    applyVisualSettings();
}

function applyVisualSettings() {
    document.documentElement.style.setProperty("--we-bg-opacity", settings.opacity);
    document.documentElement.style.setProperty("--we-sidebar-opacity", settings.sidebarOpacity !== undefined ? settings.sidebarOpacity : 0);
    document.documentElement.style.setProperty("--we-player-opacity", settings.playerOpacity !== undefined ? settings.playerOpacity : 0);
    document.documentElement.style.setProperty("--we-header-opacity", settings.headerOpacity !== undefined ? settings.headerOpacity : 0.35);
    document.documentElement.style.setProperty("--we-header-blur", (settings.headerBlur || 0) + "px");
    document.documentElement.style.setProperty("--we-topbar-opacity", settings.topBarOpacity !== undefined ? settings.topBarOpacity : 0);
    document.documentElement.style.setProperty("--we-topbar-blur", (settings.topBarBlur || 0) + "px");
    document.documentElement.style.setProperty("--we-search-bg-color", settings.searchBgColor || "#181818");
    document.documentElement.style.setProperty("--we-search-bg-opacity", settings.searchBgOpacity !== undefined ? settings.searchBgOpacity : 0.96);
    document.documentElement.style.setProperty("--we-img-blur", (settings.bgBlur || 0) + "px");
    document.documentElement.style.setProperty("--we-img-brightness", (settings.brightness || 100) + "%");
    document.documentElement.style.setProperty("--we-fit-mode", settings.fitMode || "cover");
    document.documentElement.style.setProperty("--we-pos", settings.position || "center");
    document.documentElement.style.setProperty("--we-zoom", settings.zoom || 100);

    if (settings.wallpaperPaused) {
        document.body.classList.add("we-wallpaper-paused");
    } else {
        document.body.classList.remove("we-wallpaper-paused");
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function saveMedia(blob, name, type) {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put({ blob, name, type }, "current_media");
        settings.customMediaName = name;
        settings.mediaName = name;
        settings.mediaType = type;
        settings.wallpaperSource = "custom-video";
        saveSettings();
    } catch (e) {
        console.warn("[Wallpaper Engine] Failed to save DB:", e);
    }
}

async function loadSavedMedia() {
    try {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, "readonly");
            const req = tx.objectStore(STORE_NAME).get("current_media");
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        return null;
    }
}

    let imageEl = null;
let videoEl = null;
let isSyncing = false;
let syncAbort = null;

function applyPauseState() {
    if (!videoEl) videoEl = document.getElementById("we-video");
    if (videoEl) {
        if (settings.wallpaperPaused) {
            videoEl.pause();
        } else if (videoEl.src && !videoEl.classList.contains("we-media-hidden")) {
            videoEl.play().catch(() => {});
        }
    }
    window.dispatchEvent(new CustomEvent("we-pause-changed", { detail: { paused: settings.wallpaperPaused } }));
}

function toggleWallpaperPause(paused) {
    if (paused === undefined) {
        settings.wallpaperPaused = !settings.wallpaperPaused;
    } else {
        settings.wallpaperPaused = paused;
    }
    saveSettings();
    applyPauseState();
    if (window.Spicetify && Spicetify.showNotification) {
        Spicetify.showNotification(
            settings.wallpaperPaused ? "Wallpaper / Video Paused" : "Wallpaper / Video Resumed"
        );
    }
}

function renderMedia(source, type = "") {
    try {
        if (!imageEl) imageEl = document.getElementById("we-image");
        if (!videoEl) videoEl = document.getElementById("we-video");
        if (!imageEl || !videoEl) return;

        const isBlob = typeof source !== "string";
        const url = isBlob ? URL.createObjectURL(source) : source;
        const isVideo = (type && type.startsWith("video/")) ||
            (typeof source === "string" && source.match(/\.(mp4|webm|mkv|mov)($|\?)/i)) ||
            (isBlob && source.type && source.type.startsWith("video/"));

        if (isVideo) {
            imageEl.classList.add("we-media-hidden");

            videoEl.muted = true;
            videoEl.defaultMuted = true;
            videoEl.volume = 0;
            videoEl.loop = true;
            videoEl.playsInline = true;
            videoEl.autoplay = true;

            videoEl.onerror = () => {
                const err = videoEl.error;
                console.error("[Wallpaper Engine] videoEl playback error:", err);
                const code = err ? err.code : 0;
                let msg = "Video playback error";
                if (code === 4) {
                    msg = "Spotify CEF does not support MP4 H.264 directly. Please convert to .webm (VP8/VP9) or .gif!";
                }
                if (window.Spicetify && Spicetify.showNotification) {
                    Spicetify.showNotification(msg);
                }
                updateBridgeStatusUI(false, msg);
            };

            videoEl.onloadeddata = () => {
                videoEl.classList.remove("we-media-hidden");
                videoEl.style.setProperty("display", "block", "important");
                if (!settings.wallpaperPaused) {
                    videoEl.play().catch((e) => {
                        console.warn("[Wallpaper Engine] Autoplay failed:", e);
                    });
                }
            };

            videoEl.src = url;
            videoEl.load();
        } else {
            videoEl.pause();
            videoEl.classList.add("we-media-hidden");
            imageEl.onload = () => {
                imageEl.classList.remove("we-media-hidden");
                imageEl.style.setProperty("display", "block", "important");
            };
            imageEl.onerror = () => {
                console.warn("[Wallpaper Engine] Waiting to reload image from bridge...");
            };
            imageEl.src = url;
        }
    } catch (err) {
        console.error("[Wallpaper Engine] renderMedia error:", err);
    }
}

async function loadAndApplyCustomMedia() {
    try {
        const saved = await loadSavedMedia();
        if (saved && saved.blob) {
            renderMedia(saved.blob, saved.type || "video/mp4");
            if (saved.name) {
                settings.mediaName = saved.name;
                settings.customMediaName = saved.name;
            }
            updateBridgeStatusUI(true, "Custom Video: " + (saved.name || "Active"));
            return true;
        }
    } catch (e) {
        console.warn("[Wallpaper Engine] Error loading custom media:", e);
    }
    return false;
}

async function setWallpaperSource(source) {
    settings.wallpaperSource = source;
    saveSettings();

    if (source === "custom-video") {
        const loaded = await loadAndApplyCustomMedia();
        if (!loaded) {
            const fileInput = document.getElementById("we-file");
            if (fileInput) fileInput.click();
        }
        if (window.Spicetify && Spicetify.showNotification) {
            Spicetify.showNotification("Switched to Custom Video / Local File");
        }
    } else {
        await syncFromWallpaperEngine(true);
        if (window.Spicetify && Spicetify.showNotification) {
            Spicetify.showNotification("Switched to Wallpaper Engine Sync");
        }
    }
    window.dispatchEvent(new CustomEvent("we-source-changed", { detail: { source } }));
}

function toggleWallpaperSource() {
    const next = settings.wallpaperSource === "custom-video" ? "wallpaper-engine" : "custom-video";
    return setWallpaperSource(next);
}

function setupContainer() {
    if (document.getElementById("we-container")) return;
    const container = document.createElement("div");
    container.id = "we-container";
    container.innerHTML = `
        <img id="we-image" class="we-media-hidden" />
        <video id="we-video" class="we-media-hidden" autoplay loop muted playsinline></video>
        <div id="we-overlay"></div>
    `;
    document.body.prepend(container);

    imageEl = document.getElementById("we-image");
    videoEl = document.getElementById("we-video");
    applyVisualSettings();
    applyPauseState();

    if (settings.wallpaperSource === "custom-video") {
        loadAndApplyCustomMedia();
    } else {
        syncFromWallpaperEngine(false);
    }
}

async function syncFromWallpaperEngine(manual = false) {
    if (settings.wallpaperSource === "custom-video" && !manual) return;
    if (isSyncing) return;
    try {
        isSyncing = true;
        if (syncAbort) {
            try { syncAbort.abort(); } catch {}
        }
        syncAbort = new AbortController();
        const timeoutId = setTimeout(() => syncAbort.abort(), 5000);

        let res;
        try {
            res = await fetch(`${BRIDGE_API}/api/current`, {
                cache: "no-store",
                signal: syncAbort.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }
        if (!res.ok) throw new Error("Bridge not ready");
        const data = await res.json();

        if (data.status === "ok" && data.mediaUrl) {
            if (settings.wallpaperPaused && !manual) {
                isSyncing = false;
                return;
            }

            const hasValidImage = imageEl && imageEl.src && imageEl.src !== "" && imageEl.naturalWidth > 0;
            const hasValidVideo = videoEl && videoEl.src && videoEl.src !== "";
            if (data.fileName === settings.lastSyncFile && (hasValidImage || hasValidVideo) && !manual) {
                isSyncing = false;
                updateBridgeStatusUI(true, data.title);
                return;
            }

            settings.lastSyncFile = data.fileName;
            settings.mediaName = `${data.title} (${data.fileName})`;
            settings.mediaType = data.mediaType;
            saveSettings();

            renderMedia(data.mediaUrl, data.mediaType);

            if (manual && window.Spicetify && Spicetify.showNotification) {
                Spicetify.showNotification("Synced: " + data.title);
            }

            updateBridgeStatusUI(true, data.title);
        } else {
            updateBridgeStatusUI(false, "No wallpaper found");
        }
    } catch (e) {
        updateBridgeStatusUI(false, "Bridge is not running (start-sync.bat)");
        if (manual && window.Spicetify && Spicetify.showNotification) {
            Spicetify.showNotification("Bridge is not running (start-sync.bat)");
        }
    } finally {
        isSyncing = false;
    }
}

function updateBridgeStatusUI(connected, text) {
    const badge = document.getElementById("we-bridge-status");
    if (badge) {
        badge.innerHTML = connected
            ? `<span style="color:#1ed760;">Connected: ${text}</span>`
            : `<span style="color:#ff5555;"> ${text}</span>`;
    }
}

function startAutoSyncWatcher() {
    setInterval(() => {
        if (settings.wallpaperSource === "wallpaper-engine" && settings.autoSync && !settings.wallpaperPaused) {
            syncFromWallpaperEngine(false);
        }
    }, 3000);
}

    const isValidColor = (col) => {
    if (!col || typeof col !== "string") return false;
    col = col.trim().toLowerCase();
    if (col === "transparent" || col === "inherit" || col === "initial") return false;
    if (col.startsWith("rgba(18, 18, 18") || col.startsWith("rgb(18, 18, 18)")) return false;
    if (col.startsWith("rgba(0, 0, 0") || col === "rgb(0, 0, 0)") return false;
    if (col === "#000" || col === "#000000" || col === "#121212" || col === "#181818") return false;
    return true;
};

const parseColorString = (str) => {
    if (!str) return null;
    const rgbMatch = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+\s*)?\)/i);
    if (rgbMatch) {
        const [_, r, g, b] = rgbMatch;
        return `rgb(${r}, ${g}, ${b})`;
    }
    const hexMatch = str.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/);
    if (hexMatch) return hexMatch[0];
    return null;
};

const getStyleColor = (el) => {
    if (!el) return null;
    try {
        const cssVar = el.style?.getPropertyValue?.("--background-base");
        if (cssVar && isValidColor(cssVar)) return cssVar.trim();

        if (el.style?.backgroundColor && isValidColor(el.style.backgroundColor)) {
            return el.style.backgroundColor;
        }

        if (el.style?.background) {
            const parsed = parseColorString(el.style.background);
            if (parsed && isValidColor(parsed)) return parsed;
        }

        const comp = window.getComputedStyle(el);
        if (comp) {
            const compVar = comp.getPropertyValue("--background-base");
            if (compVar && isValidColor(compVar)) return compVar.trim();
        }
    } catch {}
    return null;
};

const extractFromImage = (img) => {
    try {
        if (!img || !img.complete || !img.naturalWidth) return null;
        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        const col = `rgb(${r}, ${g}, ${b})`;
        if (isValidColor(col)) return col;
    } catch {}
    return null;
};

const extractAlbumColor = () => {
    const topBarBgs = document.querySelectorAll('.main-topBar-background, .Ac2raqVCOQ_HYbbCkBAP, [data-testid="topbar"] > div:first-child');
    for (const el of topBarBgs) {
        const col = getStyleColor(el);
        if (col) return col;
    }

    const underMain = document.querySelector('.under-main-view');
    if (underMain) {
        const col = getStyleColor(underMain);
        if (col) return col;
        try {
            const compBg = window.getComputedStyle(underMain).backgroundColor;
            if (isValidColor(compBg)) return compBg;
        } catch {}
    }

    const entityBg = document.querySelector('.main-entityHeader-backgroundColor');
    if (entityBg) {
        const col = getStyleColor(entityBg);
        if (col) return col;
    }

    const elemsWithVar = document.querySelectorAll('[style*="--background-base"]');
    for (const el of elemsWithVar) {
        if (el.closest('.Root__nav-bar') || el.closest('#Desktop_LeftSidebar_Id')) continue;
        const col = getStyleColor(el);
        if (col) return col;
    }

    const headerElems = document.querySelectorAll(`
        [data-testid="entity-header"],
        .main-entityHeader-container,
        .main-entityHeader-overlay,
        .main-view-container__scroll-node > div:first-child,
        [data-testid="playlist-page"] > div:first-child
    `);
    for (const el of headerElems) {
        const col = getStyleColor(el);
        if (col) return col;
    }

    const img = document.querySelector(`
        .main-entityHeader-image img,
        [data-testid="entity-header"] img,
        .main-image-image,
        [data-testid="playlist-image"] img
    `);
    if (img) {
        const col = extractFromImage(img);
        if (col) return col;
    }

    return null;
};

let lastExtractedUri = "";
const fetchSpicetifyColor = () => {
    try {
        if (window.Spicetify?.colorExtractor) {
            const pathname = window.Spicetify.Platform?.History?.location?.pathname || "";
            let uri = pathname.replace(/^\//, 'spotify:').replace(/\//g, ':');
            if (!uri || uri === 'spotify:' || uri.startsWith('spotify:search')) {
                uri = window.Spicetify.Player?.data?.item?.uri;
            }
            if (uri && uri !== lastExtractedUri) {
                lastExtractedUri = uri;
                window.Spicetify.colorExtractor(uri).then(colors => {
                    if (colors) {
                        const col = colors.VIBRANT || colors.PROMINENT || colors.DARK_VIBRANT || colors.LIGHT_VIBRANT;
                        if (col && isValidColor(col)) {
                            document.documentElement.style.setProperty('--we-page-color', col);
                        }
                    }
                }).catch(() => {});
            }
        }
    } catch {}
};

    function setupScrollWatcher() {
    const syncColorAndScroll = (e) => {
        fetchSpicetifyColor();
        const pageColor = extractAlbumColor();
        if (pageColor) {
            document.documentElement.style.setProperty('--we-page-color', pageColor);
        }

        let isPastBanner = false;
        const actionBar = document.querySelector(
            '.main-actionBar-ActionBarRow, [data-testid="action-bar-row"]'
        );
        const mainViewContainer = document.querySelector(
            '.Root__main-view, [grid-area="main-view"], .main-view-container'
        );

        if (actionBar && mainViewContainer && mainViewContainer.contains(actionBar)) {
            const actionRect = actionBar.getBoundingClientRect();
            if (actionRect.bottom <= 64) {
                isPastBanner = true;
            }
        } else {
            const scrollContainers = document.querySelectorAll(
                '.Root__main-view .os-viewport, .Root__main-view [data-overlayscrollbars-viewport], .main-view-container__scroll-node, [grid-area="main-view"] [data-overlayscrollbars-viewport]'
            );
            scrollContainers.forEach(c => {
                if (c && typeof c.scrollTop === 'number' && c.scrollTop > 320) {
                    isPastBanner = true;
                }
            });
        }

        const shouldBeScrolled = isPastBanner;

        if (shouldBeScrolled) {
            if (!document.body.classList.contains("we-scrolled")) {
                document.body.classList.add("we-scrolled");
            }
        } else {
            if (document.body.classList.contains("we-scrolled")) {
                document.body.classList.remove("we-scrolled");
            }
        }

        let targetTop = 64;
        const topBarEl = document.querySelector('header[data-testid="topbar"], .main-topBar-container, #global-nav-bar');
        if (topBarEl) {
            const r = topBarEl.getBoundingClientRect();
            if (r.height > 0) targetTop = Math.round(r.height);
        }
        document.documentElement.style.setProperty('--we-tracklist-top', targetTop + 'px');

        let isTracklistStuck = false;
        const trackHeader = document.querySelector(
            '.main-trackList-trackListHeader, [data-testid="track-list-header"], .rl0QlbVbrvgO0fB5Pkua, .wS4RXx56HUXHPjf7agj1, [class*="trackListHeader"]'
        );
        if (trackHeader) {
            const trackRect = trackHeader.getBoundingClientRect();
            if (trackRect.top <= targetTop + 2 && trackRect.height > 0) {
                isTracklistStuck = true;
            }
        }

        if (isTracklistStuck) {
            if (!document.body.classList.contains("we-tracklist-stuck")) {
                document.body.classList.add("we-tracklist-stuck");
            }
            if (trackHeader) trackHeader.classList.add("we-tracklist-stuck");
        } else {
            if (document.body.classList.contains("we-tracklist-stuck")) {
                document.body.classList.remove("we-tracklist-stuck");
            }
            if (trackHeader) trackHeader.classList.remove("we-tracklist-stuck");
        }


        const rightSidebar = document.querySelector(
            '.Root__right-sidebar, [grid-area="right-sidebar"], #Desktop_PanelContainer_Id, aside.main-buddyFeed-container'
        );
        let isRightScrolled = false;
        if (rightSidebar) {
            const visual = rightSidebar.querySelector(
                '.caAOfYXiCAm8Vhi8McGl, [class*="caAOfYXiCAm8Vhi8McGl"], [class*="VisualFrame"], .y6OKifI7z4sW24WtUOtl, [data-npv-root] img, [data-npv-root] video'
            );
            const header = rightSidebar.querySelector(
                '.Zh3rQRncNEHrT9Zvp61n, [class*="Zh3rQRncNEHrT9Zvp61n"], .WU7dTdoNA51czqGivj8T, .cciGXIL4H2kwy1SlhFHO'
            );
            const headerBottom = header ? header.getBoundingClientRect().bottom : 64;

            if (visual) {
                const visualRect = visual.getBoundingClientRect();
                if (visualRect.bottom <= headerBottom + 10) {
                    isRightScrolled = true;
                }
            } else {
                const rightViewports = rightSidebar.querySelectorAll(
                    '.os-viewport, [data-overlayscrollbars-viewport], [class*="scroll"], [class*="Scroll"]'
                );
                rightViewports.forEach(vp => {
                    if (vp && typeof vp.scrollTop === 'number' && vp.scrollTop > 180) {
                        isRightScrolled = true;
                    }
                });
            }
        }
        if (isRightScrolled) {
            if (!document.body.classList.contains("we-right-scrolled")) {
                document.body.classList.add("we-right-scrolled");
            }
        } else {
            if (document.body.classList.contains("we-right-scrolled")) {
                document.body.classList.remove("we-right-scrolled");
            }
        }
    };

    window.addEventListener('scroll', syncColorAndScroll, { capture: true, passive: true });

    const attachScroll = () => {
        const scrollContainers = document.querySelectorAll(
            '.os-viewport, [data-overlayscrollbars-viewport], .main-view-container__scroll-node, .main-view-container__scroll-node-child, [data-testid="main-view"], .main-view-container, .Root__main-view, .Root__right-sidebar, [data-testid="now-playing-view"], main'
        );
        scrollContainers.forEach(container => {
            if (container.__we_scroll_bound__) return;
            container.__we_scroll_bound__ = true;
            container.addEventListener('scroll', syncColorAndScroll, { passive: true });
        });
    };
    attachScroll();
    setInterval(attachScroll, 1000);
    setInterval(syncColorAndScroll, 200);

    try {
        if (window.Spicetify?.Platform?.History?.listen) {
            window.Spicetify.Platform.History.listen(() => {
                setTimeout(syncColorAndScroll, 100);
                setTimeout(syncColorAndScroll, 500);
                setTimeout(syncColorAndScroll, 1200);
            });
        }
    } catch {}
}

    function updateTopbarPauseBtn() {
    const pauseBtn = document.getElementById("we-topbar-pause-btn");
    if (!pauseBtn) return;
    if (settings.wallpaperPaused) {
        pauseBtn.classList.add("we-is-paused");
        pauseBtn.title = "Resume Video / Wallpaper (Ctrl+Shift+P)";
        pauseBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
    } else {
        pauseBtn.classList.remove("we-is-paused");
        pauseBtn.title = "Pause Video / Wallpaper (Ctrl+Shift+P)";
        pauseBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
            </svg>
        `;
    }
}

function updateTopbarSourceBtn() {
    const srcBtn = document.getElementById("we-topbar-source-btn");
    if (!srcBtn) return;
    const isCustom = settings.wallpaperSource === "custom-video";
    if (isCustom) {
        srcBtn.classList.add("we-is-custom");
        srcBtn.title = "Source: Custom Video (Click to switch to Wallpaper Engine - Ctrl+Shift+S)";
        srcBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
        `;
    } else {
        srcBtn.classList.remove("we-is-custom");
        srcBtn.title = "Source: Wallpaper Engine (Click to switch to Custom Video - Ctrl+Shift+S)";
        srcBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
        `;
    }
}

function setupTopBarControls() {
    setInterval(() => {
        const navBar = document.querySelector('#global-nav-bar, [aria-label="global-nav-bar"], .Root__globalNav');
        if (!navBar) return;

        const rightGroup = (navBar.children && navBar.children.length >= 3)
            ? navBar.children[navBar.children.length - 1]
            : (navBar.lastElementChild || navBar);

        let controlsGroup = document.getElementById("we-topbar-controls-group");
        if (!controlsGroup) {
            controlsGroup = document.createElement("div");
            controlsGroup.id = "we-topbar-controls-group";
            if (rightGroup.firstElementChild) {
                rightGroup.insertBefore(controlsGroup, rightGroup.firstElementChild);
            } else {
                rightGroup.appendChild(controlsGroup);
            }
        } else if (controlsGroup.parentElement !== rightGroup) {
            if (rightGroup.firstElementChild) {
                rightGroup.insertBefore(controlsGroup, rightGroup.firstElementChild);
            } else {
                rightGroup.appendChild(controlsGroup);
            }
        }

        let pauseBtn = document.getElementById("we-topbar-pause-btn");
        if (!pauseBtn) {
            pauseBtn = document.createElement("button");
            pauseBtn.id = "we-topbar-pause-btn";
            pauseBtn.type = "button";
            pauseBtn.onmousedown = (e) => e.stopPropagation();
            pauseBtn.onpointerdown = (e) => e.stopPropagation();
            pauseBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWallpaperPause();
            };
            controlsGroup.appendChild(pauseBtn);
            updateTopbarPauseBtn();
        } else if (pauseBtn.parentElement !== controlsGroup) {
            controlsGroup.appendChild(pauseBtn);
        }

        let srcBtn = document.getElementById("we-topbar-source-btn");
        if (!srcBtn) {
            srcBtn = document.createElement("button");
            srcBtn.id = "we-topbar-source-btn";
            srcBtn.type = "button";
            srcBtn.onmousedown = (e) => e.stopPropagation();
            srcBtn.onpointerdown = (e) => e.stopPropagation();
            srcBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWallpaperSource();
            };
            controlsGroup.appendChild(srcBtn);
            updateTopbarSourceBtn();
        } else if (srcBtn.parentElement !== controlsGroup) {
            controlsGroup.appendChild(srcBtn);
        }

        const topbarMarketplace = document.querySelectorAll(
            '.custom-navlinks-scrollable_container, #global-nav-bar .custom-navlink, .Root__globalNav .custom-navlink, #global-nav-bar [aria-label*="Marketplace"], .main-globalNav-historyButtons ~ .custom-navlinks-scrollable_container'
        );
        topbarMarketplace.forEach((el) => {
            if (el.style.display !== "none") el.style.setProperty("display", "none", "important");
        });
    }, 800);

    window.addEventListener("we-pause-changed", () => {
        updateTopbarPauseBtn();
    });

    window.addEventListener("we-source-changed", () => {
        updateTopbarSourceBtn();
    });
}

function setupSidebarControls() {
    function getSidebarTarget() {
        const headerBtnGroup = document.querySelector(
            'header .EXufBYN45LoUdBAn829X, [data-testid="your-library-x"] header .EXufBYN45LoUdBAn829X, .YourLibraryX header .EXufBYN45LoUdBAn829X, header .XEP6zra7FO94Q2YIHXs3'
        );
        if (headerBtnGroup) return { container: headerBtnGroup, insertBeforeFirst: true };

        const fallbackHeader = document.querySelector(
            '[data-testid="your-library-x"] header, .YourLibraryX header, #Desktop_LeftSidebar_Id header, .Root__nav-bar header'
        );
        if (fallbackHeader) return { container: fallbackHeader, insertBeforeFirst: false };

        const entryPoints = document.querySelector(
            '.main-yourLibraryX-entryPoints, .main-yourLibraryX-navItems, #Desktop_LeftSidebar_Id nav, .Root__nav-bar nav'
        );
        if (entryPoints) return { container: entryPoints, insertBeforeFirst: false };

        return null;
    }

    function createOrUpdateSidebarBtn() {
        const target = getSidebarTarget();
        if (!target || !target.container) return;

        let btn = document.getElementById("we-sidebar-marketplace-btn");
        if (!btn) {
            btn = document.createElement("button");
            btn.id = "we-sidebar-marketplace-btn";
            btn.type = "button";
            btn.title = "Marketplace";
            btn.setAttribute("aria-label", "Marketplace");
            btn.innerHTML = `
                <svg viewBox="0 0 76.465 68.262">
                    <path d="M151.909 72.923v6.5h10.097l8.663 44.567h48.968v-6.5h-43.61l-1.2-6.172h42.974l10.35-33.91h-59.915l-.872-4.485H151.91zm17.59 10.984h49.867l-6.393 20.91h-39.409l-4.064-20.91zm5.626 44.11a6.5 6.5 0 0 0-6.5 6.5 6.5 0 0 0 6.5 6.501 6.5 6.5 0 0 0 6.5-6.5 6.5 6.5 0 0 0-6.5-6.5zm38.274 0a6.5 6.5 0 0 0-6.5 6.5 6.5 0 0 0 6.5 6.501 6.5 6.5 0 0 0 6.5-6.5 6.5 6.5 0 0 0-6.5-6.5z" transform="translate(-151.909 -72.923)"/>
                </svg>
            `;
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.Spicetify && Spicetify.Platform && Spicetify.Platform.History) {
                    Spicetify.Platform.History.push("/marketplace");
                } else {
                    const topLink = document.querySelector('button.custom-navlink[aria-label*="Marketplace"], #global-nav-bar a[href="/marketplace"]');
                    if (topLink) {
                        topLink.click();
                    } else {
                        window.location.hash = "/marketplace";
                    }
                }
            };
            if (window.Spicetify && Spicetify.Tippy && Spicetify.TippyProps) {
                try {
                    Spicetify.Tippy(btn, { content: "Marketplace", ...Spicetify.TippyProps });
                } catch (_) {}
            }
        }

        const isMarketplace = (window.Spicetify && Spicetify.Platform && Spicetify.Platform.History && Spicetify.Platform.History.location && Spicetify.Platform.History.location.pathname && Spicetify.Platform.History.location.pathname.startsWith("/marketplace"))
            || (window.location && (window.location.pathname.startsWith("/marketplace") || window.location.hash.includes("marketplace")));
        if (isMarketplace) {
            btn.classList.add("we-active");
        } else {
            btn.classList.remove("we-active");
        }

        if (btn.parentElement !== target.container) {
            if (target.insertBeforeFirst && target.container.firstElementChild) {
                target.container.insertBefore(btn, target.container.firstElementChild);
            } else {
                target.container.appendChild(btn);
            }
        }
    }

    createOrUpdateSidebarBtn();
    setInterval(createOrUpdateSidebarBtn, 800);
    if (window.Spicetify && Spicetify.Platform && Spicetify.Platform.History && Spicetify.Platform.History.listen) {
        try {
            Spicetify.Platform.History.listen(() => {
                createOrUpdateSidebarBtn();
            });
        } catch (_) {}
    }
}

function setupUI() {
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === "W" || e.key === "w")) {
            openModal();
        }
        if (e.ctrlKey && e.shiftKey && (e.key === "P" || e.key === "p")) {
            toggleWallpaperPause();
        }
        if (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
            toggleWallpaperSource();
        }
    });

    if (!document.getElementById("we-float-btn")) {
        const btn = document.createElement("button");
        btn.id = "we-float-btn";
        btn.title = "Wallpaper Settings (Ctrl+Shift+W)";
        btn.innerHTML = `<span>Wallpaper</span>`;
        btn.onclick = openModal;
        document.body.appendChild(btn);
    }

    setupTopBarControls();
    setupSidebarControls();

    document.addEventListener("dragover", (e) => { e.preventDefault(); });
    document.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const isMedia = file.type.startsWith("image/") || file.type.startsWith("video/") || file.name.match(/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov|mkv)$/i);
            if (isMedia) {
                const type = file.type || (file.name.match(/\.(mp4|webm|mov|mkv)$/i) ? "video/mp4" : "image/jpeg");
                saveMedia(file, file.name, type);
                renderMedia(file, type);
                window.dispatchEvent(new CustomEvent("we-source-changed", { detail: { source: "custom-video" } }));
                if (window.Spicetify && Spicetify.showNotification) {
                    Spicetify.showNotification("Loaded custom media: " + file.name);
                }
            }
        }
    });
}

    function openModal() {
        if (document.getElementById("we-modal-overlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "we-modal-overlay";
        overlay.innerHTML = `
            <div class="we-dialog">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                    <h2 style="margin:0; font-size:1.15rem; font-weight:700;">Wallpaper Engine & Dimensions</h2>
                    <button id="we-close"style="background:none; border:none; color:#aaa; font-size:24px; cursor:pointer;">&times;</button>
                </div>

                <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px; margin-bottom:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="font-weight:700; font-size:13px;">Wallpaper Source:</span>
                        <span id="we-current-source-badge" style="font-size:11px; padding:2px 8px; border-radius:12px; background:${settings.wallpaperSource === 'custom-video' ? 'rgba(80,155,245,0.15)' : 'rgba(30,215,96,0.15)'}; color:${settings.wallpaperSource === 'custom-video' ? '#509bf5' : '#1ed760'}; font-weight:600;">
                            ${settings.wallpaperSource === "custom-video" ? "Custom Video" : "Wallpaper Engine"}
                        </span>
                    </div>

                    <div class="we-btn-group" id="we-source-group" style="margin-bottom:12px;">
                        <button class="we-btn-pill ${settings.wallpaperSource !== 'custom-video' ? 'active' : ''}" id="we-btn-src-we" data-source="wallpaper-engine">
                            Wallpaper Engine
                        </button>
                        <button class="we-btn-pill ${settings.wallpaperSource === 'custom-video' ? 'active' : ''}" id="we-btn-src-custom" data-source="custom-video">
                            Custom Video / File
                        </button>
                    </div>

                    <div id="we-panel-we" style="display:${settings.wallpaperSource !== 'custom-video' ? 'block' : 'none'};">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <span style="font-size:12px; color:#aaa;">Connection:</span>
                            <div id="we-bridge-status" style="font-size:12px;">Checking connection...</div>
                        </div>
                        <button class="we-btn-sync" id="we-btn-sync-now">Sync from Wallpaper Engine Now</button>
                        <label style="display:flex; align-items:center; gap:8px; margin-top:8px; font-size:12px; color:#bbb; cursor:pointer;">
                            <input type="checkbox" id="we-chk-autosync" ${settings.autoSync ? "checked" : ""} style="accent-color:#1ed760;" />Auto-sync wallpaper with Wallpaper Engine (Realtime)
                        </label>
                        <div style="font-size:11px; color:#888; margin-top:8px; line-height:1.4;">
                            Note: Some wallpapers may not function properly or may fail to display due to technical limitations. Compatibility will be improved in future updates.
                        </div>
                    </div>

                    <div id="we-panel-custom" style="display:${settings.wallpaperSource === 'custom-video' ? 'block' : 'none'};">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <span style="font-size:12px; color:#aaa;">Active Media:</span>
                            <span id="we-custom-name" style="font-size:12px; color:#509bf5; font-weight:600; text-overflow:ellipsis; overflow:hidden; max-width:230px; white-space:nowrap;">
                                ${settings.customMediaName || settings.mediaName || "No file selected"}
                            </span>
                        </div>
                        <button class="we-btn-sync" id="we-btn-pick-custom" style="background:#2e77d0; color:#fff;">
                            Select / Change Video or Image
                        </button>
                        <input type="file" id="we-file" accept="video/webm,video/mp4,image/gif,image/jpeg,image/png,image/webp" style="display:none;" />
                        <div style="font-size:11px; color:#aaa; margin-top:6px; text-align:center; line-height:1.4;">
                            Supports <code>.webm</code> videos, <code>.gif</code> animations, and <code>.png, .jpg, .webp</code> images.<br>
                            <span style="color:#eab308; font-size:10px;">(Note: MP4 files require conversion to .webm via tools/convert-to-webm.bat for live playback)</span>
                        </div>
                    </div>

                    <button class="we-btn-pill ${settings.wallpaperPaused ? 'active' : ''}" id="we-btn-toggle-pause" style="margin-top:10px; width:100%; display:flex; align-items:center; justify-content:center; gap:8px;">
                        ${settings.wallpaperPaused ? 'Resume Video / Wallpaper' : 'Pause Video / Wallpaper'}
                    </button>
                </div>

                
                <div style="background:rgba(30,215,96,0.06); border:1px solid rgba(30,215,96,0.25); border-radius:10px; padding:12px; margin-bottom:14px;">
                    <div style="font-weight:700; font-size:13px; color:#1ed760; margin-bottom:8px;">Wallpaper Size & Position:</div>

                    <div class="we-row"style="margin-bottom:8px !important;">
                        <label><span>Display Fit Mode:</span></label>
                        <div class="we-btn-group"id="we-fit-group">
                            <button class="we-btn-pill ${settings.fitMode === 'cover' ? 'active' : ''}"data-val="cover">Cover (Fill Frame)</button>
                            <button class="we-btn-pill ${settings.fitMode === 'contain' ? 'active' : ''}"data-val="contain">Contain (Fit All)</button>
                            <button class="we-btn-pill ${settings.fitMode === 'fill' ? 'active' : ''}"data-val="fill">Stretch (Fill)</button>
                        </div>
                    </div>

                    <div class="we-row"style="margin-bottom:8px !important;">
                        <label><span>Focus Alignment:</span></label>
                        <div class="we-btn-group"id="we-pos-group">
                            <button class="we-btn-pill ${settings.position === 'top' ? 'active' : ''}"data-val="top">Top (Focus Head)</button>
                            <button class="we-btn-pill ${settings.position === 'center' ? 'active' : ''}"data-val="center">Center</button>
                            <button class="we-btn-pill ${settings.position === 'bottom' ? 'active' : ''}"data-val="bottom">Bottom</button>
                        </div>
                    </div>

                    <div class="we-row"style="margin-bottom:0 !important;">
                        <label><span>Zoom:</span>
                            <b id="we-zoom-val">${settings.zoom || 100}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-zoom"min="60"max="160"value="${settings.zoom || 100}">
                    </div>
                </div>

                
                <div class="we-row">
                    <label><span>Wallpaper Blur:</span>
                        <b id="we-bl-val">${settings.bgBlur || 0}px</b>
                    </label>
                    <input type="range"class="we-slider"id="we-bl"min="0"max="30"value="${settings.bgBlur || 0}">
                </div>

                <div class="we-row">
                    <label><span>Spotify Darkness:</span>
                        <b id="we-op-val">${Math.round(settings.opacity * 100)}%</b>
                    </label>
                    <input type="range"class="we-slider"id="we-op"min="0"max="90"value="${settings.opacity * 100}">
                </div>

                
                <div style="background:rgba(255, 75, 75, 0.08); border:1px solid rgba(255, 75, 75, 0.25); border-radius:10px; padding:12px; margin-bottom:13px;">
                    <div style="font-weight:700; font-size:13px; color:#ff6b6b; margin-bottom:8px;">Header & Banner Opacity:</div>
                    
                    <div class="we-row"style="margin-bottom:8px !important;">
                        <label><span>Header Opacity (0% = Fully Transparent):</span>
                            <b id="we-header-op-val">${Math.round((settings.headerOpacity !== undefined ? settings.headerOpacity : 0.35) * 100)}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-header-op"min="0"max="100"value="${Math.round((settings.headerOpacity !== undefined ? settings.headerOpacity : 0.35) * 100)}">
                    </div>

                    <div class="we-row"style="margin-bottom:0 !important;">
                        <label><span>Header Glass Blur:</span>
                            <b id="we-header-bl-val">${settings.headerBlur || 0}px</b>
                        </label>
                        <input type="range"class="we-slider"id="we-header-bl"min="0"max="25"value="${settings.headerBlur || 0}">
                    </div>
                </div>

                
                <div style="background:rgba(168, 85, 247, 0.08); border:1px solid rgba(168, 85, 247, 0.25); border-radius:10px; padding:12px; margin-bottom:13px;">
                    <div style="font-weight:700; font-size:13px; color:#c084fc; margin-bottom:8px;">Top Navigation Bar (Top Bar):</div>

                    <div class="we-row"style="margin-bottom:8px !important;">
                        <label><span>Top Bar Background Opacity (0% = Fully Transparent):</span>
                            <b id="we-topbar-op-val">${Math.round((settings.topBarOpacity !== undefined ? settings.topBarOpacity : 0) * 100)}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-topbar-op"min="0"max="100"value="${Math.round((settings.topBarOpacity !== undefined ? settings.topBarOpacity : 0) * 100)}"style="accent-color:#c084fc;">
                    </div>

                    <div class="we-row"style="margin-bottom:0 !important;">
                        <label><span>Top Bar Glass Blur:</span>
                            <b id="we-topbar-bl-val">${settings.topBarBlur || 0}px</b>
                        </label>
                        <input type="range"class="we-slider"id="we-topbar-bl"min="0"max="25"value="${settings.topBarBlur || 0}"style="accent-color:#c084fc;">
                    </div>
                </div>

                
                <div style="background:rgba(29, 185, 84, 0.08); border:1px solid rgba(29, 185, 84, 0.25); border-radius:10px; padding:12px; margin-bottom:13px;">
                    <div style="font-weight:700; font-size:13px; color:#1ed760; margin-bottom:8px;">Sidebar & Bottom Player Bar:</div>
                    
                    <div class="we-row"style="margin-bottom:8px !important;">
                        <label><span>Sidebar Background Opacity (0% = Fully Transparent):</span>
                            <b id="we-sidebar-op-val">${Math.round((settings.sidebarOpacity !== undefined ? settings.sidebarOpacity : 0) * 100)}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-sidebar-op"min="0"max="100"value="${Math.round((settings.sidebarOpacity !== undefined ? settings.sidebarOpacity : 0) * 100)}">
                    </div>

                    <div class="we-row"style="margin-bottom:0 !important;">
                        <label><span>Player Bar Background Opacity (0% = Fully Transparent):</span>
                            <b id="we-player-op-val">${Math.round((settings.playerOpacity !== undefined ? settings.playerOpacity : 0) * 100)}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-player-op"min="0"max="100"value="${Math.round((settings.playerOpacity !== undefined ? settings.playerOpacity : 0) * 100)}">
                    </div>
                </div>

                
                <div style="background:rgba(80, 155, 245, 0.08); border:1px solid rgba(80, 155, 245, 0.25); border-radius:10px; padding:12px; margin-bottom:13px;">
                    <div style="font-weight:700; font-size:13px; color:#509bf5; margin-bottom:8px;">Search Dropdown Color & Opacity:</div>
                    
                    <div class="we-row"style="margin-bottom:8px !important;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><span style="font-size:13px; color:#ccc;">Search background color:</span>
                            <div style="display:flex; align-items:center; gap:8px;"><span id="we-search-color-hex"style="font-size:12px; color:#888; font-family:monospace;">${settings.searchBgColor || '#181818'}</span>
                                <input type="color"id="we-search-color"value="${settings.searchBgColor || '#181818'}"style="width:36px; height:28px; border:none; border-radius:6px; cursor:pointer; background:transparent; padding:0;" />
                            </div>
                        </div>
                        <div class="we-btn-group"id="we-search-presets"style="flex-wrap:wrap; gap:6px;">
                            <button class="we-btn-pill"data-col="#181818"style="background:#181818; border-color:#444;">Default</button>
                            <button class="we-btn-pill"data-col="#101010"style="background:#101010; border-color:#333;">Pitch Black</button>
                            <button class="we-btn-pill"data-col="#0f172a"style="background:#0f172a; border-color:#1e293b;">Navy Dark</button>
                            <button class="we-btn-pill"data-col="#0d1f18"style="background:#0d1f18; border-color:#133327;">Dark Pine</button>
                            <button class="we-btn-pill"data-col="#1a0d24"style="background:#1a0d24; border-color:#2a143b;">Deep Purple</button>
                        </div>
                    </div>

                    <div class="we-row"style="margin-bottom:0 !important;">
                        <label><span>Search Dropdown Opacity:</span>
                            <b id="we-search-op-val">${Math.round((settings.searchBgOpacity !== undefined ? settings.searchBgOpacity : 0.96) * 100)}%</b>
                        </label>
                        <input type="range"class="we-slider"id="we-search-op"min="70"max="100"value="${Math.round((settings.searchBgOpacity !== undefined ? settings.searchBgOpacity : 0.96) * 100)}">
                    </div>
                </div>

                <div class="we-row">
                    <label><span>Wallpaper Brightness:</span>
                        <b id="we-br-val">${settings.brightness}%</b>
                    </label>
                    <input type="range"class="we-slider"id="we-br"min="20"max="150"value="${settings.brightness}">
                </div>

                <div style="display:flex; justify-content:flex-end; margin-top:8px;">
                    <button id="we-ok"style="background:#1ed760; color:#000; border:none; padding:8px 24px; border-radius:20px; font-weight:700; cursor:pointer;">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        let onPauseChanged = null;
        const close = () => {
            if (onPauseChanged) window.removeEventListener("we-pause-changed", onPauseChanged);
            overlay.remove();
        };
        document.getElementById("we-close").onclick = close;
        document.getElementById("we-ok").onclick = close;
        overlay.onclick = (e) => { if (e.target === overlay) close(); };

        const updateSourceUI = () => {
            const isCustom = settings.wallpaperSource === "custom-video";
            const badge = document.getElementById("we-current-source-badge");
            if (badge) {
                badge.textContent = isCustom ? "Custom Video" : "Wallpaper Engine";
                badge.style.color = isCustom ? "#509bf5" : "#1ed760";
                badge.style.background = isCustom ? "rgba(80, 155, 245, 0.15)" : "rgba(30, 215, 96, 0.15)";
            }
            const btnWe = document.getElementById("we-btn-src-we");
            const btnCustom = document.getElementById("we-btn-src-custom");
            if (btnWe && btnCustom) {
                btnWe.classList.toggle("active", !isCustom);
                btnCustom.classList.toggle("active", isCustom);
            }
            const panelWe = document.getElementById("we-panel-we");
            const panelCustom = document.getElementById("we-panel-custom");
            if (panelWe) panelWe.style.display = !isCustom ? "block" : "none";
            if (panelCustom) panelCustom.style.display = isCustom ? "block" : "none";
            const customName = document.getElementById("we-custom-name");
            if (customName) {
                customName.textContent = settings.customMediaName || settings.mediaName || "No file selected";
            }
        };

        const btnSrcWe = document.getElementById("we-btn-src-we");
        if (btnSrcWe) {
            btnSrcWe.onclick = async () => {
                await setWallpaperSource("wallpaper-engine");
                updateSourceUI();
            };
        }

        const btnSrcCustom = document.getElementById("we-btn-src-custom");
        if (btnSrcCustom) {
            btnSrcCustom.onclick = async () => {
                await setWallpaperSource("custom-video");
                updateSourceUI();
            };
        }

        const btnPickCustom = document.getElementById("we-btn-pick-custom");
        const fileInput = document.getElementById("we-file");
        if (btnPickCustom && fileInput) {
            btnPickCustom.onclick = () => fileInput.click();
        }

        if (fileInput) {
            fileInput.onchange = (e) => {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const type = file.type || (file.name.match(/\.(mp4|webm|mkv|mov)$/i) ? "video/mp4" : "image/jpeg");
                    saveMedia(file, file.name, type);
                    renderMedia(file, type);
                    updateSourceUI();
                    if (window.Spicetify && Spicetify.showNotification) {
                        Spicetify.showNotification("Loaded: " + file.name);
                    }
                }
            };
        }

        if (settings.wallpaperSource === "wallpaper-engine") {
            if (settings.mediaName && settings.mediaName !== "No file selected") {
                updateBridgeStatusUI(true, settings.mediaName);
            }
            syncFromWallpaperEngine(false);
        } else {
            updateBridgeStatusUI(true, "Custom Video: " + (settings.customMediaName || settings.mediaName || "Active"));
        }

        document.getElementById("we-btn-sync-now").onclick = () => {
            syncFromWallpaperEngine(true);
        };

        const pauseBtnModal = document.getElementById("we-btn-toggle-pause");
        if (pauseBtnModal) {
            pauseBtnModal.onclick = () => {
                toggleWallpaperPause();
                pauseBtnModal.textContent = settings.wallpaperPaused ? 'Resume Video / Wallpaper' : 'Pause Video / Wallpaper';
                if (settings.wallpaperPaused) {
                    pauseBtnModal.classList.add("active");
                } else {
                    pauseBtnModal.classList.remove("active");
                }
            };
        }

        onPauseChanged = (e) => {
            if (pauseBtnModal) {
                pauseBtnModal.textContent = settings.wallpaperPaused ? 'Resume Video / Wallpaper' : 'Pause Video / Wallpaper';
                if (settings.wallpaperPaused) {
                    pauseBtnModal.classList.add("active");
                } else {
                    pauseBtnModal.classList.remove("active");
                }
            }
        };
        window.addEventListener("we-pause-changed", onPauseChanged);

        document.getElementById("we-chk-autosync").onchange = (e) => {
            settings.autoSync = e.target.checked;
            saveSettings();
        };

        document.querySelectorAll("#we-fit-group .we-btn-pill").forEach((btn) => {
            btn.onclick = () => {
                document.querySelectorAll("#we-fit-group .we-btn-pill").forEach(b =>b.classList.remove("active"));
                btn.classList.add("active");
                settings.fitMode = btn.getAttribute("data-val");
                saveSettings();
            };
        });

        document.querySelectorAll("#we-pos-group .we-btn-pill").forEach((btn) => {
            btn.onclick = () => {
                document.querySelectorAll("#we-pos-group .we-btn-pill").forEach(b =>b.classList.remove("active"));
                btn.classList.add("active");
                settings.position = btn.getAttribute("data-val");
                saveSettings();
            };
        });

        const sliderZoom = document.getElementById("we-zoom");
        sliderZoom.oninput = (e) => {
            settings.zoom = parseInt(e.target.value);
            document.getElementById("we-zoom-val").textContent = e.target.value + "%";
            saveSettings();
        };

        const sliderBl = document.getElementById("we-bl");
        sliderBl.oninput = (e) => {
            settings.bgBlur = parseInt(e.target.value);
            document.getElementById("we-bl-val").textContent = e.target.value + "px";
            saveSettings();
        };
        const sliderOp = document.getElementById("we-op");
        sliderOp.oninput = (e) => {
            settings.opacity = parseInt(e.target.value) / 100;
            document.getElementById("we-op-val").textContent = e.target.value + "%";
            saveSettings();
        };

        const sliderHeaderOp = document.getElementById("we-header-op");
        if (sliderHeaderOp) {
            sliderHeaderOp.oninput = (e) => {
                settings.headerOpacity = parseInt(e.target.value) / 100;
                document.getElementById("we-header-op-val").textContent = e.target.value + "%";
                saveSettings();
            };
        }

        const sliderHeaderBl = document.getElementById("we-header-bl");
        if (sliderHeaderBl) {
            sliderHeaderBl.oninput = (e) => {
                settings.headerBlur = parseInt(e.target.value);
                document.getElementById("we-header-bl-val").textContent = e.target.value + "px";
                saveSettings();
            };
        }

        const sliderTopBarOp = document.getElementById("we-topbar-op");
        if (sliderTopBarOp) {
            sliderTopBarOp.oninput = (e) => {
                settings.topBarOpacity = parseInt(e.target.value) / 100;
                document.getElementById("we-topbar-op-val").textContent = e.target.value + "%";
                saveSettings();
            };
        }

        const sliderTopBarBl = document.getElementById("we-topbar-bl");
        if (sliderTopBarBl) {
            sliderTopBarBl.oninput = (e) => {
                settings.topBarBlur = parseInt(e.target.value);
                document.getElementById("we-topbar-bl-val").textContent = e.target.value + "px";
                saveSettings();
            };
        }

        const sliderSidebarOp = document.getElementById("we-sidebar-op");
        if (sliderSidebarOp) {
            sliderSidebarOp.oninput = (e) => {
                settings.sidebarOpacity = parseInt(e.target.value) / 100;
                document.getElementById("we-sidebar-op-val").textContent = e.target.value + "%";
                saveSettings();
            };
        }

        const sliderPlayerOp = document.getElementById("we-player-op");
        if (sliderPlayerOp) {
            sliderPlayerOp.oninput = (e) => {
                settings.playerOpacity = parseInt(e.target.value) / 100;
                document.getElementById("we-player-op-val").textContent = e.target.value + "%";
                saveSettings();
            };
        }

        const searchColorInput = document.getElementById("we-search-color");
        if (searchColorInput) {
            searchColorInput.oninput = (e) => {
                settings.searchBgColor = e.target.value;
                const hexLabel = document.getElementById("we-search-color-hex");
                if (hexLabel) hexLabel.textContent = e.target.value;
                saveSettings();
            };
        }

        document.querySelectorAll("#we-search-presets button").forEach(btn => {
            btn.onclick = () => {
                const col = btn.getAttribute("data-col");
                if (col) {
                    settings.searchBgColor = col;
                    if (searchColorInput) searchColorInput.value = col;
                    const hexLabel = document.getElementById("we-search-color-hex");
                    if (hexLabel) hexLabel.textContent = col;
                    saveSettings();
                }
            };
        });

        const sliderSearchOp = document.getElementById("we-search-op");
        if (sliderSearchOp) {
            sliderSearchOp.oninput = (e) => {
                settings.searchBgOpacity = parseInt(e.target.value) / 100;
                document.getElementById("we-search-op-val").textContent = e.target.value + "%";
                saveSettings();
            };
        }

        const sliderBr = document.getElementById("we-br");
        sliderBr.oninput = (e) => {
            settings.brightness = parseInt(e.target.value);
            document.getElementById("we-br-val").textContent = e.target.value + "%";
            saveSettings();
        };

        syncFromWallpaperEngine(false);
    }

    function injectStyles(cssContent) {
    if (document.getElementById("we-styles")) return;
    const style = document.createElement("style");
    style.id = "we-styles";
    style.textContent = cssContent;
    document.head.appendChild(style);
}

function initExtension(cssContent) {
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

    initExtension(THEME_CSS);
})();
