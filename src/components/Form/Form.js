import React, { PureComponent } from "react";
import "./Form.css";

class Form extends PureComponent {
  state = {
    task: "",
    isValid: false,
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ task: "", isValid: false });
    this.props.submitAdd(this.state.task);
  };

  onChangeTask = (event) => {
    let valid = false;
    if (event.target.value.trim() !== "") {
      valid = true;
    }
    this.setState({ task: event.target.value, isValid: valid });
  };

  getAddForm = (task, isValid, hint) => {
    return (
      <form className="Form" onSubmit={this.onFormSubmit}>
        <input
          className="InputText InputForm"
          type="text"
          value={task}
          onChange={this.onChangeTask}
          placeholder={hint}
        />
        <input
          className="AddBtn InputForm"
          type="submit"
          value="Add Item"
          disabled={!isValid}
        />
      </form>
    );
  };

  render() {
    const { task, isValid } = this.state;
    const { hint } = this.props;

    return this.getAddForm(task, isValid, hint);
  }
}

export default Form;
