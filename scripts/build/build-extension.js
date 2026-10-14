const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

function cleanModule(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/^import\s+[^;]+;?\r?\n?/gm, '');
    content = content.replace(/^export\s+(async\s+function|function|const|let|var)\s+/gm, '$1 ');
    content = content.replace(/^export\s+default\s+/gm, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    content = content.replace(/^\s*\/\/.*$/gm, '');
    return content.trim();
}

function cleanCss(content) {
    return content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .trim();
}

function buildBundle() {
    const cssPath = path.join(srcDir, 'styles', 'theme.css');
    const cssContent = cleanCss(fs.readFileSync(cssPath, 'utf8'));

    const settingsCode = cleanModule(path.join(srcDir, 'modules', 'settings.js'));
    const mediaRendererCode = cleanModule(path.join(srcDir, 'modules', 'mediaRenderer.js'));
    const colorSyncCode = cleanModule(path.join(srcDir, 'modules', 'colorSync.js'));
    const scrollWatcherCode = cleanModule(path.join(srcDir, 'modules', 'scrollWatcher.js'));
    const homeFeedQuickTabsCode = cleanModule(path.join(srcDir, 'ui', 'homeFeedQuickTabs.js'));
    const marketplaceQuickTabsCode = cleanModule(path.join(srcDir, 'ui', 'marketplaceQuickTabs.js'));
    const settingsModalCode = cleanModule(path.join(srcDir, 'ui', 'settingsModal.js'));
    const topbarControlsCode = cleanModule(path.join(srcDir, 'ui', 'topbarControls.js'));
    const offlineHandlerCode = cleanModule(path.join(srcDir, 'modules', 'offlineHandler.js'));
    const indexCode = cleanModule(path.join(srcDir, 'index.js'));

    const bundle = `(function () {
    const THEME_CSS = ${JSON.stringify(cssContent)};

    ${settingsCode}

    ${mediaRendererCode}

    ${colorSyncCode}

    ${scrollWatcherCode}

    ${homeFeedQuickTabsCode}

    ${marketplaceQuickTabsCode}

    ${topbarControlsCode}

    ${settingsModalCode}

    ${offlineHandlerCode}

    ${indexCode}

    initExtension(THEME_CSS);
})();
`;

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    const distPath = path.join(distDir, 'wallpaper-engine.js');
    fs.writeFileSync(distPath, bundle, 'utf8');

    console.log(`[Build] Bundle successfully generated at ${distPath} (${bundle.length} bytes)`);

    const appData = process.env.APPDATA;
    if (appData) {
        const spicetifyExtDir = path.join(appData, 'spicetify', 'Extensions');
        if (fs.existsSync(spicetifyExtDir)) {
            const dest = path.join(spicetifyExtDir, 'wallpaper-engine.js');
            fs.copyFileSync(distPath, dest);
            console.log(`[Deploy] Copied bundle to Spicetify Extensions: ${dest}`);
            try {
                const { execSync } = require('child_process');
                execSync('spicetify refresh -e', { stdio: 'pipe' });
                console.log(`[Deploy] Auto-refreshed Spicetify extensions!`);
            } catch (e) {
                console.warn(`[Deploy] Could not auto-refresh spicetify:`, e.message);
            }
        }
    }
}

buildBundle();

if (process.argv.includes('--watch')) {
    console.log('[Watch] Watching src/ for changes...');
    let debounceTimer = null;
    fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log(`[Watch] Detected change in ${filename}, rebuilding...`);
            buildBundle();
        }, 150);
    });
}
