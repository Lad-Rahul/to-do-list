import React, { PureComponent } from "react";
import {connect} from 'react-redux';
import * as actionCreaters from './store/actionCreaters';

import "./App.css";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Task from "./components/Task/Task";
import Modal from "./components/Modal/Modal";
import Editbox from "./components/Editbox/Editbox";
import Button from "./components/Button/Button";

let global_id = 0;

class App extends PureComponent {
  // state = {
  //   todoList: [],
  //   isEdit: false,
  //   allcompleted: false,
  //   anyChecked: false,
  // };


  // onAddTodo = (newtask) => {
  //   let newList = [...this.state.todoList];
  //   global_id += 1;
  //   let obj = {
  //     id: global_id,
  //     task: newtask.trim(),
  //     isCompleted: false,
  //     isChecked: false,
  //   };
  //   newList.push(obj);
  //   this.setState({ todoList: newList, task: "", allcompleted: false });
  // };

  // onChangeStatusOfTask = (id) => {
  //   let newList = [];
  //   let valueComplete = true;
  //   newList = this.state.todoList.map((data) => {
  //     if (data.id !== id) {
  //       valueComplete = valueComplete && data.isCompleted;
  //       return data;
  //     } else {
  //       valueComplete = valueComplete && !data.isCompleted;
  //       return {
  //         ...data,
  //         task: data.task,
  //         isCompleted: !data.isCompleted,
  //       };
  //     }
  //   });

  //   this.setState({ todoList: newList, allcompleted: valueComplete });
  // };

  // onChangeStatusOfAll = () => {
  //   let value = !this.state.allcompleted;

  //   let newList = this.state.todoList.map((data) => {
  //     return {
  //       ...data,
  //       isCompleted: value,
  //     };
  //   });

  //   this.setState({ todoList: newList, allcompleted: value });
  // };

  // onClearAll = () => {
  //   let newList = [];
  //   this.setState({ todoList: newList });
  // };

  // onDeleteTask = (id) => {
  //   let valueComplete = true;
  //   let valueChecked = false;
  //   let new_list = this.state.todoList.filter((data) => {
  //     if (data.id !== id) {
  //       valueComplete = valueComplete && data.isCompleted;
  //       valueChecked = valueChecked || data.isChecked;
  //       return true;
  //     }
  //     return false;
  //   });

  //   this.setState({
  //     todoList: new_list,
  //     allcompleted: valueComplete,
  //     anyChecked: valueChecked,
  //   });
  // };

  // onSingleEditClicked = (id) => {
  //   let newList = this.state.todoList.map((data) => {
  //     if (data.id === id) {
  //       return {
  //         ...data,
  //         isChecked: true,
  //       };
  //     } else {
  //       return {
  //         ...data,
  //         isChecked: false,
  //       };
  //     }
  //   });

  //   this.setState({ todoList: newList, isEdit: true, anyChecked: true });
  // };

  // onSubmitEdit = (editedTodoList) => {
  //   let newList = this.state.todoList.map((data) => {
  //     let obj = editedTodoList.find((x) => x.id === data.id);
  //     if (obj === undefined) {
  //       return data;
  //     } else {
  //       return {
  //         ...obj,
  //         task:obj.task.trim(),
  //         isChecked: false,
  //       };
  //     }
  //   });

  //   this.setState({ todoList: newList, isEdit: false, anyChecked: false });
  // };

  // onCancelEdit = () => {
  //   this.setState({ isEdit: false });
  // };

  // onChangeCheckbox = (id, value) => {
  //   let valueChecked = false;
  //   let newList = this.state.todoList.map((data) => {
  //     if (data.id !== id) {
  //       valueChecked = valueChecked || data.isChecked;
  //       return data;
  //     } else {
  //       valueChecked = valueChecked || value;
  //       return {
  //         ...data,
  //         isChecked: value,
  //       };
  //     }
  //   });

  //   this.setState({ todoList: newList, anyChecked: valueChecked });
  // };

  // onClickMultipleEdit = () => {
  //   this.setState({ isEdit: true });
  // };

  getTaskList = (todoList) => {

    const {onChangeStatusOfTask} = this.props;

    return (
      <ul className="TaskList">
        {todoList.map((taskobj) => {
          return (
            <Task
              key={taskobj.id}
              todo={taskobj}
              change={this.onChangeCheckbox}
              status={onChangeStatusOfTask}
              remove={this.onDeleteTask}
              edit={this.onSingleEditClicked}
            />
          );
        })}
      </ul>
    );
  };

  getButtons = (allcompleted, anyChecked) => {
    return (
      <div className="Btns">
        <Button value="Clear All" clicked={this.onClearAll} />
        <Button
          value={
            allcompleted ? "Mark All as Incomplete" : "Mark All as completed"
          }
          clicked={this.onChangeStatusOfAll}
        />
        <Button
          value="Edit Selected"
          clicked={this.onClickMultipleEdit}
          disable={!anyChecked}
        />
      </div>
    );
  };

  onClickAdd = (task) => {
    global_id += 1;
    const id = global_id;
    this.props.onAddTodo(id,task);
  }

  getForm = () => {
    return <Form submitAdd={this.onClickAdd} hint="Task..." />;
  };

  getModal = (isEdit, todoList) => {
    return (
      <Modal show={isEdit} close={this.onCancelEdit}>
        <Editbox
          editList={todoList.filter((obj) => {
            return obj.isChecked === true;
          })}
          submitEdit={this.onSubmitEdit}
          cancelEdit={this.onCancelEdit}
        />
      </Modal>
    );
  };

  render() {
    const { todoList, isEdit, allcompleted, anyChecked } = this.props;

    return (
      <div className="App">
        <Header title="To Do List" />
        {this.getButtons(allcompleted, anyChecked)}
        {this.getForm()}
        {this.getTaskList(todoList)}
        {this.getModal(isEdit, todoList)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList : state.todoList,
    isEdit : state.isEdit,
    allcompleted: state.allcompleted,
    anyChecked: state.anyChecked
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onFetchTodos : () => dispatch(actionCreaters.fetchTodos()),
    onAddTodo : (id,task) => dispatch(actionCreaters.addTodo(id,task)),
    onChangeStatusOfTask : (id) => dispatch(actionCreaters.changeStatus(id)),
    // onDeleteTask : (id) => dispatch(actionCreaters.deleteTodo(id)),
    // onEnableEdit : (id) => dispatch(actionCreaters.enableEdit(id)),
    // onOkEdit : (id,updatedTask) => dispatch(actionCreaters.okEdit(id,updatedTask)),
    // onCancelEdit : (id) => dispatch(actionCreaters.cancelEdit(id)),
    // onDeleteAll : () => dispatch(actionCreaters.deleteAll()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
