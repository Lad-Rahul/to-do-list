import * as actionTypes from "./actionTypes";

const initialState = {
  todoList: [],
  isEdit: false,
  allCompleted: false,
  anyChecked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODOS: {
      let isAllCompleted = true;
      const fetchedList = action.payload.map((data) => {
        isAllCompleted = isAllCompleted && data.completed;
        return {
          id: data._id,
          task: data.task,
          isCompleted: data.completed,
          isChecked: false,
        };
      });
      return {
        ...state,
        todoList: fetchedList,
        allCompleted: isAllCompleted,
      };
    }

    case actionTypes.ADD_TODO: {
      return {
        ...state,
        todoList: state.todoList.concat({
          id: action.id,
          task: action.task.trim(),
          isCompleted: false,
          isChecked: false,
        }),
        allCompleted: false,
      };
    }

    case actionTypes.CHANGE_CHECKBOX: {
      let valueChecked = false;

      let newList = state.todoList.map((data) => {
        if (data.id !== action.id) {
          valueChecked = valueChecked || data.isChecked;
          return data;
        } else {
          valueChecked = valueChecked || action.value;
          return {
            ...data,
            isChecked: action.value,
          };
        }
      });

      return {
        ...state,
        todoList: newList,
        anyChecked: valueChecked,
      };
    }

    case actionTypes.CHANGE_STATUS: {
      let valueComplete = true;

      const newList = state.todoList.map((data) => {
        if (data.id !== action.id) {
          valueComplete = valueComplete && data.isCompleted;
          return data;
        } else {
          valueComplete = valueComplete && !data.isCompleted;
          return {
            ...data,
            task: data.task,
            isCompleted: !data.isCompleted,
          };
        }
      });

      return {
        ...state,
        todoList: newList,
        allCompleted: valueComplete,
      };
    }

    case actionTypes.EDIT_SINGLE_TODO: {
      let newList = state.todoList.map((data) => {
        if (data.id === action.id) {
          return {
            ...data,
            isChecked: true,
          };
        } else {
          return {
            ...data,
            isChecked: false,
          };
        }
      });

      return {
        ...state,
        todoList: newList,
        isEdit: true,
        anyChecked: true,
      };
    }

    case actionTypes.SUBMIT_EDIT: {
      let newList = state.todoList.map((data) => {
        let obj = action.updatedList.find((x) => x.id === data.id);
        if (obj === undefined) {
          return data;
        } else {
          return {
            ...obj,
            task: obj.task.trim(),
            isChecked: false,
          };
        }
      });

      return {
        ...state,
        todoList: newList,
        isEdit: false,
        anyChecked: false,
      };
    }

    case actionTypes.CANCEL_EDIT: {
      return {
        ...state,
        isEdit: false,
      };
    }

    case actionTypes.DELETE_TODO: {
      let valueComplete = true;
      let valueChecked = false;

      let new_list = state.todoList.filter((data) => {
        if (data.id !== action.id) {
          valueComplete = valueComplete && data.isCompleted;
          valueChecked = valueChecked || data.isChecked;
          return true;
        }
        return false;
      });

      return {
        ...state,
        todoList: new_list,
        allCompleted: valueComplete,
        anyChecked: valueChecked,
      };
    }

    case actionTypes.CHANGE_STATUS_OF_ALL: {
      let value = !state.allCompleted;

      const newList = state.todoList.map((data) => {
        return {
          ...data,
          isCompleted: value,
        };
      });

      return {
        ...state,
        todoList: newList,
        allCompleted: value,
      };
    }

    case actionTypes.DELETE_ALL: {
      const newList = [];
      return {
        ...state,
        todoList: newList,
        allCompleted: false,
        anyChecked: false,
      };
    }

    case actionTypes.EDIT_MULTIPLE_TODO: {
      return {
        ...state,
        isEdit: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
