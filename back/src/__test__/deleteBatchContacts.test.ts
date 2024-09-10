import app from "../app";
import supertest from "supertest";

describe("DELETE Eliminar contactos en grupo", () => {
  const contactsToDelete = {
    inputs: [
      {
        id: "56451949686",
      },
      {
        id: "56468280135",
      },
      {
        id: "56468280136",
      },
    ],
  };
  it("Validar una respuesta exitosa y que la respuesta tenga la estructura esperada.", async () => {
    const response = await supertest(app)
      .post("/contacts/delete/batch")
      .send(contactsToDelete);

    // Verificar que la respuesta sea exitosa
    expect(response.status).toBe(200);

    // Verificar la estructura general del body
    expect(response.body).toHaveProperty(
      "message",
      "Contactos eliminados correctamente"
    );
    expect(response.body).toHaveProperty("status", 204);
    expect(response.body).toHaveProperty("contactsDeleted", "");
  });
});
