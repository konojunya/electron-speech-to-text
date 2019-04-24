const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const url = require("url");

let win;

const appLoad = () => {
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true
    })
  );
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    nodeIntegration: true
  });
  win.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
  appLoad();
  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", () => {
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
