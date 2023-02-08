import { User } from "../../../../Database/src/entities/User";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
