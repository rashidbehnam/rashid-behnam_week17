// Modal.js
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {useModal} from '../../Context/ModalContext'

const modalRoot = document.getElementById('modal-root') || document.body;

export default function Modal() {

    const {isOpen,modalTitle,modalContent,closeModal}=useModal();

  const modalRef = useRef(null);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  // Trap Tab focus
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === 'Escape') {
        closeModal();
      }
    }

    modalRef.current.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='backdrop' onClick={closeModal}>
      <div
        className='modal'
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        tabIndex="-1"
      >
        <header className='modal-header'>
            <h3>{modalTitle}</h3>
            <span className='x' onClick={closeModal}>x</span>
          </header>
        
        <div className="modal-content">
          {modalContent}
        </div>
        
      </div>
    </div>,
    modalRoot
  );
}


