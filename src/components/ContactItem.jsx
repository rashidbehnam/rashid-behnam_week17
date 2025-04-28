import deleteIcon from '../assets/delete.svg'
import editIcon from '../assets/edit.svg'
const ContactItem = ({ contact, selectedContacts, setSelectedContacts,onDelete,onEdit}) => {
    return (
      <tr>
      <td><input type="checkbox" onChange={() => {
          setSelectedContacts(prev => prev.includes(contact.id) ? prev.filter(id => id !== contact.id) : [...prev, contact.id]);
        }} /></td>
      <td>{contact.name} {contact.family}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td>
      <button className="button button-primary" onClick={()=>onDelete(contact.id)}>Delete <img src={deleteIcon} alt="delete icon" className='icon icon-white' /></button>
      <button  className="button button-primary" onClick={() => onEdit(contact)}>Edit <img src={editIcon} alt="edit icon" className='icon icon-white' /></button>
       </td>
    </tr>
    );
  };
  export default ContactItem;
  