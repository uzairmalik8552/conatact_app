import React, { useRef } from "react";
import { Link } from "react-router-dom";

import ContactCard from "./Contactcard";

const ContactList = (props) => {
  const inputEL = useRef("");
  // we are geting the id from the contactcard
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
      ></ContactCard>
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEL.current.value);
    // console.log(inputEL.current.value);
  };
  return (
    <div className="main">
      <h2>
        Contact list
        {/* This is to add the path where we whant to redatrect the button for that we use LOnk componenent */}
        <Link to="/add">
          <button className="ui button blue right bu">Add contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEL}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          ></input>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No contacts available"}
      </div>
    </div>
  );
};
export default ContactList;
