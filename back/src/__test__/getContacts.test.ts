import app from "../app";
import request from "supertest";

describe("GET contacts", () => {
  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const response = await request(app).get("/contacts");

    // Verificar que la respuesta sea exitosa
    expect(response.status).toBe(200);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty("contacts");
    expect(response.body).toHaveProperty(
      "message",
      "Contactos encontrados correctamente"
    );
    expect(response.body).toHaveProperty("status", 200);

    const { contacts } = response.body;

    // Verificar que existe el objeto paging
    expect(contacts).toHaveProperty("paging");
    expect(contacts.paging).toHaveProperty("next");
    expect(contacts.paging.next).toHaveProperty("after");
    expect(contacts.paging.next).toHaveProperty("link");

    // Verificar que existe el array de resultados
    expect(contacts).toHaveProperty("results");
    expect(Array.isArray(contacts.results)).toBe(true);

    // Validar los campos de cada contacto
    contacts.results.forEach((contact: any) => {
      expect(contact).toHaveProperty("archived", false);
      expect(contact).toHaveProperty("createdAt");
      expect(contact).toHaveProperty("id");
      expect(contact).toHaveProperty("updatedAt");
      expect(contact).toHaveProperty("properties");

      // Validar las propiedades del contacto
      const { properties } = contact;

      expect(properties).toHaveProperty("email");
      expect(properties).toHaveProperty("firstname");
      expect(properties).toHaveProperty("lastname");
      expect(properties).toHaveProperty("phone");
    });
  });
});
