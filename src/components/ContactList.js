import React from "react";
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
  return <div className="ui celled list">{renderContactList}</div>;
};
export default ContactList;
