export const getAllContacts = async () => {
  const response = await fetch("http://localhost:3000/contacts");
  const data = await response.json();
  return data;
};

export const getContactByEmail = async (email) => {
  const response = await fetch(
    `http://localhost:3000/contacts/search/?email=${email}`
  );
  const data = await response.json();

  return data;
};

export const createContact = async (contact) => {
  const response = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  const data = await response.json();
  return data;
};
