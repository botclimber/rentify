import { myDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = myDataSource.getRepository(User);
