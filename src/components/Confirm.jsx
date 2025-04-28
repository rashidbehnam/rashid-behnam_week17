import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
const Confirm = ({show, message, onConfirm, onCancel }) =>{
  const buttonRef=useRef(null);
  const modalRef=useRef(null);
  useEffect(()=>{
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    
      if(show && modalRef.current){
        
          buttonRef.current.focus();
        
           modalRef.current.addEventListener('keydown',handleKeyDown);
      }

      return ()=>{
         if (modalRef.current) {
            modalRef.current.removeEventListener("keydown", handleKeyDown);
           
        }
    }
  },[show,onCancel]);


      if(!show) return null;

      return ReactDOM.createPortal(
       <div className='backdrop' ref={modalRef} onClick={onCancel}>
         <div className="confirm"  tabIndex={0} onClick={(e)=>e.stopPropagation()}>
          <div className="confirm-header">
            <span>Confirmation!</span>
          </div>
        <p>{message}</p>
        <div className="button-group">
        <button tabIndex={2} className='button button-primary' onClick={onConfirm}>Yes</button>
        <button tabIndex={1} className='button' ref={buttonRef} onClick={onCancel}>No</button>
        </div>
      </div>
       </div>
      ,document.getElementById('modal'));
    
}
  export default Confirm;
  