# instagram-electron

A small Windows desktop wrapper for instagram.com. It's just the website in its own window, with a few tweaks that aim to reduce CPU and GPU use:

- animations, transitions and blur effects disabled (injected CSS)
- video autoplay off
- Instagram's `/ajax/bz` telemetry and a few third-party tracking requests blocked
- audio muted when minimized, background throttling on
- external links open in your default browser
- login persists between launches

These are best-effort tweaks; I haven't benchmarked them against a normal browser tab.

## Run

```
npm install
npm start
```

If your npm skips install scripts and Electron's binary is missing, run `node node_modules/electron/install.js` once. Run from a reasonably short path: Electron failed to start from a very long folder path on Windows.

## Build an .exe

```
npm run dist
```

Output: `dist/Instagram-win32-x64/Instagram.exe`. To give it an icon, put an `icon.ico` in the project root and run `npm run dist -- --icon=icon.ico` (no icon is included, since the Instagram logo is Meta's trademark).

## Troubleshooting

Some Windows graphics drivers make Electron's GPU process crash on startup. Chromium then falls back to slower software rendering. Pass one of these flags to the exe (for example in a shortcut's Target field):

- `--disable-gpu-sandbox` - on the machine this was tested on, this cut the crashes from several to one at startup, after which it stayed up. It weakens a Chromium security sandbox, so use it only if you need it.
- `--disable-gpu` - no crashes, software rendering only.

## Disclaimer

Unofficial, not affiliated with or endorsed by Meta or Instagram. It loads the public website and does not use Instagram's private APIs; it injects CSS and blocks some telemetry requests. Use at your own risk and follow Instagram's Terms of Use.
