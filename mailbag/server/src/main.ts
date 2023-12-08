// Node imports.
import path from "path";

// Library imports.
import express, { Express, NextFunction, Request, Response } from "express";

// App imports.
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";


// Our Express app.
const app: Express = express();


// Handle JSON in request bodies.
app.use(express.json());


// Serve the client.
app.use("/", express.static(path.join(__dirname, "../../client/dist")));


// Enable CORS so that we can call the API even from anywhere.
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  inNext();
});


// ---------- RESTful endpoint operations begin. ----------

// REST Endpoint: List Mailboxes - Get list of mailboxes.
// app.get() is used to register this path.
// The resource we're getting is a list of mailboxes,
// so /mailboxes is a logical choice for the path.
// All the app.XXX() calls require a callback function to execute.
// Since we're going to make some asynchronous calls using "await" keyword,
// we have to throw an "async" keyword before the function.
app.get("/mailboxes",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /mailboxes (1)");
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
      console.log("GET /mailboxes (1): Ok", mailboxes);
      inResponse.status(200);
      inResponse.json(mailboxes);
    } catch (inError) {
      console.log("GET /mailboxes (1): Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);

// REST Endpoint: List Messages
// Get list of messages in a mailbox (does NOT include bodies).
// (Anything beginning with a semicolon in the path is taken to be such a replacement token.)
app.get("/mailboxes/:mailbox",
  async (inRequest: Request, inResponse: Response) => {
    console.log("The input mailbox name: ", inRequest.params.mailbox);
    console.log("GET /mailboxes (2)", inRequest.params.mailbox);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);

      // Change back path to the valid one.
      if( inRequest.params.mailbox === "INBOX" ){
        // do nothing
      } else if ( inRequest.params.mailbox === "Gmail" ) {
        inRequest.params.mailbox = "[Gmail]";
      } else if ( inRequest.params.mailbox === "AllMail" ) {
        inRequest.params.mailbox = "[Gmail]/All Mail";
      } else if ( inRequest.params.mailbox === "Drafts" ) {
        inRequest.params.mailbox = "[Gmail]/Drafts";
      } else if ( inRequest.params.mailbox === "Important" ) {
        inRequest.params.mailbox = "[Gmail]/Important";
      } else if ( inRequest.params.mailbox === "SentMail" ) {
        inRequest.params.mailbox = "[Gmail]/Sent Mail";
      } else if ( inRequest.params.mailbox === "Spam" ) {
        inRequest.params.mailbox = "[Gmail]/Spam";
      } else if ( inRequest.params.mailbox === "Starred" ) {
        inRequest.params.mailbox = "[Gmail]/Starred";
      } else if ( inRequest.params.mailbox === "Trash" ) {
        inRequest.params.mailbox = "[Gmail]/Trash";
      } else { 
        // do nothing
      }

      const messages: IMAP.IMessage[] = await imapWorker.listMessages({ // Call worker's listMessages! instead of emailjs-imap-client's listMessages
        mailbox : inRequest.params.mailbox
      });
      console.log("GET /mailboxes (2): Ok", messages);
      inResponse.status(200);
      inResponse.json(messages);
    } catch (inError) {
      console.log("GET /mailboxes (2): Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);

// REST Endpoint: Get a Message - Get a message's plain text body.
// This time, we need two tokens in the path: 
// the name of the mailbox and the ID of the message to retrieve. 
// After that, we call a different method (getMessageBody()) this time, and now
// we get a simple string back, which is the content of the message. 
// Also, note that because request parameters are always string, 
// but the getMessageBody() function requires an integer for the ID, that’s why parseInt() is needed.
app.get("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /messages (3)", inRequest.params.mailbox, inRequest.params.id);
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);

      // Change back path to the valid one.
      if( inRequest.params.mailbox === "INBOX" ){
        // do nothing
      } else if ( inRequest.params.mailbox === "Gmail" ) {
        inRequest.params.mailbox = "[Gmail]";
      } else if ( inRequest.params.mailbox === "AllMail" ) {
        inRequest.params.mailbox = "[Gmail]/All Mail";
      } else if ( inRequest.params.mailbox === "Drafts" ) {
        inRequest.params.mailbox = "[Gmail]/Drafts";
      } else if ( inRequest.params.mailbox === "Important" ) {
        inRequest.params.mailbox = "[Gmail]/Important";
      } else if ( inRequest.params.mailbox === "SentMail" ) {
        inRequest.params.mailbox = "[Gmail]/Sent Mail";
      } else if ( inRequest.params.mailbox === "Spam" ) {
        inRequest.params.mailbox = "[Gmail]/Spam";
      } else if ( inRequest.params.mailbox === "Starred" ) {
        inRequest.params.mailbox = "[Gmail]/Starred";
      } else if ( inRequest.params.mailbox === "Trash" ) {
        inRequest.params.mailbox = "[Gmail]/Trash";
      } else { 
        // do nothing
      }

      const messageBody: string = await imapWorker.getMessageBody({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("GET /messages (3): Ok", messageBody);
      inResponse.status(200);
      inResponse.send(messageBody);
    } catch (inError) {
      console.log("GET /messages (3): Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// REST Endpoint: Delete a message.
app.delete("/messages/:mailbox/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /messages");
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);

      // Change back path to the valid one.
      if( inRequest.params.mailbox === "INBOX" ){
        // do nothing
      } else if ( inRequest.params.mailbox === "Gmail" ) {
        inRequest.params.mailbox = "[Gmail]";
      } else if ( inRequest.params.mailbox === "AllMail" ) {
        inRequest.params.mailbox = "[Gmail]/All Mail";
      } else if ( inRequest.params.mailbox === "Drafts" ) {
        inRequest.params.mailbox = "[Gmail]/Drafts";
      } else if ( inRequest.params.mailbox === "Important" ) {
        inRequest.params.mailbox = "[Gmail]/Important";
      } else if ( inRequest.params.mailbox === "SentMail" ) {
        inRequest.params.mailbox = "[Gmail]/Sent Mail";
      } else if ( inRequest.params.mailbox === "Spam" ) {
        inRequest.params.mailbox = "[Gmail]/Spam";
      } else if ( inRequest.params.mailbox === "Starred" ) {
        inRequest.params.mailbox = "[Gmail]/Starred";
      } else if ( inRequest.params.mailbox === "Trash" ) {
        inRequest.params.mailbox = "[Gmail]/Trash";
      } else { 
        // do nothing
      }

      await imapWorker.deleteMessage({
        mailbox : inRequest.params.mailbox,
        id : parseInt(inRequest.params.id, 10)
      });
      console.log("DELETE /messages: Ok");
      inResponse.status(200);
      inResponse.send("ok");
    } catch (inError) {
      console.log("DELETE /messages: Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// REST Endpoint: Send a message.
// the HTTP POST method is used to send a message, 
// so app. post() is used to register the handler function. 
// In that function, the incoming request body will contain all the information we need 
// to send a message, including target email address, subject, and message text, 
// and the express.json middleware will have nicely parsed that into an object 
// for us to pass along to smtpWorker.sendMessage(). 
// Since the IMAP protocol is responsible for retrieving mailboxes and messages 
// while the SMTP protocol is used to send them, 
// it makes sense to have a separate module for each. 
// But, as you’ll see later, each of them presents a Worker class 
// that contains the methods we call. 
// We return a simple "ok" string here, nothing more is needed.
app.post("/messages",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /messages", inRequest.body);
    try {
      const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
      await smtpWorker.sendMessage(inRequest.body);
      console.log("POST /messages: Ok");
      inResponse.status(201); // 201 – CREATED: This response code is frequently used for POST creation of a new resource
      inResponse.send("ok");
    } catch (inError) {
      console.log("POST /messages: Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// REST Endpoint: List contacts.
app.get("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /contacts");
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contacts: IContact[] = await contactsWorker.listContacts();
      console.log("GET /contacts: Ok", contacts);
      inResponse.status(200);
      inResponse.json(contacts);
    } catch (inError) {
      console.log("GET /contacts: Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// REST Endpoint: Add a contact.
// Returns the added contact that is returned by contactsWorker. addContact(). 
// This object will contain "a unique identifier added" during the save process, 
// and the client will need to "display that new contact in the list" 
// and "will need to know that ID" in case the user decides to delete the contact.
app.post("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: IContact = await contactsWorker.addContact(inRequest.body);
      console.log("POST /contacts: Ok", contact);
      inResponse.status(201); // 201 – CREATED: This response code is frequently used for POST creation of a new resource
      inResponse.json(contact);
    } catch (inError) {
      console.log("POST /contacts: Error", inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// REST Endpoint: Delete a contact.
app.delete("/contacts/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /contacts", inRequest.body);
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      await contactsWorker.deleteContact(inRequest.params.id);
      console.log("Contact deleted");
      inResponse.status(200);
      inResponse.send("ok");
    } catch (inError) {
      console.log(inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);

// REST Endpoint: Update Contacts
app.put("/contacts",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const contactsWorker: Contacts.Worker = new Contacts.Worker();
      const contact: IContact = await contactsWorker.updateContact(inRequest.body);
      console.log("Contact updated");
      inResponse.status(202);
      inResponse.json(contact);
    } catch (inError) {
      console.log(inError);
      inResponse.status(400);
      inResponse.send("error");
    }
  }
);


// Start app listening.
app.listen(80, () => {
  console.log("MailBag server open for requests");
});
