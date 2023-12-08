// Note imports.
const path = require("path");
const fs = require("fs");


// Define interface for server information.
export interface IServerInfo {
  smtp : {
    host: string,
    port: number,
    auth: {
      user: string,
      pass: string
    }
  },
  imap : {
    host: string,
    port: number,
    auth: {
      user: string,
      pass: string
    }
  }
}


// The configured server info.
export let serverInfo: IServerInfo;


// The file is read in as a plain string with the fs.readFileSync() function, 
// again using path.join() to get a fully qualified path to the file. 
// Finally, we parse the string into an object and assign it to serverInfo. 
// After that, we have an object in memory that contains the information needed to connect to the server!
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
serverInfo = JSON.parse(rawInfo);
console.log("ServerInfo: ", serverInfo);