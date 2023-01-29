import { duplicatedEmailError } from "@/errors";
import usersRepository from "@/repositories/users-repository";
import { UserCredentials } from "@/protocols";
import bcrypt from "bcrypt";

async function createUser(userCredentials: UserCredentials) {
  const isEmailUnique = await usersRepository.findUserByEmail(userCredentials.email);
  if (isEmailUnique !== null) throw duplicatedEmailError();
  const hashedPassword = await bcrypt.hash(userCredentials.password, 12);
  return usersRepository.createUser({
    email: userCredentials.email,
    password: hashedPassword,
    name: userCredentials.name,
  });
}

const usersService = {
  createUser,
};

export default usersService;
