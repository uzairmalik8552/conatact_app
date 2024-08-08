import React from "react";
import { withRouter } from "./withRouter";

class AddContact extends React.Component {
  // This the state
  state = {
    name: "",
    email: "",
    phno: "",
  };

  // //programaticaly navigate in class
  // navigateTo = (path) => {
  //   const navigate = useNavigate();
  //   navigate(path);
  // };

  add = (e) => {
    // we dont want our page to refresh so we are using preventdefault
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.phno === ""
    ) {
      alert("All fields are mandatory");
      return;
    }

    //  in this we have passed the state valuesfrom child to parent
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "", phno: "" });
    this.props.router.navigate("/");
    // this.handleClick("/");
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phonenumber"
              placeholder="Phone number"
              value={this.state.phno}
              onChange={(e) => this.setState({ phno: e.target.value })}
            ></input>
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddContact);
