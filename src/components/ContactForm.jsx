import { useState, useContext } from "react";
import ContactContext from "../context/ContactContext";

const ContactForm = ({ contact, closeForm }) => {
  const { dispatch } = useContext(ContactContext);
  const [formData, setFormData] = useState(
    contact || { id: Date.now(), name: "", family: "", email: "" }
  );

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.family || !formData.email) return alert("All fields are required!");
    dispatch({ type: contact ? "EDIT_CONTACT" : "ADD_CONTACT", payload: formData });
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="family" value={formData.family} onChange={handleChange} placeholder="Family" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <button type="submit">{contact ? "Update Contact" : "Add Contact"}</button>
    </form>
  );
};

export default ContactForm;
