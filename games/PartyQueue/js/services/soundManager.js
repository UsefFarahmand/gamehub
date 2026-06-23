let _sounds  = null;
let _enabled = true;

async function loadSounds() {
    if (_sounds) return _sounds;
    try {
        const res = await fetch("./data/config.json");
        const cfg = await res.json();
        _sounds = cfg.sounds || {};
    } catch {
        _sounds = {};
    }
    return _sounds;
}

export async function playSound(key) {
    if (!_enabled) return;
    const sounds = await loadSounds();
    const src = sounds[key];
    if (!src) return;
    try {
        const a = new Audio(src);
        a.volume = 0.5;
        a.play().catch(() => {});
    } catch {}
}

export function initSoundToggle() {
    const toggle = document.getElementById("soundToggle");
    if (!toggle) return;
    toggle.addEventListener("change", () => { _enabled = toggle.checked; });
}
