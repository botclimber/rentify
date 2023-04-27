"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const v = "v1";
const service = "notification";
app.get('/', (req, res) => {
    res.send('Notification Service | API page on development ...');
});
/**
 * Create new subscription
 */
app.post("/" + service + "/" + v + "/sub", (req, res) => {
});
/**
 * Send email to residence owner from user
 * owner email should preferencial be hidden from common user (for now lets just apparently hide it, in future we can just make a request to UsersService by userId in order to find the owner email, and then by completly hide the owner email)
 *
 *
 */
app.post("/" + service + "/" + v + "/emToOwner", (req, res) => {
});
// TODO: create massive email sending request
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
