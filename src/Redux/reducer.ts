// reducer.ts
import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

/**
 * The Contact interface defines the structure of a contact object.
 */
interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

/**
 * The Action interface defines the structure of an action object.
 * It contains a type and a payload.
 */
interface Action {
  type: string;
  payload: Contact | { id: number };
}

/**
 * The State interface defines the structure of the application state.
 * It contains an array of contacts.
 */
interface State {
  contacts: Contact[];
}

/**
 * The initialState variable is used to initialize the application state.
 * It retrieves the contacts from local storage and parses them as a JSON object.
 */
const initialState: State = {
  contacts: JSON.parse(localStorage.getItem('contacts') || '[]') as Contact[],
};

/**
 * The reducer function is a pure function that takes the current state and an action as input,
 * and returns a new state based on the action type.
 * It handles three types of actions: ADD_CONTACT, EDIT_CONTACT, and REMOVE_CONTACT.
 */
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    /**
     * The ADD_CONTACT action adds a new contact to the state.
     * It checks if the contact has all required fields, and if it does not exist already.
     */
    case ADD_CONTACT: {
      const payload = action.payload as Contact;
      if (!payload.first_name ||!payload.last_name ||!payload.mob) {
        alert('Required fields are missing, please fill them');
        return state;
      }

      const existingContact = state.contacts.find(contact => contact.first_name === payload.first_name && contact.last_name === payload.last_name);
      if (existingContact) {
        alert('Contact already exists');
        return state;
      }

      const updatedContacts = [...state.contacts, {...payload, id: state.contacts.length + 1 }];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      alert('Contact saved successfully!');
      return {
       ...state,
        contacts: updatedContacts,
      };
    }
    /**
     * The REMOVE_CONTACT action removes a contact from the state.
     * It filters out the contact with the given id from the state.
     */
    case REMOVE_CONTACT: {
      const payload = action.payload as { id: number };
      const updatedContacts = state.contacts.filter(contact => contact.id!== payload.id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      alert('Contact removed successfully!');
      return {
       ...state,
        contacts: updatedContacts,
      };
    }
    /**
     * The EDIT_CONTACT action edits a contact in the state.
     * It checks if the contact has all required fields, and if it does not exist already.
     */
    case EDIT_CONTACT: {
      const payload = action.payload as Contact;
      if (!payload.first_name ||!payload.last_name ||!payload.mob) {
        alert('Required fields are missing, please fill them');
        return state;
      }

      const existingContact = state.contacts.find(contact => contact.id!== payload.id && contact.first_name === payload.first_name && contact.last_name === payload.last_name);
      if (existingContact) {
        alert('Contact with the same name already exists');
        return state;
      }

      const updatedContacts = state.contacts.map(contact => contact.id === payload.id? payload : contact);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      alert('Contact updated successfully!');
      return {
       ...state,
        contacts: updatedContacts,
      };
    }
    /**
     * The default case returns the current state if no matching action type is found.
     */
    default:
      return state;
  }
};

export default reducer;