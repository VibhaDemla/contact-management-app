import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editContact } from '../Redux/action';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is always a string
  console.log(id);

  const dispatch = useDispatch();

  const allContacts = useSelector((store: any) => store.contacts);

  const [form, setForm] = useState<Contact>({
    id: '',
    first_name: '',
    last_name: '',
    mob: '',
    status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
  dispatch(editContact({ contactId: id ?? '', ...form }));
};

  

useEffect(() => {
  // Find the contact with the matching id from the Redux store
  const contact = allContacts.find((el: Contact) => el.id == id);
  
  // If a contact is found, set the form state with its data
  if (contact) {
    setForm(contact);
  }
}, [id, allContacts]);

  return (
    <div className="w-1/2 mx-auto my-4 pt-16">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="first-name">
          First Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="first-name"
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="last-name">
          Last Name
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="last-name"
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="mob">
          Mobile Number
        </label>
        <input
          className="w-full border border-gray-400 p-2 rounded-md"
          id="mob"
          type="number"
          name="mob"
          value={form.mob}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="w-full border border-gray-400 p-2 rounded-md"
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value={'active'}>Active</option>
          <option value={'inactive'}>Inactive</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save Contact
      </button>
    </div>
  );
};

export default EditContact;
