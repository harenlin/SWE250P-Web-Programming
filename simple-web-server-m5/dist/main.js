/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nvar globalAny = __webpack_require__.g;\n/* app.ts */\nvar myModule_1 = __webpack_require__(/*! ./myModule */ \"./myModule.ts\");\nfunction button(companyName) {\n  alert(\"Button! Zot Zot Zot!\");\n  var getExp = function (companyName) {\n    if (companyName === \"trend-micro\") {\n      return myModule_1.trm;\n    } else if (companyName === \"academia-sinica\") {\n      return myModule_1.acs;\n    }\n    return undefined;\n  };\n  var curExp = getExp(companyName);\n  var element = document.getElementById(companyName);\n  if (element) {\n    element.innerHTML = \"<p>\" + (curExp === null || curExp === void 0 ? void 0 : curExp.getDate()) + \".</p><p>\" + (curExp === null || curExp === void 0 ? void 0 : curExp.getDescription()) + \"</p>\";\n    element.style.color = 'black';\n    element.style.fontSize = '16px';\n  } else {\n    alert(\"element null\");\n  }\n}\n/* THIS LIKE IS SO IMPORTANT !!! */\nglobalAny.document.button = button;\n\n//# sourceURL=webpack://simple-web-server/./app.js?");

/***/ }),

/***/ "./entry.js":
/*!******************!*\
  !*** ./entry.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react.js */ \"./react.js\");\n/* harmony import */ var _react_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_react_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _myModule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./myModule.js */ \"./myModule.js\");\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.js */ \"./app.js\");\n\n\n\n\n//# sourceURL=webpack://simple-web-server/./entry.js?");

/***/ }),

/***/ "./myModule.js":
/*!*********************!*\
  !*** ./myModule.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\n\n/* myModule.ts */\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.acs = exports.trm = exports.InternExperience = void 0;\n/* Class Definition */\nvar InternExperience = /** @class */function () {\n  function InternExperience(company, date, description) {\n    this.date = date;\n    this.company = company;\n    this.description = description;\n  }\n  InternExperience.prototype.getDate = function () {\n    return this.date;\n  };\n  InternExperience.prototype.getName = function () {\n    return this.company;\n  };\n  InternExperience.prototype.getDescription = function () {\n    return this.description;\n  };\n  return InternExperience;\n}();\nexports.InternExperience = InternExperience;\nexports.trm = new InternExperience(\"trend-micro\", \"2021/07 -- 2021/09\", \"Researched on advanced persistent threats (APTs) within a high-traffic system processing 10M+ email logs daily & Reduced false negatives in the phishing detection system by identifying malicious URLs using CNNs through AWS.\");\nexports.acs = new InternExperience(\"academia-sinica\", \"2019/07 -- 2020/06\", \"Innovated NFinBERT, a number-aware language model built on BERT, capable of high sensitivity for the numbers in the finance domain by pre-training on pre-processed financial disclosures, SEC 10K report MD&A section.\");\n\n//# sourceURL=webpack://simple-web-server/./myModule.js?");

/***/ }),

/***/ "./react.js":
/*!******************!*\
  !*** ./react.js ***!
  \******************/
/***/ (() => {

eval("function start() {\n  class SocialMediaBlock extends React.Component {\n    constructor(props) {\n      super(props);\n      console.log(\"Bookmark component created\");\n      this.message = this.props.platform;\n    }\n    render() {\n      return React.createElement(\"li\", {}, React.createElement(\"a\", {}, this.message),\n      // React.createElement(\"a\", { href : this.props.href, target: \"_blank\" }, this.props.platform),\n      React.createElement(\"button\", {\n        onClick: () => {\n          window.open(this.props.href, '_blank');\n          this.message = \"Thanks for visiting my page. Please feel free to follow my \" + this.props.platform;\n          this.setState({});\n        }\n      }, \"Click Me\"));\n    }\n  }\n  const rootElement = React.createElement(\"div\", {}, React.createElement(\"h2\", {}, \"Contact Information\"), React.createElement(\"ul\", {}, React.createElement(SocialMediaBlock, {\n    platform: \"LinkedIn\",\n    href: \"https://www.linkedin.com/in/harenlin\"\n  }), React.createElement(SocialMediaBlock, {\n    platform: \"GitHub\",\n    href: \"https://github.com/harenlin\"\n  }), React.createElement(SocialMediaBlock, {\n    platform: \"Medium\",\n    href: \"https://haren.medium.com/\"\n  }), React.createElement(\"li\", {}, React.createElement(\"a\", {\n    href: \"mailto:laolunl@uci.edu\"\n  }, \"Email: laolunl@uci.edu\"))));\n  ReactDOM.render(rootElement, document.getElementById(\"contact-details\"));\n}\nwindow.start = start;\n// exports.start = start;\n\n//# sourceURL=webpack://simple-web-server/./react.js?");

/***/ }),

/***/ "./myModule.ts":
/*!*********************!*\
  !*** ./myModule.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InternExperience: () => (/* binding */ InternExperience),\n/* harmony export */   acs: () => (/* binding */ acs),\n/* harmony export */   trm: () => (/* binding */ trm)\n/* harmony export */ });\n/* myModule.ts */\n/* Class Definition */\nclass InternExperience {\n    constructor(company, date, description) {\n        this.date = date;\n        this.company = company;\n        this.description = description;\n    }\n    getDate() {\n        return this.date;\n    }\n    getName() {\n        return this.company;\n    }\n    getDescription() {\n        return this.description;\n    }\n}\nconst trm = new InternExperience(\"trend-micro\", \"2021/07 -- 2021/09\", \"Researched on advanced persistent threats (APTs) within a high-traffic system processing 10M+ email logs daily & Reduced false negatives in the phishing detection system by identifying malicious URLs using CNNs through AWS.\");\nconst acs = new InternExperience(\"academia-sinica\", \"2019/07 -- 2020/06\", \"Innovated NFinBERT, a number-aware language model built on BERT, capable of high sensitivity for the numbers in the finance domain by pre-training on pre-processed financial disclosures, SEC 10K report MD&A section.\");\n\n\n//# sourceURL=webpack://simple-web-server/./myModule.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./entry.js");
/******/ 	
/******/ })()
;