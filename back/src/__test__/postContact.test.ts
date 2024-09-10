import app from "../app";
import request from "supertest";

import { fakerContactGenerator } from "@/helpers/fakerContact";

describe("POST Agregar un contacto", () => {
  const contact = fakerContactGenerator();

  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const response = await request(app).post("/contacts").send(contact);

    //verificamos estructura del body
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty(
      "message",
      "Contacto creado correctamente"
    );
    expect(response.body).toHaveProperty("status", 201);

    //verificamos estructura del contacto
    const contactResponse = response.body.contact;

    // Validar los campos de cada contacto
    expect(contactResponse).toHaveProperty("archived", false);
    expect(contactResponse).toHaveProperty("createdAt");
    expect(contactResponse).toHaveProperty("id");
    expect(contactResponse).toHaveProperty("updatedAt");
    expect(contactResponse).toHaveProperty("properties");

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
});
