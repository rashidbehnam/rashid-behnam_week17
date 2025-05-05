import {  useState } from 'react';
import {useModal} from '../Context/ModalContext'

export const useConfirm=()=> {
  const { openModal, closeModal } = useModal();
  const [resolver, setResolver] = useState(null);

  function confirm(msg) {
    return new Promise((resolve) => {
      setResolver(() => resolve); // Ensure we set resolver correctly
      openModal('Confirmation', <>
        <p>{msg}</p>
        <div className="button-group-confirm">
          <button className="button button-primary" onClick={() => handleConfirm(true)}>Yes</button>
          <button className="button" onClick={() => handleConfirm(false)}>No</button>
        </div>
      </>);
    });
  }

  const handleConfirm=(result)=> {
    if (resolver) {
      resolver(result); // Resolve the promise with `true` or `false`
    }
    close();
  }

  const close=()=> {
    setResolver(null);
    closeModal();
  }

  return confirm;
}
