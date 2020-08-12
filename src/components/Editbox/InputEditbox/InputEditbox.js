import React, { PureComponent } from "react";
import "./InputEditbox.css";

class InputEditbox extends PureComponent {
  onChangeHandler = (event) => {
    const { id, change } = this.props;
    return change(event, id);
  };

  getInputbox = (value) => {
    
    return (
      <input
        className="InputEditbox"
        type="text"
        value={value}
        onChange={this.onChangeHandler}
      />
    );
  };

  render() {
    const { value } = this.props;
    return this.getInputbox(value);
  }
}

export default InputEditbox;
