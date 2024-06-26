    import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { addContact } from '../Redux/action';
    import { nanoid } from 'nanoid';

    // Define the FormState interface to specify the shape of the form state
    interface FormState {
        id: string;
        first_name: string;
        last_name: string;
        mob: string;
        status: string;
    }

    // Initialize the form state with a unique ID and empty strings for other fields
    const ContactForm = () => {
        const dispatch = useDispatch();
        const [form, setForm] = useState<FormState>({
            id: nanoid(), // Generate a unique ID
            first_name: '',
            last_name: '',
            mob: '',
            status: ''
        });

        // Handle input changes and update the form state
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setForm({
            ...form,
                [e.target.name]: e.target.value,
            });
        };

        // Dispatch the addContact action with the current form state
        const handleSave = () => {
            dispatch(addContact(form));
        };

        return (
            <div className="w-1/2 mx-auto my-4 pt-16">
                <h2 className="text-2xl font-bold mb-4">Create Contact</h2>
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
                        min="10"
                        max="10"
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

    export default ContactForm;