"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@azure/functions");
const communication_email_1 = require("@azure/communication-email");
require("dotenv/config");
const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];
if (!connectionString)
    throw new Error("No connectionString was found!!!");
const emailClient = new communication_email_1.EmailClient(connectionString);
const sendMail = (request, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = {
            senderAddress: "DoNotReply@5072976a-1ebf-4851-a836-fd920f26dd74.azurecomm.net",
            content: {
                subject: "Welcome to Azure Communication Services Email",
                plainText: "This email message is sent from Azure Communication Services Email using the JavaScript SDK.",
            },
            recipients: {
                to: [
                    {
                        address: "mtjkapral@gmail.com",
                    },
                ],
            },
        };
        const poller = yield emailClient.beginSend(message);
        try {
            const completed = yield poller.pollUntilDone();
            return {
                status: 200,
            };
        }
        catch (e) {
            return {
                status: 500,
            };
        }
    }
    catch (e) {
        return {
            status: 500,
        };
    }
});
functions_1.app.http("sendMail", {
    methods: ["POST"],
    handler: sendMail,
});
