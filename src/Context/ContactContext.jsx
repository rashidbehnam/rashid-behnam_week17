import { toast } from "react-toastify";
import {
  fetchContacts,
  addContact as addContactApi,
  updateContact as updateContactApi,
  deleteContact as deleteContactApi,
  deleteMultipleContacts as deleteGroupApi,
} from "../api/contactsApi";

import { createContext, useReducer, useEffect, useState, useContext } from "react";

const ContactContext = createContext();

const initialState =[];

const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return action.payload;
    case "ADD_CONTACT":
      return [...state, {id:state.length+1,...action.payload}];
    case "EDIT_CONTACT":
      return state.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );
    case "DELETE_CONTACT":
      return state.filter(contact => contact.id !== action.payload);
    case "DELETE_GROUP":
      return state.filter(contact => !action.payload.includes(contact.id));
   
    default:
      return state;
  }
};

export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
  
      await toast.promise(
        fetchContacts().then((data) => {
          dispatch({ type: "SET_CONTACTS", payload: data });
        }),
        {
          pending: "Loading contacts...",
          success: "Contacts loaded!",
          error: "Failed to fetch contacts",
        }
      );
  
      setLoading(false);
    };
  
    loadContacts();
  }, []);
  

  // Add contact
  const addContact = async (contact) => {
    await toast.promise(
      addContactApi(contact).then((saved) => {
        dispatch({ type: "ADD_CONTACT", payload: saved });
      }),
      {
        pending: "Adding contact...",
        success: "Contact added!",
        error: "Failed to add contact",
      }
    );
  };
  

  // Edit contact
  const editContact = async (id, updated) => {
    await toast.promise(
      updateContactApi(id, updated).then((edited) => {
        dispatch({ type: "EDIT_CONTACT", payload: edited });
      }),
      {
        pending: "Updating...",
        success: "Contact updated!",
        error: "Update failed",
      }
    );
  };
  

  // Delete one contact
  const deleteContact = async (id) => {
    await toast.promise(
      deleteContactApi(id).then(() => {
        dispatch({ type: "DELETE_CONTACT", payload: id });
      }),
      {
        pending: "Deleting...",
        success: "Deleted!",
        error: "Delete failed",
      }
    );
  };
  

  // Delete multiple contacts
  const deleteGroup = async (ids) => {
    await toast.promise(
      deleteGroupApi(ids).then(() => {
        dispatch({ type: "DELETE_GROUP", payload: ids });
      }),
      {
        pending: "Deleting selected contacts...",
        success: `${ids.length} contacts deleted.`,
        error: "Group delete failed",
      }
    );
  };
  

  return (
    <ContactContext.Provider
      value={{
        contacts,
        dispatch,
        loading,
        error,
        addContact,
        editContact,
        deleteContact,
        deleteGroup,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContact=()=>useContext(ContactContext);