import { useContext, useState } from "react";
import ContactContext from "../context/ContactContext";
import ContactItem from "./ContactItem";
import Modal from "./Modal";
import EditContact from './EditContact'
import searchIcon from '../assets/search.svg'
import addIcon from '../assets/add.svg'

import {useConfirm} from '../hooks/useConfirm'
const ContactList = () => {
  
  const {confirm, ConfirmModal}=useConfirm();
  const { contacts, dispatch } = useContext(ContactContext);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editContact,setEditContact]=useState(null);
  const [search, setSearch] = useState("");
  const [showModal,setShowModal]=useState(false);
  const [showEditModal,setShowEditModal]=useState(false); 
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

      dispatch({type:"DELETE_CONTACT",payload:id});
    }
  }
  
  const handleEdit=(contact)=>{
      if(contact !=null){
        setEditContact(contact);
        setShowEditModal(true);
      }
  }

  return (
    <main>
      {ConfirmModal}
      <Modal show={showModal} onClose={()=>setShowModal(false)} />
      <EditContact show={showEditModal} contact={editContact}  onClose={()=>setShowEditModal(false)}/>
      <div className="list-header">
      <h1 className="list-header__title">Contacts</h1>
      <div>
      <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      <img src={searchIcon} alt="search icons" className="icon"/>
      </div>
      <div >
      <button onClick={()=>setShowModal(true) }className="button button-primary">New <img src={addIcon} alt="add icon" className="icon icon-white"/></button>
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
      <ContactItem key={contact.id} contact={contact} selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} onDelete={handleDelete} onEdit={handleEdit}/>
    ))}
  </tbody>
</table>

    
    </div>
    </main>
  );
};

export default ContactList;
