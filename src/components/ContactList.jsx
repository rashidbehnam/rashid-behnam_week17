import { useContext, useState } from "react";
import ContactContext from "../context/ContactContext";
import {useModal} from '../Context/ModalContext';
import ContactItem from "./ContactItem";

import searchIcon from '../assets/search.svg'
import addIcon from '../assets/add.svg'
import ContactForm from '../components/ContactForm'
import {useConfirm} from '../Context/ConfirmContext'
const ContactList = () => {
  
  const {openModal,closeModal}=useModal();
  const {confirm} =useConfirm();
  const { contacts, dispatch } = useContext(ContactContext);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const [search, setSearch] = useState("");
 
  const filteredContacts = contacts.filter(contact =>
    (contact.name.toLowerCase() + ' ' + contact.family.toLowerCase())
    .includes(search.toLowerCase()) || contact.email.includes(search) || contact.phone.includes(search)
  );

  const handleDeleteGroup = async() => {
    const confirmed=await confirm("Are you sure you want to Delete?");
    if (confirmed) {
      dispatch({ type: "DELETE_GROUP", payload: selectedContacts });
      setSelectedContacts([]);
    }
  };

  const handleDelete=async(id)=>{
    const confirmed= await confirm("Are you sure to delete the selected contact?");
    if(confirmed){
      console.log(id)
      dispatch({type:"DELETE_CONTACT",payload:id});
    }
  }
  


  return (
    <main>
   
      <div className="list-header">
      <h1 className="list-header__title">Contacts</h1>
      <div>
      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="search-box" />
      <img src={searchIcon} alt="search icons" className="icon"/>
      </div>
      <div >
      <button onClick={()=>openModal('New Contact',<ContactForm closeForm={closeModal}/>) }className="button button-primary">New <img src={addIcon} alt="add icon" className="icon icon-white"/></button>
      <button onClick={handleDeleteGroup} disabled={!selectedContacts.length} className="button">Delete Selected</button>
      </div>
      
    </div>
    <div className='list-container'>
    <table>
  <thead>
    <tr>
      <th>Select</th>
      <th>Name/Family</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    
  {filteredContacts.map(contact => (
      <ContactItem key={contact.id} contact={contact} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} onDelete={handleDelete} onEdit={()=>openModal("Edit Contact",<ContactForm closeForm={closeModal} contact={contact}/>)} />
    ))}
  </tbody>
</table>

    
    </div>
    </main>
  );
};

export default ContactList;
