import React, { createContext, useContext, useState } from "react";
import { useModal } from "./ModalContext";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const { openModal, closeModal } = useModal();
  const [resolver, setResolver] = useState(null);

  const confirm = (message) => {
    return new Promise((resolve) => {
      setResolver(() => resolve); // Store resolver function
      openModal("Confirmation", <>
        <p>{message}</p>
        <div className="button-group-confirm">
          <button className="button button-primary" onClick={() => { resolve(true); closeModal(); }}>Yes</button>
          <button className="button" onClick={() => { resolve(false); closeModal(); }}>No</button>
        </div>
      </>);
    });
  };

  const handleConfirm = (result) => {
    if (resolver) {
      resolver(result); // Resolve promise with true/false
    }
    close();
  };

  const close = () => {
    setResolver(null);
    closeModal();
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
