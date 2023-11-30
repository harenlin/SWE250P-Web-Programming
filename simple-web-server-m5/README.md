## Objective
Read, reproduce line-by-line, execute, and understand the code from Chapter 6 and 7 of the textbook. The aim is for you to learn more advanced features of TypeScript and learn how to create bundles that simplify the management of the development and deployment of your web applications.

From Chapter 6 of the textbook, make sure to reproduce all the codes. Add some mode advanced features of TypeScript to the webpage that you have been working in the previous assignment. You should at least demonstrate that you can work with modules, but if you wish you can also start using third party libraries.

From Chapter 7 of the textbook, make sure you understand how to use Webpack and apply it to create a basic project.

## Environment
0. The version of Node.js: v20.9.0
1. The version of Webpack: 5.89.0 
2. The browser used to test: Google Chrome
3. Browser version: 118.0.5993.117 (arm64)
4. Operating system: macOS 13.5.1 (22G90)
5. Computer architecture: Apple M1 CPU with 8.0 GB RAM

## Description
I modified the sample code from the textbook [HTML and CSS: Design and Build Websites](https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189), and made some changes of the sections of the website in the previous assignment. Moreover, I naively developed the website with a simple Node.js server (```server.js```) using the fs (File System) module to read the content of a file and serve it as a response when a request is made to the server. 

### 0. Modularize
All I do right here is to split the ```index.ts``` file from the previous assignment into 2 different ```ts``` files in order to make it modulized. The ```InternExperience``` class definition and the object instance creation are located in the ```myModule.ts```. The ```button``` function is then defined inside the ```app.ts```. Moreover, I split the part of codes using React Components into ```react.js```. Now, we focus on the ```Webpack```. In order to make all the files work well together, we need to ```export``` all the functions we defined in different ```.js``` and ```.ts``` files.

* Reference: https://webpack.js.org/api/module-methods/

### 1. Export functions from ```react.js```
```TypeScript
export { start } from './react.js';
```
Originally, I just set up multiple entry point for webpack; however, the webpack only export the last entry file. Now, the entry point I set up is ```app.ts```, in order to make all the functions exported, I need to manually export the functions inside the files other than ```app.ts```. (P.S. After webpack 4 (included), the multiple entry points are not allowed!)

  * Reference: https://stackoverflow.com/questions/37200080/how-to-export-imported-object-in-es6

### 2. Create the library for functions exported
When we use this following webpack configuration and build the project, the resulting bundle will expose a global variable named ``lib``, and we can interact with the functionality provided by our code through this variable in the application. 
```JavaScript
module.exports = {
  // ...  
  output: {
    library: {
      name: 'lib',
      type: 'var',
    },
  },
};
```
Let's break down the key parts:
- ``output``: This is an object that contains various configurations related to the output bundle.
- ``library``: This is an object nested within output that configures the output as a library.
- ``name``: Specifies the name of the library. In this case, the library will be named ``lib``.
- ``type``: Specifies how the library should be exposed. In this example, it's set to ``var``, which means the library will be exposed as a variable. This variable will be named ``lib``, and we can access the library through this variable in our code.

After that, in my ```index.html``` code, I can use the ``lib.start()`` to access the ``start()`` function inside the ```react.js``` and the ``lib.button()`` to access the ``button`` function inside the ```app.ts``` file.

* Reference: https://webpack.js.org/configuration/output/#outputlibrarytype

### 3. (Bonus) Import the modulized library (e.g. ```React```) from external in ```webpack.config.js```

## The TypeScript Features Used 
- Type Annotation
- Class Definition with Constructor
- Arrow Function (e.g. ```const FuncName = (args: types) : returnTypes => {...}```)
- DOM Manipulation (e.g. ```document.getElementById(...)```)
- Type Assertion (e.g. ```HTMLElement```)
- Modules

## How to Debug
1. TypeScript Compiler (```tsc```):
   Compile the TypeScript code with debugging information enabled using the TypeScript Compiler with the `--sourceMap` option. This generates source maps that establish a connection between the generated JavaScript code and the original TypeScript code. This linkage greatly facilitates debugging efforts.

2. IDE Debugging Tools:
   Take advantage of the debugging capabilities provided by Integrated Development Environments (IDEs) such as Visual Studio Code. These tools allow developers to set breakpoints, inspect variable values, and step through code execution, providing a powerful and interactive debugging experience.

3. Console Logging:
   strategically insert `console.log` statements at key points in the code. These statements can be used to log variable values, function outputs, or specific milestones in the code execution. This practice helps in understanding the flow of the program and provides insights into the values of variables during runtime.

P.S. If all of above don't work, ask questions on [StackOverflow](https://stackoverflow.com/).



## How to run
0. Run the command: ``` npm install ```.
1. (Optional) Compile the Typescript code using the command: ```tsc *.ts``` and get the multiple ```js``` files.
2. Run the command: ```npx webpack```, to generate the single ```main.js``` file and ```index.html``` file.
3. (Optional) Open the ```index.html``` file on Google Chrome or Safari.
4. Or, we could run the ```node server.js``` and open Google Chrome or Safari, type the url: ``` http://127.0.0.1:3000/ ``` and press enter.


## Result
![result](running_result.png)

## Reference
[Webpack Document](https://webpack.js.org/api/)