import {CreateUser} from "../transfers/create-user";
import {User} from "../models/user";

export interface UserRepositoryContract {
  createOne(createUser: CreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
