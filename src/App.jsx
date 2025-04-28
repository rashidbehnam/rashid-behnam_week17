import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList";


const App = () => (
  <ContactProvider>
    <ContactList /> 
  </ContactProvider>
);

export default App;
