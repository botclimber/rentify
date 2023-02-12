import { myDataSource } from "../data-source";
import { Admin } from "../entities/Admin";
import { User } from "../entities/User";

export const userRepository = myDataSource.getRepository(User);
export const adminRepository = myDataSource.getRepository(Admin);
