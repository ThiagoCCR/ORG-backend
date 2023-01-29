import { prisma } from "@/config";
import { UserCredentials } from "@/protocols";

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
}

async function createUser(data: UserCredentials) {
  return prisma.user.create({
    data,
  });
}

const usersRepository = {
  findUserByEmail,
  createUser
};

export default usersRepository;
