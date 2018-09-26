import React, { Component } from "react";

class SingleShow extends Component {
  state = {
    expanded: false
  };

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const info = this.props.singleShow;
    if (!this.state.expanded) {
      return (
        <button className="btn btn-info" onClick={this.toggle}>
          Summary
        </button>
      );
    }
    return (
      <div>
        <button className="btn btn-danger" onClick={this.toggle}>
          Summary
        </button>
        <p
          className="summary"
          dangerouslySetInnerHTML={{ __html: info.summary }}
        />
      </div>
    );
  }
}

export default SingleShow;
