import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const postContact = async ({ properties }: { properties: any }) => {
  try {
    const contact = await axios.post(
      `${process.env.HUBSPOT_API_URL}/contacts`,
      {
        properties,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    return {
      message: "Contacto creado correctamente",
      contact: contact.data,
      status: contact.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al crear el contacto ",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const getContactById = async (id: number) => {
  try {
    const contact = await axios.get(
      `${process.env.HUBSPOT_API_URL}/contacts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        params: {
          properties: "firstname,lastname,email,phone",
        },
      }
    );
    return {
      message: "Contacto encontrado correctamente",
      contact: contact.data,
      status: contact.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al encontrar el contacto",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const updateContact = async ({
  id,
  properties,
}: {
  id: string;
  properties: any;
}) => {
  try {
    const contact = await axios.patch(
      `${process.env.HUBSPOT_API_URL}/contacts/${id}`,
      {
        properties,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );
    return {
      message: "Contacto actualizado correctamente",
      contact: contact.data,
      status: contact.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al actualizar el contacto",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const getContactByEmail = async (email: string) => {
  try {
    const contact = await axios.get(
      `${process.env.HUBSPOT_API_URL}/contacts/${email}?idProperty=email`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        params: {
          properties: "firstname,lastname,email,phone",
        },
      }
    );
    return {
      message: "Contacto encontrado correctamente",
      contact: contact.data,
      status: contact.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al encontrar el contacto",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const deleteContact = async (id: string) => {
  try {
    const contact = await axios.delete(
      `${process.env.HUBSPOT_API_URL}/contacts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    return {
      message: "Contacto eliminado correctamente",
      contact: contact.data,
      status: contact.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al eliminar el contacto",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const getContacts = async (limit: number, after: string | null) => {
  try {
    const contacts = await axios.get(
      `${process.env.HUBSPOT_API_URL}/contacts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        params: {
          limit,
          after,
          properties: "firstname,lastname,email,phone",
        },
      }
    );
    return {
      message: "Contactos encontrados correctamente",
      contacts: contacts.data,
      status: contacts.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al encontrar los contactos",
      status: error.status,
      details: error.response.data,
    };
  }
};

export const deleteBatchContacts = async (ids: any) => {
  try {
    const contactsDeleted = await axios.post(
      `${process.env.HUBSPOT_API_URL}/contacts/batch/archive`,
      {
        ...ids,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    return {
      message: "Contactos eliminados correctamente",
      contactsDeleted: contactsDeleted.data,
      status: contactsDeleted.status,
    };
  } catch (error: any) {
    return {
      message: "Hubo un problema al eliminar los contactos",
      status: error.status,
      details: error.response.data,
    };
  }
};
