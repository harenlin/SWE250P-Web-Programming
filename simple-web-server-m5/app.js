"use strict";
// const globalAny:any = global;
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = exports.start = void 0;
/* app.ts */
var react_js_1 = require("./react.js");
Object.defineProperty(exports, "start", { enumerable: true, get: function () { return react_js_1.start; } });
var myModule_1 = require("./myModule");
function button(companyName) {
    alert("Button! Zot Zot Zot!");
    var getExp = function (companyName) {
        if (companyName === "trend-micro") {
            return myModule_1.trm;
        }
        else if (companyName === "academia-sinica") {
            return myModule_1.acs;
        }
        return undefined;
    };
    var curExp = getExp(companyName);
    var element = document.getElementById(companyName);
    if (element) {
        element.innerHTML = "<p>" + (curExp === null || curExp === void 0 ? void 0 : curExp.getDate()) + ".</p><p>" + (curExp === null || curExp === void 0 ? void 0 : curExp.getDescription()) + "</p>";
        element.style.color = 'black';
        element.style.fontSize = '16px';
    }
    else {
        alert("element null");
    }
}
exports.button = button;
/* THIS LIKE IS SO IMPORTANT !!! */
// globalAny.document.button = button;
