export const isValidColor = (col) => {
    if (!col || typeof col !== "string") return false;
    col = col.trim().toLowerCase();
    if (col === "transparent" || col === "inherit" || col === "initial") return false;
    if (col.startsWith("rgba(18, 18, 18") || col.startsWith("rgb(18, 18, 18)")) return false;
    if (col.startsWith("rgba(0, 0, 0") || col === "rgb(0, 0, 0)") return false;
    if (col === "#000" || col === "#000000" || col === "#121212" || col === "#181818") return false;
    return true;
};

export const parseColorString = (str) => {
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

export const getStyleColor = (el) => {
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

export const extractFromImage = (img) => {
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

export const extractAlbumColor = () => {
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
export const fetchSpicetifyColor = () => {
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
