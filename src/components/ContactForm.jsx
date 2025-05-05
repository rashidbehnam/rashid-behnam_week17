import { useState, useContext } from "react";
import ContactContext from "../context/ContactContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactForm = ({ contact, closeForm }) => {

  const schema = yup.object().shape({
    name: yup.string()
    .required("Name is required")
    .min(3,"Name must be at least 3 characters")
    .max(20,"Name must be at most 20 characters"),
    family:yup.string()
    .required("Family is required")
    .min(3,"Family must be at least 3 characters")
    .max(30,"Family must be at most 30 characters"),
    email: yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
    phone: yup
  .string()
  .required("Phone number is required")
  .matches(/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10,14}$/, "Enter a valid phone number"),
  });
  const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)});

  const { dispatch } = useContext(ContactContext);


  const onSubmit = data => {
    

    
    dispatch({ type: contact ? "EDIT_CONTACT" : "ADD_CONTACT", payload: contact? {...data,id:contact.id} :data });
    closeForm();
  };

  return (
    

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input   {...register("name")} placeholder="Name" defaultValue={contact?.name} />
          </div>
          <p>{errors.name?.message}</p>
        </div>
      <div className="form-group">
        <div className="input-group">
        <label htmlFor="family">Family:</label>
        <input   {...register("family")}  placeholder="Family" defaultValue={contact?.family} />
        </div>
        <p>{errors.family?.message}</p>
        </div>
        <div className="form-group">
          <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input  {...register("email")} placeholder="Email"  defaultValue={contact?.email}/>
          </div>
          <p>{errors.email?.message}</p>
        </div>
     <div className="form-group">
      <div className="input-group">
      <label htmlFor="phone">Phone:</label>
      <input  {...register("phone")} placeholder="phone"  defaultValue={contact?.phone}/>
      </div>
      <p>{errors.phone?.message}</p>
     </div>
      <div className="button-group">
      <button className="button button-primary" type="submit">{contact ? "Update Contact" : "Add Contact"}</button>
      <button type="button" className="button" onClick={closeForm}>Cancel</button>
      </div>
    </form>
  

  );
};

export default ContactForm;
