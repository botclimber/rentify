import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const v: string = "v1"
const service: string = "notification"

app.get('/', (req: Request, res: Response) => {
  res.send('Notification Service | API page on development ...');
});

/**
 * Create new subscription
 */
app.post("/"+service+"/"+v+"/sub", (req: Request, res: Response) => {
  
});

/**
 * Send email to residence owner from user
 * owner email should preferencial be hidden from common user (for now lets just apparently hide it, in future we can just make a request to UsersService by userId in order to find the owner email, and then by completly hide the owner email)
 * 
 * 
 */ 
app.post("/"+service+"/"+v+"/emToOwner", (req: Request, res: Response) => {
  
});

// TODO: create massive email sending request

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});