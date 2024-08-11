import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import api from "../api/contact";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetail";
import DeleteConf from "./DeleteConf";
import EditContact from "./EditContact ";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";

  // This is to store the contact when we get the input from the user
  const [contacts, setContacts] = useState([]);
  const [searchTearm, setSearchTearm] = useState("");
  const [saerchResult, setsearchResult] = useState([]);

  //retrive contact
  const rettrivecontact = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  // this is to handel the input and store it in a contacts list
  const addContactHandler = async (contact) => {
    // in this we have first add the previous data and then adding the new contact
    // we have given the uuid function hear
    const request = { id: uuidv4(), ...contact };
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  //update contact handler
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // in this we will creat anew contact list which do not contain the specific id
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  //search
  const searchHandler = (searchTearm) => {
    setSearchTearm(searchTearm);
    if (searchTearm != "") {
      const newContact = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTearm.toLowerCase());
      });
      setsearchResult(newContact);
    } else {
      setsearchResult(contacts);
    }
  };

  // now we will use the usewffect to retrive the contact from logal storage when the page is refreshed
  // Retrieve contacts from localStorage when the component mounts
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    // console.log(retriveContacts);
    const getAllContacts = async () => {
      const allContact = await rettrivecontact();
      if (allContact) setContacts(allContact);
    };
    getAllContacts();
  }, []);

  // we will store the input in the local storage so we are going to use useeffect amd we willgive it in arrow function
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
                contacts={searchTearm.length < 1 ? contacts : saerchResult}
                getContactId={removeContactHandler}
                term={searchTearm}
                searchKeyword={searchHandler}
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
          <Route
            path="/edit"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
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
