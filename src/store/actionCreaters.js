import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchTodosNext = (data) => {
  return {
    type: actionTypes.FETCH_TODOS,
    payload: data,
  };
};

export const fetchTodos = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/todos")
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(fetchTodosNext(responce.data));
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTodoNext = (data) => {
  return {
    type: actionTypes.ADD_TODO,
    id: data._id,
    task: data.task,
  };
};

export const addTodo = (task1) => {
  const todo = {
    task: task1,
    completed: false,
  };
  return (dispatch) => {
    axios
      .post("http://localhost:8080/todo", todo)
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(addTodoNext(responce.data));
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeCheckbox = (id1, value1) => {
  return {
    type: actionTypes.CHANGE_CHECKBOX,
    id: id1,
    value: value1,
  };
};

export const changeStatusNext = (data) => {
  return {
    type: actionTypes.CHANGE_STATUS,
    id: data._id,
  };
};

export const changeStatus = (id1, isCompleted) => {
  const todo = {
    id: id1,
    status: !isCompleted,
  };
  return (dispatch) => {
    axios
      .put("http://localhost:8080/todo_status", todo)
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(changeStatusNext(responce.data));
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editSingleTodo = (id1) => {
  return {
    type: actionTypes.EDIT_SINGLE_TODO,
    id: id1,
  };
};

export const submitEditNext = (updatedTodoList) => {
  return {
    type: actionTypes.SUBMIT_EDIT,
    updatedList: updatedTodoList,
  };
};

export const submitEdit = (updatedTodoList) => {
  let updatedList = updatedTodoList.map((data) => {
    return {
      id: data.id,
      task: data.task,
    };
  });
  return (dispatch) => {
    axios
      .put("http://localhost:8080/todo_update", updatedList)
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(submitEditNext(updatedTodoList));
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const cancelEdit = () => {
  return {
    type: actionTypes.CANCEL_EDIT,
  };
};

export const deleteTodoNext = (data) => {
  return {
    type: actionTypes.DELETE_TODO,
    id: data._id,
  };
};

export const deleteTodo = (id1) => {
  return (dispatch) => {
    const url = "http://localhost:8080/todo/" + id1;
    axios
      .delete(url)
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(deleteTodoNext(responce.data));
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteAllNext = () => {
  return {
    type: actionTypes.DELETE_ALL,
  };
};

export const deleteAll = () => {
  return (dispatch) => {
    axios
      .delete("http://localhost:8080/todo_delete_all")
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(deleteAllNext());
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeStatusOfAllNext = () => {
  return {
    type: actionTypes.CHANGE_STATUS_OF_ALL,
  };
};

export const changeStatusOfAll = (isAllCompleted) => {
  let url = "http://localhost:8080/todo_completed_all";
  if (isAllCompleted === true) {
    url = "http://localhost:8080/todo_incomplete_all";
  }
  return (dispatch) => {
    axios
      .put(url)
      .then((responce) => {
        if (responce.status === 200) {
          dispatch(changeStatusOfAllNext());
        } else {
          console.log(responce);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editMultipleTodo = () => {
  return {
    type: actionTypes.EDIT_MULTIPLE_TODO,
  };
};
