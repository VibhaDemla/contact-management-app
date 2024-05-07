import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import { removeContact } from "../Redux/action";
import { RootState } from "../Redux/store";

const Contacts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [singleContact, setSingleContact] = useState<any>({});
  const AllContacts = useSelector((store: RootState) => store.contacts);
  const dispatch = useDispatch();

  const togglePopup = (contact: any) => {
    setSingleContact(contact);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Add any side effects here
  }, [dispatch, AllContacts.length]);

  return (
    <div className="justify-center pt-16 text-gray-50 p-4 w-full">
      <div className="m-4">
      <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-700  mt-6">
        <Link to="/contact_form">Create Contact</Link>
      </button>

      </div>
      {AllContacts.length === 0 && (
        <div className="m-auto w-fit p-4 align-middle text-black font-bold justify-center">
          <svg
            className="m-auto"
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Path */}
          </svg>
          <h1 className="text-3xl">
            No Contact Found Please add contact using <br /> Create Contact Button
          </h1>
        </div>
      )}
      <div id="contact_list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AllContacts.map((el: any) => (
          <div key={el.id} className="bg-yellow-100 rounded-lg shadow-md m-4 p-4 text-black">
            <div onClick={() => togglePopup(el)} className="w-3/4 m-auto">
              <img className="w-full rounded-full" src="data:image/png;base64,..." alt="" />
              <div className="p-4">
                {isOpen && <Popup close={() => togglePopup(el)} el={singleContact} />}
              </div>
              <div className="text-left">
                <p>First Name : {el.first_name}</p>
                <p>Last Name : {el.last_name}</p>
                {/* <p>Mobile : {el.mob}</p> */}
                <p>Status : {el.status === "active" ? "Active" : "Inactive"}</p>
              </div>
            </div>
            <div className="flex justify-between my-2">
            <Link to={`edit/${el.id}`} state={{ contact: el.id }}>
            <button className="rounded p-2 bg-blue-300 text-black">Edit</button>
          </Link>

              <button onClick={() => dispatch(removeContact(el.id))} className="rounded p-2 bg-red-600 text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
