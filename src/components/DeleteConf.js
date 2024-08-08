import React from "react";
import { useLocation, Link } from "react-router-dom";

const DeleteConf = (props) => {
  const location = useLocation(); // Accessing location
  const { contact } = location.state;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="content">
          <div className="header">
            Are you sure you want to delete {contact.name} contact
          </div>
        </div>
        <div className="ui centered">
          <Link to={`/`}>
            <button
              className="ui button blue centered"
              onClick={() => props.deleteContactHandler(contact.id)}
            >
              okay
            </button>
            <button className="ui button blue right">No</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteConf;
