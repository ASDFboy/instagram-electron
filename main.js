const { app, BrowserWindow, session, shell } = require('electron');

// Lower resource use: software-heavy features off, smaller caches
app.commandLine.appendSwitch('disable-features', 'HardwareMediaKeyHandling,MediaSessionService');
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=512');
app.commandLine.appendSwitch('autoplay-policy', 'user-gesture-required'); // no autoplay videos

// Cut CPU/GPU cost: no animations or transitions, no blur filters
const CSS = `*,*::before,*::after{animation:none!important;transition:none!important;
  backdrop-filter:none!important;scroll-behavior:auto!important}`;

// Analytics/telemetry requests are pure overhead
const BLOCK = ['*://*.facebook.com/tr*', '*://*/ajax/bz*', '*://*/logging/*',
  '*://*.google-analytics.com/*', '*://connect.facebook.net/*'];

app.whenReady().then(() => {
  const ses = session.fromPartition('persist:instagram'); // keeps you logged in
  ses.webRequest.onBeforeRequest({ urls: BLOCK }, (_, cb) => cb({ cancel: true }));

  const win = new BrowserWindow({
    width: 1200, height: 850, autoHideMenuBar: true, title: 'Instagram', icon: require('fs').existsSync(__dirname + '/icon.ico') ? __dirname + '/icon.ico' : undefined,
    webPreferences: { session: ses, backgroundThrottling: true, spellcheck: false },
  });
  win.loadURL('https://www.instagram.com/');
  win.webContents.on('did-finish-load', () => win.webContents.insertCSS(CSS));
  win.webContents.on('did-navigate-in-page', () => win.webContents.insertCSS(CSS));

  // Keep instagram in-app, open everything else in the real browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!/^https:\/\/([\w-]+\.)?instagram\.com\//.test(url)) shell.openExternal(url);
    return { action: /instagram\.com/.test(url) ? 'allow' : 'deny' };
  });

  // Free memory when minimized: pause rendering and drop audio
  win.on('minimize', () => win.webContents.setAudioMuted(true));
  win.on('restore', () => win.webContents.setAudioMuted(false));
});

app.on('window-all-closed', () => app.quit());

