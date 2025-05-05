import { ContactProvider } from "./context/ContactContext";
import {ModalProvider} from './Context/ModalContext'
import {ConfirmProvider} from './Context/ConfirmContext'
import ContactList from "./components/ContactList";
import Modal from "./components/Modal";


const App = () => (
  <ContactProvider>
    <ModalProvider>
      <ConfirmProvider>

      <ContactList/>
      </ConfirmProvider>
      <Modal/>
    </ModalProvider>
  </ContactProvider>
);

export default App;
