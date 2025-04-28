import { useContext, useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom'
import ContactContext from '../Context/ContactContext'
function Modal({show,onClose}) {
    const {dispatch}=useContext(ContactContext);
    const buttonRef=useRef(null);
      const modalRef=useRef(null);
      useEffect(()=>{
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        };
        
          if(show && modalRef.current){
            
              buttonRef.current.focus();
              modalRef.current.addEventListener('keydown',handleKeyDown);
          }
    
          return ()=>{
           
              setErrors({});
              setFormData({
                name: "",
                family: "",
                email: "",
                phone: "",
              });
             if (modalRef.current) {
                modalRef.current.removeEventListener("keydown", handleKeyDown);
               
            }
        }
      },[show,onClose]);

      const [formData, setFormData] = useState({
        name: "",
        family: "",
        email: "",
        phone: "",
      });
    
      const [errors, setErrors] = useState({});
    
      const validateField = (name, value) => {
        let error = "";
    
        switch (name) {
          case "name":
            if (!value) {
              error = "Name cannot be empty.";
            } else if (value.length < 2) {
              error = "Name must be at least 2 characters long.";
            }
            else if (value.length >50) {
              error = "Name must be less than 50 characters long.";
            }
            break;
    
          case "family":
            if (!value) {
              error = "Family  cannot be empty.";
            } else if (value.length < 3) {
              error = "Family  must be at least 3 characters long.";
            }
            else if (value.length >50) {
              error = "Family must be less than 50 characters long.";
            }
            break;
    
          case "email":
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
              error = "Invalid email format.";
            }
            break;
    
          case "phone":
            const phonePattern = /^\+?[0-9]{10,15}$/; // Validates international format (+1234567890) or regular numbers
            if (!phonePattern.test(value)) {
              error = "Invalid phone number format.";
            }
            break;
    
          default:
            break;
        }
    
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      };
      const validateForm = () => {
        let newErrors = {};
    
        if (!formData.name || formData.name.length < 3 || formData.name.length > 50 ) {
          newErrors.name = "Name must be at least 3 characters and less than 50.";
        }
        if (!formData.family || formData.family.length < 3 || formData.family.length > 50 ) {
          newErrors.family = "Family must be at least 3 characters and less than 50.";
        }
    
        if (!formData.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
          newErrors.email = "Invalid email format.";
        }
    
        const phonePattern = /^\+?[0-9]{10,15}$/; 
        if (!phonePattern.test(formData.phone)) {
          newErrors.phone = "Invalid phone number format.";
        }
    
        setErrors(newErrors);

        return Object.values(newErrors).some((error) => error);
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value); 
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
       
        const hasErrors=validateForm();

        if (!hasErrors) {
          const trimmedFormData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => 
              [key, typeof value === 'string' ? value.trim() : value]
            )
          );
         dispatch({type:"ADD_CONTACT",payload:trimmedFormData})
         onClose();
        }
      };

    if(!show) return null;

    return ReactDom.createPortal(
    <div className='backdrop' tabIndex={0} ref={modalRef} onClick={onClose}>
        <div className="modal" onClick={(e)=>e.stopPropagation()}>
          <header className='modal-header'>
            <span>Add New Contact</span>
          </header>
        <div className="modal-content">
        <form onSubmit={handleSubmit}>
      <div className='input-group'>
        <label>Name:</label>
        <input ref={buttonRef} type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>
      <div className='input-group'>
        <label>Family:</label>
        <input type="text" name="family" value={formData.family} onChange={handleChange} />
        {errors.family && <p style={{ color: "red" }}>{errors.family}</p>}
      </div>

      <div className='input-group'>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div className='input-group'>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div> 
      
      <div className="button-group">
        <button  tabIndex={2} className="button button-primary" type="submit">Submit</button>
      <button type='button' tabIndex={1} className='button' onClick={onClose}  >Close</button>
      </div>
        
    </form>

        </div>
    </div>
    </div>
  ,document.getElementById('modal'));
}

export default Modal


