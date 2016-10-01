const electron = require('electron');
const {app, BrowserWindow, Menu, MenuItem, Tray} = electron;
var tray = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        height: height / 1.25,
        width: width / 1.25,
        minHeight: height / 2,
        minWidth: width / 2,
        frame: false,
        center: true,
        title: "Inbox",
        icon: "icon.ico",
        backgroundColor: '#F5F5F5'
    });

    win.on('show', function (event) {
        event.preventDefault();
        tray.destroy();
    });

    win.on('minimize', function (event) {
        event.preventDefault();
        win.hide();

        tray = new Tray('icon.ico');
        const contextMenu = Menu.buildFromTemplate([
            new MenuItem({
                label: "Open",
                type: "normal",
                click: function () {
                    "use strict";
                    win.show();
                }
            }),
            new MenuItem({
                type: "separator"
            }),
            new MenuItem({
                label: "Exit",
                type: "normal",
                role: "quit"
            })
        ]);
        tray.setToolTip('Inbox');
        tray.setContextMenu(contextMenu);
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.