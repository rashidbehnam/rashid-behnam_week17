const BASE_URL = "http://localhost:3001/contacts";

// GET all contacts
export const fetchContacts = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return await res.json();
};

// POST a new contact
export const addContact = async (contact) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to add contact");
  return await res.json();
};

// PUT update an existing contact
export const updateContact = async (id, updatedContact) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedContact),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return await res.json();
};

// DELETE a single contact
export const deleteContact = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete contact");
  return id; // Return ID to simplify reducer usage
};

// DELETE multiple contacts
export const deleteMultipleContacts = async (ids) => {
  await Promise.all(ids.map(id => deleteContact(id)));
  return ids;
};
