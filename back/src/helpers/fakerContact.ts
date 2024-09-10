import { faker } from "@faker-js/faker";

export const fakerContactGenerator = () => {
  return {
    email: faker.internet.email(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    phone: faker.phone.number({
      style: "national",
    }),
  };
};
