import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import user from "../images/user.jpg";

const ContactDetails = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Accessing location
  const { contact } = location.state;
  const nav = (path) => {
    return navigate(path);
  };
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
          <div className="description">{contact.phno}</div>
        </div>
      </div>
      <div className="">
        <button className="ui button blue centered" onClick={() => nav("/")}>
          Back to contact
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
