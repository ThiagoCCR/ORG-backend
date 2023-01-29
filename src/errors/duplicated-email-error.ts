import { ApplicationError } from "@/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "duplicatedEmailError",
    message: "This Email is already taken!",
  };
}
