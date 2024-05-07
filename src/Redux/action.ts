// action.ts
import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

/**
 * The Contact interface defines the structure of a contact object.
 */
interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    mob: string;
    status: string;
}

/**
 * The addContact function is an action creator that creates an action to add a new contact to the Redux store.
 * @param payload The new contact object to be added.
 */
export const addContact = (payload: Contact) => {
    console.log(payload);
    return {
        type: ADD_CONTACT,
        payload,
    };
};

/**
 * The removeContact function is an action creator that creates an action to remove a contact from the Redux store.
 * @param id The id of the contact to be removed.
 */
export const removeContact = (id: string) => {
    return {
        type: REMOVE_CONTACT,
        payload: {
            id,
        },
    };
};

/**
 * The editContact function is an action creator that creates an action to edit a contact in the Redux store.
 * @param payload The updated contact object.
 */
export const editContact = (payload: { contactId: string; first_name: string; last_name: string; mob: string; status: string }) => {
    console.log(payload);
    return {
      type: EDIT_CONTACT,
      payload,
    };
  };