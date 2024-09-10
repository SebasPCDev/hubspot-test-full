import app from "../app";
import request from "supertest";

describe("GET Obtener contacto por email", () => {
  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const allContacts = await request(app).get("/contacts");
    const { contacts } = allContacts.body;

    // Obtener el ID de un contacto aleatorio
    const randomContact =
      contacts.results[Math.floor(Math.random() * contacts.results.length)];

    const response = await request(app).get(
      `/contacts/search/?email=${randomContact.properties.email}`
    );

    // Verificar que la respuesta sea exitosa
    expect(response.status).toBe(200);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty(
      "message",
      "Contacto encontrado correctamente"
    );
    expect(response.body).toHaveProperty("status", 200);

    const { contact } = response.body;

    // Validar los campos de cada contacto
    expect(contact).toHaveProperty("archived", false);
    expect(contact).toHaveProperty("createdAt");
    expect(contact).toHaveProperty("id");
    expect(contact).toHaveProperty("updatedAt");
    expect(contact).toHaveProperty("properties");

    // Validar las propiedades del contacto
    const { properties } = contact;

    expect(properties).toHaveProperty("email", randomContact.properties.email);
    expect(properties).toHaveProperty(
      "firstname",
      randomContact.properties.firstname
    );
    expect(properties).toHaveProperty(
      "lastname",
      randomContact.properties.lastname
    );
    expect(properties).toHaveProperty("phone", randomContact.properties.phone);
  });
});
