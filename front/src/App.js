import "./App.css";
import { useEffect, useState } from "react";
import { createContact, getAllContacts } from "./helpers/http";
import DataTable from "./components/ContactsTable";

function validationErrors(values) {
  let errors = {};
  if (!values.firstname) {
    errors.firstname = "El nombre es requerido";
  }
  if (!values.lastname) {
    errors.lastname = "El apellido es requerido";
  }
  if (!values.phone) {
    errors.phone = "El teléfono es requerido";
  }
  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  }
  if (
    values.email &&
    !values.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  ) {
    errors.email = "El correo electrónico no es válido";
  }
  return errors;
}

function App() {
  const initialFormData = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState({});
  const [showContacts, setShowContacts] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setErrors(validationErrors(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(validationErrors({ ...formData, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      setShowError(true);
      return;
    }
    const contact = await createContact(formData);
    if (contact.status !== 201) {
      alert("Error al guardar el contacto");
      return;
    }
    alert("Contacto guardado correctamente");
    setFormData(initialFormData);
  };

  const handleShowContacts = async () => {
    const data = await getAllContacts();
    console.log(data);
    setContacts(data);
    setShowContacts(true);
  };

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-evenly">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="input1"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="input1"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="input2"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="input2"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="input3"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono:
            </label>
            <input
              type="text"
              id="input3"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="input4"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico:
            </label>
            <input
              type="text"
              id="input4"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <input
              type="submit"
              value="Enviar"
              className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <div className="mt-5 mb-2">
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reiniciar formulario
              </button>
            </div>
            {showError ? (
              <span className="text-red-500">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key]}</p>
                ))}
              </span>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </form>
        <div>
          <button
            onClick={handleShowContacts}
            className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Mostrar contactos
          </button>
        </div>
      </div>
      <div>{showContacts && <DataTable data={contacts} />}</div>
    </div>
  );
}

export default App;
