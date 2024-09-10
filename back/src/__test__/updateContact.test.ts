import request from "supertest";
import app from "../app";
import { fa, faker } from "@faker-js/faker";
import { fakerContactGenerator } from "@/helpers/fakerContact";

describe("PATCH Actualizar un cotacto", () => {
  // Generar un contacto faker
  const contact = fakerContactGenerator();

  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const allContacts = await request(app).get("/contacts");
    const { contacts } = allContacts.body;

    // Obtener el ID de un contacto aleatorio
    const randomContact =
      contacts.results[Math.floor(Math.random() * contacts.results.length)];

    console.log(Math.floor(Math.random() * contacts.results.length - 1));

    const response = await request(app)
      .patch(`/contacts/${randomContact.id}`)
      .send(contact);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty(
      "message",
      "Contacto actualizado correctamente"
    );
    expect(response.body).toHaveProperty("status", 200);

    const contactResponse = response.body.contact;

    // Validar las propiedades del contacto
    const { properties } = contactResponse;

    expect(properties).toHaveProperty(
      "email",
      contact.email.toLocaleLowerCase()
    );
    expect(properties).toHaveProperty("firstname", contact.firstname);
    expect(properties).toHaveProperty("lastname", contact.lastname);
    expect(properties).toHaveProperty("phone", contact.phone);
  });

  it("Debería devolver un error de usuario no encontrado", async () => {
    const fakeID = faker.string.uuid();
    const response = await request(app)
      .patch(`/contacts/${fakeID}`)
      .send(contact);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty(
      "message",
      "Hubo un problema al actualizar el contacto"
    );
    expect(response.body).toHaveProperty("details", {
      status: "error",
      message: "Object not found.  objectId are usually numeric.",
      correlationId: expect.any(String),
      context: {
        id: [fakeID],
      },
      category: "OBJECT_NOT_FOUND",
    });
    expect(response.body).toHaveProperty("status", 404);
  });

  it("Debería devolver un error de validación por un campo extra", async () => {
    const allContacts = await request(app).get("/contacts");
    const { contacts } = allContacts.body;

    // Obtener el ID de un contacto aleatorio
    const randomContact =
      contacts.results[Math.floor(Math.random() * contacts.results.length)];

    const randomExtraField = faker.word.sample();

    const response = await request(app)
      .patch(`/contacts/${randomContact.id}`)
      .send({ ...contact, [randomExtraField]: faker.word.sample() });

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty("message", [
      `Campos adicionales no permitidos: ${randomExtraField}`,
      `Campos adicionales no permitidos: ${randomExtraField}`,
      `Campos adicionales no permitidos: ${randomExtraField}`,
      `Campos adicionales no permitidos: ${randomExtraField}`,
    ]);
  });
});
