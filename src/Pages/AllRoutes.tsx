import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Contacts';
import Dashboard from './Charts_and_Maps';
import EditContact from '../components/Edit_Contact';
import ContactForm from '../components/ContactForm'

/**
 * This functional component defines all the application routes.
 */
const AllRoutes: React.FC = () => {
    /**
     * The Routes component from react-router-dom is used to define multiple routes.
     */
    return (
        <Routes>
            /**
             * The default route "/" renders the Contacts component.
             */
            <Route path="/" element={<Contacts />} />
            /**
             * The "/contact_form" route renders the ContactForm component.
             */
            <Route path="/contact_form" element={<ContactForm />} />
            /**
             * The "/dashboard" route renders the Dashboard component.
             */
            <Route path="/dashboard" element={<Dashboard />} />
            /**
             * The "/edit/:id" route renders the EditContact component, 
             * where ":id" is a parameter to be passed to the component.
             */
            <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
    );
};

export default AllRoutes;