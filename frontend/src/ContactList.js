import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        updateCallback();
      } else {
        alert("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <table className="w-full table-auto border-collapse mt-4">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="p-2">First Name</th>
      <th className="p-2">Last Name</th>
      <th className="p-2">Email</th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {contacts.map((contact) => (
      <tr key={contact.id} className="border-b">
        <td className="p-2">{contact.firstName}</td>
        <td className="p-2">{contact.lastName}</td>
        <td className="p-2">{contact.email}</td>
        <td className="p-2 space-x-2">
          <button
            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            onClick={() => updateContact(contact)}
          >
            Update
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  );
};

export default ContactList;
