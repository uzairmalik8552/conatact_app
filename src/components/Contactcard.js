import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email, phno } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
          <div>{email}</div>
          <div>{phno}</div>
        </Link>
      </div>
      <Link to={`/delete`} state={{ contact: props.contact }}>
        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginTop: "7px" }}
        ></i>
      </Link>
      <Link to={`/edit`} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px", marginLeft: "10px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
