"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
// Node imports.
var path = require("path");
// Library imports.
var Datastore = require("nedb");
// The worker that will perform contact operations.
var Worker = /** @class */ (function () {
    /**
     * Constructor.
     * Upon construction, a NeDB Datastore object is created, and a path to the contacts.
     * db file is given. We tell NeDB to load it automatically,
     * and NeDB will create the file for us if it doesn’t already exist.
     */
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    } /* End constructor. */
    /**
     * Lists all contacts.
     *
     * @return A promise that eventually resolves to an array of IContact objects.
     */
    Worker.prototype.listContacts = function () {
        var _this = this;
        console.log("Contacts.Worker.listContacts()");
        return new Promise(function (inResolve, inReject) {
            _this.db.find({}, // some criteria (technically an empty search criteria object, to be pedantic)
            function (inError, inDocs) {
                if (inError) {
                    console.log("Contacts.Worker.listContacts(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.listContacts(): Ok", inDocs);
                    inResolve(inDocs);
                }
            });
        });
    }; /* End listContacts(). */
    /**
     * Add a new contact.
     *
     * @param  inContact The contact to add.
     * @return           A promise that eventually resolves to an IContact object.
     */
    Worker.prototype.addContact = function (inContact) {
        var _this = this;
        console.log("Contacts.Worker.addContact()", inContact);
        return new Promise(function (inResolve, inReject) {
            _this.db.insert(inContact, function (inError, inNewDoc) {
                if (inError) {
                    console.log("Contacts.Worker.addContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.addContact(): Ok", inNewDoc);
                    inResolve(inNewDoc);
                }
            });
        });
    }; /* End addContact(). */
    /**
     * Delete a contact.
     *
     * @param  inID The ID of the contact to delete.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    Worker.prototype.deleteContact = function (inID) {
        var _this = this;
        console.log("Contacts.Worker.deleteContact()", inID);
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, // provides some additional flexibility
            function (inError, inNumRemoved) {
                if (inError) {
                    console.log("Contacts.Worker.deleteContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    console.log("Contacts.Worker.deleteContact(): Ok", inNumRemoved);
                    inResolve();
                }
            });
        });
    }; /* End deleteContact(). */
    /**
     * Update a contact.
     *
     * @param  inID The ID of the contact to update.
     * @return      A promise that eventually resolves to a string (null for success, or the error message for an error).
     */
    Worker.prototype.updateContact = function (inContact) {
        var _this = this;
        console.log("Contacts.Worker.updateContact()", " - ", inContact.name, ":", inContact.email);
        return new Promise(function (inResolve, inReject) {
            // db.update(query, update, options, callback)
            _this.db.update({ _id: inContact._id }, inContact, { multi: false, upsert: false, returnUpdatedDocs: true }, function (inError, numAffected, affectedDocuments, upsert) {
                if (inError) {
                    console.log("Contacts.Worker.updateContact(): Error", inError);
                    inReject(inError);
                }
                else {
                    inResolve(affectedDocuments);
                }
            });
        });
    };
    return Worker;
}()); /* End class. */
exports.Worker = Worker;
