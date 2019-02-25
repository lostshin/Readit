// Modules 
const {
  app,
  ipcMain
} = require('electron')

const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

ipcMain.on('new-item', (e, itemURL) => {

  // Get read item with readItem module
  readItem(itemURL, (item) => {

    console.log(item);
    // Send to renderer
    e.sender.send('new-item-success', item)
  })
})


app.on('ready', () => {
  mainWindow.createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null)
    mainWindow.createWindow()

})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.