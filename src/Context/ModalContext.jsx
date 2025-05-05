import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (title,content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalTitle('');
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen,modalTitle, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};


export const useModal = () => useContext(ModalContext);
