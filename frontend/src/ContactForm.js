import { useState, useEffect } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const updating = Object.keys(existingContact).length > 0;

  useEffect(() => {
    if (Object.keys(existingContact).length > 0) {
      setFirstName(existingContact.firstName || "");
      setLastName(existingContact.lastName || "");
      setEmail(existingContact.email || "");
    }
  }, [existingContact]);
  

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = { firstName, lastName, email };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok) {
      updateCallback();
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
  <div>
    <label className="block font-medium">First Name:</label>
    <input
      className="w-full border px-3 py-2 rounded"
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
  </div>
  <div>
    <label className="block font-medium">Last Name:</label>
    <input
      className="w-full border px-3 py-2 rounded"
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
    />
  </div>
  <div>
    <label className="block font-medium">Email:</label>
    <input
      className="w-full border px-3 py-2 rounded"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <button
    type="submit"
    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    {existingContact?.id ? "Update" : "Create"}
  </button>
</form>
  );
};

export default ContactForm;
