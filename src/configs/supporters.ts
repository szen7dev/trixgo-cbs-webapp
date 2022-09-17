import { User } from "typings/user";

export const supporters = [
  "hiepnh@pgipartner.com",
  "toannd@trixgo.com",
  "tungtt@pgipartner.com",
  "thupt@pgipartner.com",
  "hapt@pgipartner.com",
];

export function isSupporter(user: User): boolean {
  return supporters.includes(user.email);
}
