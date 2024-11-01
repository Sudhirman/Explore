const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Enable node integration and context isolation for security
      nodeIntegration: true,
      contextIsolation: false,
      // Optional: If you have a `preload.js` script, you can enable it here
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the main HTML file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Uncomment the line below to open DevTools during development
  // mainWindow.webContents.openDevTools();
};

// Initialize the app and create a window when ready
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create the window if the dock icon is clicked and no other windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS (standard behavior)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Additional main process code can be added below
// (e.g., additional Electron APIs or importing other modules)
