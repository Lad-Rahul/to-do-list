import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as actionCreaters from "./store/actionCreaters";

import "./App.css";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Task from "./components/Task/Task";
import Modal from "./components/Modal/Modal";
import Editbox from "./components/Editbox/Editbox";
import Button from "./components/Button/Button";

class App extends PureComponent {
  constructor(props) {
    super(props);
    
    const { onFetchTodos } = this.props;
    onFetchTodos();
  }

  getForm = () => {
    const { onAddTodo } = this.props;
    return <Form submitAdd={onAddTodo} hint="Task..." />;
  };

  getTaskList = (todoList) => {
    const {
      onChangeCheckbox,
      onChangeStatusOfTask,
      onClickSingleEdit,
      onDeleteTask,
    } = this.props;

    return (
      <ul className="TaskList">
        {todoList.map((taskobj) => {
          return (
            <Task
              key={taskobj.id}
              todo={taskobj}
              change={onChangeCheckbox}
              status={onChangeStatusOfTask}
              edit={onClickSingleEdit}
              remove={onDeleteTask}
            />
          );
        })}
      </ul>
    );
  };

  onClickChangeStatusOfAll = () => {
    const { allCompleted, onChangeStatusOfAll } = this.props;
    return onChangeStatusOfAll(allCompleted);
  };

  getButtons = (allCompleted, anyChecked) => {
    const { onDeleteAll, onClickMultipleEdit } = this.props;

    return (
      <div className="Btns">
        <Button value="Clear All" clicked={onDeleteAll} />
        <Button
          value={
            allCompleted ? "Mark All as Incomplete" : "Mark All as completed"
          }
          clicked={this.onClickChangeStatusOfAll}
        />
        <Button
          value="Edit Selected"
          clicked={onClickMultipleEdit}
          disable={!anyChecked}
        />
      </div>
    );
  };

  getModal = (isEdit, todoList) => {
    const { onSubmitEdit, onCancelEdit } = this.props;

    return (
      <Modal show={isEdit} close={this.onCancelEdit}>
        <Editbox
          editList={todoList.filter((obj) => {
            return obj.isChecked === true;
          })}
          submitEdit={onSubmitEdit}
          cancelEdit={onCancelEdit}
        />
      </Modal>
    );
  };

  render() {
    const { todoList, isEdit, allCompleted, anyChecked } = this.props;

    return (
      <div className="App">
        <Header title="To Do List" />
        {this.getButtons(allCompleted, anyChecked)}
        {this.getForm()}
        {this.getTaskList(todoList)}
        {this.getModal(isEdit, todoList)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList,
    isEdit: state.isEdit,
    allCompleted: state.allCompleted,
    anyChecked: state.anyChecked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodos: () => dispatch(actionCreaters.fetchTodos()),
    onAddTodo: (task) => dispatch(actionCreaters.addTodo(task)),
    onChangeCheckbox: (id, isChecked) => dispatch(actionCreaters.changeCheckbox(id, isChecked)),
    onChangeStatusOfTask: (id, isCompleted) => dispatch(actionCreaters.changeStatus(id, isCompleted)),
    onClickSingleEdit: (id) => dispatch(actionCreaters.editSingleTodo(id)),
    onDeleteTask: (id) => dispatch(actionCreaters.deleteTodo(id)),
    onSubmitEdit: (updatedTodoList) => dispatch(actionCreaters.submitEdit(updatedTodoList)),
    onCancelEdit: () => dispatch(actionCreaters.cancelEdit()),
    onDeleteAll: () => dispatch(actionCreaters.deleteAll()),
    onChangeStatusOfAll: (isCompleted) => dispatch(actionCreaters.changeStatusOfAll(isCompleted)),
    onClickMultipleEdit: () => dispatch(actionCreaters.editMultipleTodo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
