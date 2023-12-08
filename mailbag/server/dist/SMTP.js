"use strict";
/* Simple Mail Transfer Protocol */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = __importStar(require("nodemailer"));
// The worker that will perform SMTP operations.
var Worker = /** @class */ (function () {
    /**
     * Constructor.
     */
    function Worker(inServerInfo) {
        console.log("SMTP.Worker.constructor", inServerInfo);
        Worker.serverInfo = inServerInfo;
    } /* End constructor. */
    /**
     * Send a message.
     *
     * @param  inOptions An object containing to, from, subject and text properties (matches the IContact interface,
     *                   but can't be used since the type comes from nodemailer, not app code).
     * @return           A Promise that eventually resolves to a string (null for success, error message for an error).
     */
    // The inOptions object can contain fields like the from address, 
    // the to address, carbon copy addresses (cc), blind carbon copy addresses (bcc), 
    // the subject of the message, and the text of the message (text).
    // An issue arises here in that nodemailer doesn’t natively provide an async/await-compatible API. 
    // It instead uses the callback approach. But, if you go back to the code of main.ts, 
    // you’ll see that async/await is used everywhere when calling the Worker classes. How can that be?
    // Any time you have a callback-based API, you can wrap a call to it in a Promise.
    // (Any function that is to be called with async/await must return a Promise!) 
    // You then return the Promise from the function that makes the call, 
    // and that caller can then use async/await to call it. 
    // Then, in the function, you simply have the callback passed 
    // to the underlying function reject or resolve as appropriate.
    Worker.prototype.sendMessage = function (inOptions) {
        console.log("SMTP.Worker.sendMessage()", inOptions);
        return new Promise(function (inResolve, inReject) {
            var transport = nodemailer.createTransport(Worker.serverInfo.smtp);
            transport.sendMail(inOptions, // contains the message details passed in from the client
            function (inError, inInfo) {
                if (inError) {
                    console.log("SMTP.Worker.sendMessage(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
                    inResolve();
                }
            });
        });
    }; /* End sendMessage(). */
    return Worker;
}()); /* End class. */
exports.Worker = Worker;
//# sourceMappingURL=SMTP.js.map