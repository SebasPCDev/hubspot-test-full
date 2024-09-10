import app from "../app";
import request from "supertest";

describe("DELETE Eliminar contacto por ID", () => {
  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const allContacts = await request(app).get("/contacts");
    const { contacts } = allContacts.body;

    // Obtener el ID de un contacto aleatorio
    const randomContact =
      contacts.results[Math.floor(Math.random() * contacts.results.length)];

    const response = await request(app).delete(`/contacts/${randomContact.id}`);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty("contact", "");
    expect(response.body).toHaveProperty(
      "message",
      "Contacto eliminado correctamente"
    );
    expect(response.body).toHaveProperty("status", 204);
  });
});
