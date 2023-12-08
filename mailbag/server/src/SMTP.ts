/* Simple Mail Transfer Protocol */

// Library imports.
import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";

// App imports.
import { IServerInfo } from "./ServerInfo";

// The worker that will perform SMTP operations.
export class Worker {
  // Server information.
  private static serverInfo: IServerInfo;
  /**
   * Constructor.
   */
  constructor(inServerInfo: IServerInfo) {
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
  public sendMessage(inOptions: SendMailOptions): Promise<string> {

    console.log("SMTP.Worker.sendMessage()", inOptions);

    return new Promise((inResolve, inReject) => {
      const transport: Mail = nodemailer.createTransport(Worker.serverInfo.smtp);
      transport.sendMail(
        inOptions, // contains the message details passed in from the client
        (inError: Error | null, inInfo: SentMessageInfo) => {
          if (inError) {
            console.log("SMTP.Worker.sendMessage(): Error", inError);
            inReject(inError);
          } else {
            console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
            inResolve();
          }
        }
      );
    });

  } /* End sendMessage(). */


} /* End class. */
