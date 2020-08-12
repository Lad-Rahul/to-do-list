import React, { PureComponent } from "react";
import InputEditbox from "./InputEditbox/InputEditbox";
import "./Editbox.css";

class Editbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editedTodos: props.editList,
      isValid: true,
    };
  }

  onChangeHandler = (event, id) => {
    let valid = true;
    let updatedTodo = this.state.editedTodos.map((data) => {
      if (data.id === id) {
        if (event.target.value.trim() === "") {
          valid = false;
        }
        return {
          ...data,
          task: event.target.value,
        };
      } else {
        if (data.task.trim() === "") {
          valid = false;
        }
        return {
          ...data,
        };
      }
    });
    this.setState({ editedTodos: updatedTodo, isValid: valid });
  };

  onSubmitEdit = () => {
    const { editedTodos } = this.state;
    const { submitEdit } = this.props;

    return submitEdit(editedTodos);
  };

  getEditTaskList = () => {
    const { editedTodos } = this.state;

    return editedTodos.map((data) => {
      return (
        <InputEditbox
          key={data.id}
          value={data.task}
          id={data.id}
          change={this.onChangeHandler}
        />
      );
    });
  };

  getButtons = () => {
    const { cancelEdit } = this.props;
    const { isValid } = this.state;
    return (
      <div>
        <input
          className="ButtonEditbox SubmitBtn"
          type="button"
          value="Submit"
          onClick={this.onSubmitEdit}
          disabled={!isValid}
        />
        <input
          className="ButtonEditbox CancelBtn"
          type="button"
          value="cancel"
          onClick={cancelEdit}
        />
      </div>
    );
  };

  getEditbox = () => {
    return (
      <div className="Editbox">
        {this.getEditTaskList()}
        {this.getButtons()}
      </div>
    );
  };

  render() {
    return this.getEditbox();
  }
}

export default Editbox;
