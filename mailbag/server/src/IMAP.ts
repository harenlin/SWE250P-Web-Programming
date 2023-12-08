/* Internet Message Access Protocol */

// Library imports.
import { ParsedMail } from "mailparser";
const ImapClient = require("emailjs-imap-client");
import { simpleParser } from "mailparser";

// App imports.
import { IServerInfo } from "./ServerInfo";


// Define interface to describe a mailbox and optionally a specific message id
// to be supplied to various methods here.
// Id is needed when retrieval & deletion.
export interface ICallOptions {
  mailbox: string,
  id?: number
}


// Define interface to describe a received message.  
// Note that body is optional since it isn't sent when listing messages.
// Reason: save bandwidth: no sense returning the entire body 
// if we don’t know if we need it (which is the case when listing messages).
// Until the user clicks a message, the body, 
// which is the bulk of a message obviously (in most cases at least), isn’t needed.
export interface IMessage {
  id: string,
  date: string,
  from: string,
  subject: string,
  body?: string
}


// Define interface to describe a mailbox.
// The "name" is obviously what will be shown on the screen, 
// and the "path" is how code will identify a mailbox for operations 
// like listing mailboxes and retrieving a message. 
export interface IMailbox {
  name: string,
  path: string
}


// Disable certificate validation (less secure, but needed for some servers).
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// The worker that will perform IMAP operations.
export class Worker {
  // Server information.
  private static serverInfo: IServerInfo;
  /**
   * Constructor.
   */
  constructor(inServerInfo: IServerInfo) {
    console.log("IMAP.Worker.constructor", inServerInfo);
    Worker.serverInfo = inServerInfo;

  } /* End constructor. */


  /**
   * Connect to the SMTP server and return a client object for operations to use.
   *
   * @return An ImapClient instance.
   */
  // The client is created, passing in the host and port from serverInfo. 
  // We also need to pass in a username and password. 
  // That’s done in the third argument, which you’ll recall from earlier is an optional options argument. 
  // One of the attributes it can contain is auth, which must be an object 
  // containing a user (username) field and pass (password) field.
  // Then, set the logLevel property on the client to the LOG_LEVEL_NONE constant (also from the client). 
  // This is to keep the output when running quiet because without that, 
  // you get a fair bit of logging about what’s going on. 
  // It’s helpful if you need it, but most of the time it’s just a lot of noise that we don’t need.
  private async connectToServer(): Promise<any> {
    // noinspection TypeScriptValidateJSTypes
    const client: any = new ImapClient.default(
      Worker.serverInfo.imap.host,
      Worker.serverInfo.imap.port,
      { auth : Worker.serverInfo.imap.auth }
    );
    client.logLevel = client.LOG_LEVEL_NONE;
    client.onerror = (inError: Error) => {
      console.log("IMAP.Worker.listMailboxes(): Connection error", inError);
    };
    await client.connect();
    console.log("IMAP.Worker.listMailboxes(): Connected");

    return client;

  } /* End connectToServer(). */


  /**
   * Returns a list of all (top-level) mailboxes.
   *
   * @return An array of objects, on per mailbox, that describes the nmilbox.
   */
  public async listMailboxes(): Promise<IMailbox[]> {

    console.log("IMAP.Worker.listMailboxes()");

    const client: any = await this.connectToServer();

    const mailboxes: any = await client.listMailboxes(); // inner function call from emailjs-imap-client

    await client.close();

    // Translate from emailjs-imap-client mailbox objects to app-specific objects.  
    // The iterateChildren() function is called recursively to deal with the hierarchy. 
    // For each mailbox encountered, regardless of level in the hierarchy, 
    // it will be added to finalMailboxes. 
    // But what’s added is a new object that contains just the name and path. 
    // The children property is then passed to iterateChildren() to continue through the hierarchy.
    const finalMailboxes: IMailbox[] = [];
    const iterateChildren: Function = (inArray: any[]): void => {
      inArray.forEach((inValue: any) => {
        finalMailboxes.push({
          name : inValue.name,
          path : inValue.path
        });
        iterateChildren(inValue.children);
      });
    };
    iterateChildren(mailboxes.children);

    return finalMailboxes;

  } /* End listMailboxes(). */


  /**
   * Lists basic information about messages in a named mailbox.
   *
   * @param inCallOptions An object implementing the ICallOptions interface.
   * @return              An array of objects, one per message.
   */
  public async listMessages(inCallOptions: ICallOptions): Promise<IMessage[]> {

    console.log("IMAP.Worker.listMessages()", inCallOptions);

    const client: any = await this.connectToServer();
    // We have to select the mailbox first.  This gives us the message count.
    const mailbox: any = await client.selectMailbox(inCallOptions.mailbox); //=========================================================================
    console.log(`IMAP.Worker.listMessages(): Message count = ${mailbox.exists}`);
    // If there are no messages then just return an empty array.
    if (mailbox.exists === 0) {
      await client.close();
      return [ ];
    }

    // Okay, there are messages, let's get 'em!  Note that they are returned in order by uid, so it's FIFO.
    // noinspection TypeScriptValidateJSTypes
    const messages: any[] = await client.listMessages(
      inCallOptions.mailbox, // 1st argument: mailbox name
      "1:*", // 2nd argument: query that determines what messages we'll get. Here: we want msgs beginning with the first one and all messages after it.
      [ "uid", "envelope" ] // 3rd argument: properties - unique ID & meta-data
    );

    await client.close();

    // Translate from emailjs-imap-client message objects to app-specific objects.
    const finalMessages: IMessage[] = [];
    messages.forEach((inValue: any) => {
      finalMessages.push({
        id : inValue.uid,
        date: inValue.envelope.date,
        from: inValue.envelope.from[0].address,
        subject: inValue.envelope.subject
      });
    });
    return finalMessages;
  } /* End listMessages(). */


  /**
   * Gets the plain text body of a single message.
   *
   * @param  inCallOptions An object implementing the ICallOptions interface.
   * @return               The plain text body of the message.
   */
  public async getMessageBody(inCallOptions: ICallOptions): Promise<string> {

    console.log("IMAP.Worker.getMessageBody()", inCallOptions);

    const client: any = await this.connectToServer();
    // noinspection TypeScriptValidateJSTypes
    const messages: any[] = await client.listMessages(
      inCallOptions.mailbox,
      inCallOptions.id,
      [ "body[]" ],
      { byUid : true }
    );
    const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
    await client.close();
    return parsed.text;
  } /* End getMessageBody(). */


  /**
   * Deletes a single message.
   *
   * @param inCallOptions An object implementing the ICallOptions interface.
   */
  public async deleteMessage(inCallOptions: ICallOptions): Promise<any> {

    console.log("IMAP.Worker.deleteMessage()", inCallOptions);

    const client: any = await this.connectToServer();
    await client.deleteMessages(
      inCallOptions.mailbox,
      inCallOptions.id,
      { byUid : true }
    );
    await client.close();
  } /* End deleteMessage(). */
} /* End class. */