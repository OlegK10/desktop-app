const { globalShortcut, ipcMain, app, BrowserWindow } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');
const weather = require('weather-js');

function createWindow () {
  const win = new BrowserWindow({
    transparent: true,
    frame: false,
    fullscreen: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  //================================================================================================
  //                                        S E R V E R
  //================================================================================================
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };



  server = http.createServer((req, res) => {
    const filePath = path.join(app.getAppPath(), req.url);
    const fileExt = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[fileExt] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading ${filePath}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  }).listen(8080);


  //================================================================================================
  //                                        S E R V E R  E N D
  //================================================================================================
  
  //================================================================================================
  //                                        T A S K S
  //================================================================================================

  win.webContents.on('did-finish-load', () => {
    const taskj = fs.readFileSync('./tasks.json', 'utf-8');
    win.webContents.send('data', taskj);
  });


  ipcMain.on('taskAdd', (event, taskname, taskdate) => {
    const exjss = fs.readFileSync('./tasks.json', 'utf-8');
    const exiobj = JSON.parse(exjss);

      if(taskname.length === 0){
        return;
      }else{

      }
    const object = {
      id: exiobj.length,
      name: taskname,
      date: taskdate,
      curdate:  new Date().getSeconds() + new Date().getMinutes() + new Date().getHours() + new Date().getDay() + new Date().getMonth()  + new Date().getYear(),
      done: false 
    };

    exiobj.push(object);
    const updatejss = JSON.stringify(exiobj);
    fs.writeFileSync('./tasks.json', updatejss, 'utf-8') 
    
    const taskj = fs.readFileSync('./tasks.json', 'utf-8');
    event.reply('task-data', taskj);
  })




  ipcMain.on('task-delete', (event, id) => {
    const tasksJson = fs.readFileSync('./tasks.json', 'utf-8');
    const tasksArray = JSON.parse(tasksJson);
    const updatedTasksArray = tasksArray.filter(task => task.id !== parseInt(id));
    fs.writeFileSync('./tasks.json', JSON.stringify(updatedTasksArray));
    const taskj = updatedTasksArray.filter(task => !task.done);
    event.reply('task-data', taskj);
  });
  


  //================================================================================================
  //                                        T A S K S     E N D
  //================================================================================================


  //================================================================================================
  //                                        W E A T H E R

  
  //                                        W E A T H E R
  //================================================================================================


  //================================================================================================
  //                                        V O I C E  A S S I S T A N T
  //==================================================================================================
    function VoisAssistant() {

      

      }

   ipcMain.on("btnEvent", (event, arg) => {
     win.setIgnoreMouseEvents(!arg, { forward: true });  
   });
  win.webContents.openDevTools();
  

  VoisAssistant();

  win.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    return callback(true);
  });
  win.loadURL('http://localhost:8080/main/index.html');
}
  
app.on('ready', () => {
  createWindow();
});
