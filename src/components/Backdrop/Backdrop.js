import React, { PureComponent } from "react";
import "./Backdrop.css";

class Backdrop extends PureComponent {
  getBackdrop(clicked) {
    return <div className="Backdrop" onClick={clicked} />;
  }
  render() {
    const { clicked } = this.props;

    return this.getBackdrop(clicked);
  }
}

export default Backdrop;
