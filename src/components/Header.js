import React, { Component } from "react";

class Header extends Component {
  state = {
    search: ""
  };

  // SetState based on user search field input value and call search function
  // This gives the user imediete response for their search results
  handleOnChange = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    this.props.onNewSearch(this.state.search);
  };

  render() {
    return (
      <div className="header">
        <h1>
          aM
          <span className="coloredLetter">A</span>
          ZEing
        </h1>
        <h3>Find your next show</h3>
        <input
          className="search"
          type="text"
          name="search"
          placeholder="Search TV-Show"
          onChange={this.handleOnChange}
          value={this.state.search}
        />
      </div>
    );
  }
}

export default Header;
