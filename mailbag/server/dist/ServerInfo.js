"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note imports.
var path = require("path");
var fs = require("fs");
// The file is read in as a plain string with the fs.readFileSync() function, 
// again using path.join() to get a fully qualified path to the file. 
// Finally, we parse the string into an object and assign it to serverInfo. 
// After that, we have an object in memory that contains the information needed to connect to the server!
var rawInfo = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
exports.serverInfo = JSON.parse(rawInfo);
console.log("ServerInfo: ", exports.serverInfo);
//# sourceMappingURL=ServerInfo.js.map