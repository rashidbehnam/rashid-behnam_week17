import { createContext, useReducer, useEffect } from "react";

const ContactContext = createContext();

const initialState =JSON.parse(localStorage.getItem("contacts")) ||
   [{id:1,name:"rashid", family:"Behnam",email:"rashidbehnam2012@gmail.com",phone:"09145413546"},
    {id:2,name:"Naser",family:"Ajorfroush",email:"rashidbehnam2012@gmail.com",phone:"09145413546"},
    {id:3,name:"ali",family:"mohammadi",email:"ali.alone@gmail.com",phone:"09146428974"},
    {id:4,name:"milad",family:"Ghasemi",email:"milad.love80@gmail.com",phone:"09142578095"},
    {id:5,name:"hasan",family:"nasrollah",email:"hasanchikar@gmail.com",phone:"091456458725"}
  ];

const contactReducer = (state, action) => {
  switch (action.type) {
   
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

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactContext.Provider value={{ contacts, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
