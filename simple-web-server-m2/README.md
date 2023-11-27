## Objective
Develop your first web server using Node.js and NPM, learn how to work with these important tools of the modern web stack, have your first web server up and running. Use the web server that you created locally to serve a very simple, single-page webpage, and describe and report what you have done. The aim is for you to start understanding how a simple web server works and get acquainted with Node.js so that you will be able to use it in your future work and during this course.

Using the relevant partial codes from Chapters 1 and 2 of the textbook, create codes by your own that will allow you to have a simple web server up and running and serving any simple webpage that you might have created while working in Module 1 (alternatively, you can create a simple static webpage now).

## Environment
0. The version of Node.js: v20.9.0
1. The browser used to test: Google Chrome
2. Browser version: 118.0.5993.117 (arm64)
3. Operating system: macOS 13.5.1 (22G90)
4. Computer architecture: Apple M1 CPU with 8.0 GB RAM

## Description
I modified the sample code from the textbook [HTML and CSS: Design and Build Websites](https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189), and made some changes of the sections of the website. Moreover, I naively develop the website with a simple Node.js server (```server.js```) using the fs (File System) module to read the content of a file and serve it as a response when a request is made to the server. 

Let's break it down:
### 0. Creating an Express App:
```Javascript
const app = express();
app.use(express.static(__dirname));
```
Creates an instance of the Express application, and then configures Express to serve static files from the current directory ```(__dirname)```.

### 1. Read File Using the File System
```JavaScript
fs.readFile((__dirname, 'index.html'), 'utf8', (err, data) => {}
```
Uses the ```fs.readFile``` method to read the content of the ```index.html``` file. The ```__dirname``` is a global variable in Node.js that represents the directory name of the current module (the script in which this code resides). It's concatenated with ```index.html``` to form the complete file path. The third parameter ```utf8``` specifies the encoding of the file, indicating that the file should be read as a UTF-8 encoded text file. The function ```(err, data) => { ... }``` is a callback function that will be executed once the file is read. It takes two parameters: err for any error that might occur during the file reading process, and data which will contain the content of the file if the read operation is successful.

### 2. Error Handling
```JavaScript
if (err) { // Error handling
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end('Internal Server Error');
} 
```
If an error occurs during the file reading (e.g., file not found), the server responds with a status code of ```500 (Internal Server Error)``` and sends a simple text message. If there is no error, it proceeds to the else block.

### 3. Successful Response
```JavaScript
res.writeHead(200, {'Content-Type': 'text/html'});
res.end(data);
```
If the file is successfully read, the server responds with a status code of ```200 (OK)```, indicating a successful HTTP request. It also sets the ```Content-Type``` header to ```text/html``` and sends the content of the file as the response.

### 4. Handling Not Found
```JavaScript
res.writeHead(404, {'Content-Type': 'text/plain'});
res.end('Not Found');
```
If the file is not found, it responds with a ```404 (Not Found)``` status code and a simple text message.

### 5. Server Setup and Listening
```JavaScript
const port = 3000;
const hostname = '127.0.0.1';
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
This part sets up the server to listen on the specified hostname and port. Once the server is successfully set up and listening, it logs a message indicating the server's address.

In summary, the code creates a basic Node.js server that reads the content of an ```index.html``` file and serves it as a response. It includes error handling for file not found scenarios and logs the server's address when it starts listening.


## How to run
0. Run the command: ``` npm install ```.
1. Run the command: ``` node server.js ```.
2. Open Google Chrome or Safari, type the url and enter: ``` http://127.0.0.1:3000/ ```.

## Result
![result](running_result.png)
