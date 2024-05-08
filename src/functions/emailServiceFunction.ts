import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";
import "dotenv/config";

const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];
if (!connectionString) throw new Error("No connectionString was found!!!");
const emailClient = new EmailClient(connectionString);

const sendMail = async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
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

        const poller = await emailClient.beginSend(message);
        try {
            const completed = await poller.pollUntilDone();
            return {
                status: 200,
            };
        } catch (e) {
            return {
                status: 500,
            };
        }
    } catch (e) {
        return {
            status: 500,
        };
    }
};

app.http("sendMail", {
    methods: ["POST"],
    handler: sendMail,
});
