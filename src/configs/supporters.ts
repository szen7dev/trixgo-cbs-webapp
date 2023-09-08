import { User } from "typings/user";

export const supporters = [
  "hiepnh@pgipartner.com",
  "toannd@trixgo.com",
  "tungtt@pgipartner.com",
  "thupt@pgipartner.com",
  "hapt@pgipartner.com",
  "nhantt.trx@gmail.com",
  "hiepnh@trixgo.com",
];

export function isSupporter(user: User): boolean {
  return supporters.includes(user.email);
}