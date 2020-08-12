import React, { PureComponent } from "react";
import "./Header.css";

class Header extends PureComponent {
  getHeader(title) {
    
    return (
      <div className="Header">
        <h2>{title}</h2>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return this.getHeader(title);
  }
}

export default Header;
