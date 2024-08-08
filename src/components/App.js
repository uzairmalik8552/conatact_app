import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetail";
import DeleteConf from "./DeleteConf";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  // This is to store the contact when we get the input from the user
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  // this is to handel the input and store it in a contacts list
  const addContactHandler = (contact) => {
    // in this we have first add the previous data and then adding the new contact
    // we have given the uuid function hear
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  // in this we will creat anew contact list which do not contain the specific id
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  // now we will use the usewffect to retrive the contact from logal storage when the page is refreshed
  // Retrieve contacts from localStorage when the component mounts
  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  //   console.log(retriveContacts);
  // }, []);

  // we will store the input in the local storage so we are going to use useeffect amd we willgive it in arrow function
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      {/* we are addind the route so that we can navigate through the page */}

      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route
            path="/delete"
            element={<DeleteConf deleteContactHandler={removeContactHandler} />}
          />

          {/* <AddContact addContactHandler={addContactHandler} />
          <ContactList
            contacts={contacts}
            getContactId={removeContactHandler}
          /> */}
        </Routes>
      </BrowserRouter>
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
    </div>
  );
}

export default App;
