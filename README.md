# instagram-electron

A lightweight Windows desktop wrapper for instagram.com. It's just the website in its own window, with a few tweaks to reduce CPU, GPU and memory use:

- animations, transitions and blur effects disabled
- video autoplay off
- analytics/tracking requests blocked
- JS memory capped at 512 MB, background throttling, audio muted when minimized
- external links open in your default browser
- login persists between launches

## Run

```
npm install
npm start
```

If Electron's download is skipped by your npm version, run `node node_modules/electron/install.js` once.

## Build an .exe

```
npm run dist
```

Output: `dist/Instagram-win32-x64/Instagram.exe`. To give it an icon, put an `icon.ico` in the project root and run `npm run dist -- --icon=icon.ico` (the icon is not included, since the Instagram logo is Meta's trademark).

## Disclaimer

Unofficial, not affiliated with or endorsed by Meta or Instagram. It only loads the public website; it doesn't use or modify Instagram's private APIs. Use at your own risk and follow Instagram's Terms of Use.
