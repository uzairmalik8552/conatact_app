import React from "react";
import { Link } from "react-router-dom";

import ContactCard from "./Contactcard";

const ContactList = (props) => {
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
  return (
    <div className="main">
      <h2>
        Contact list
        {/* This is to add the path where we whant to redatrect the button for that we use LOnk componenent */}
        <Link to="/add">
          <button className="ui button blue right bu">Add contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};
export default ContactList;
