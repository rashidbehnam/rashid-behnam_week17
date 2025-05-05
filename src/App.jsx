import { ContactProvider } from "./context/ContactContext";
import {ModalProvider} from './Context/ModalContext'
import {ConfirmProvider} from './Context/ConfirmContext'
import ContactList from "./components/ContactList";
import Modal from "./components/Modal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <ContactProvider>
    <ModalProvider>
      <ConfirmProvider>

      <ContactList/>
      <Modal/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        theme="light"
      />
      </ConfirmProvider>
      
    </ModalProvider>
  </ContactProvider>
);

export default App;
