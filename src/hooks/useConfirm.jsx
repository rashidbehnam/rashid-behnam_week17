import { useState } from 'react';
import ConfirmComponent from '../components/Confirm'
export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [resolver, setResolver] = useState(null);

  function confirm(msg) {
    setMessage(msg);
    setIsOpen(true);

    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }

  function handleConfirm() {
    if (resolver) resolver(true);
    close();
  }

  function handleCancel() {
    if (resolver) resolver(false);
    close();
  }

  function close() {
    setIsOpen(false);
    setMessage('');
    setResolver(null);
  }

  const ConfirmModal = isOpen ? (
    <ConfirmComponent show={isOpen} message={message} onCancel={handleCancel} onConfirm={handleConfirm} />
  ) : null;

  return { confirm, ConfirmModal };
}


