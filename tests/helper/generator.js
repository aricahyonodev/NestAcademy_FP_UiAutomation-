import { faker } from "@faker-js/faker";

export function username() {
  return faker.internet.userName().toLocaleLowerCase();
}

export function password() {
  return faker.internet.password();
}
