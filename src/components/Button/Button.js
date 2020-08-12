import React, { PureComponent } from "react";
import "./Button.css";

class Button extends PureComponent {
  getButton(value, clicked, disable) {
    
    return (
      <button className="Button" onClick={clicked} disabled={disable}>
        {value}
      </button>
    );
  }
  render() {
    const { value, clicked, disable } = this.props;
    return this.getButton(value, clicked, disable);
  }
}

export default Button;
