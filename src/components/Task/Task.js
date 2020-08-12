import React, { PureComponent } from "react";
import "./Task.css";
import doneImg from "../../assets/images/done_img.png";
import undoneImg from "../../assets/images/undone_img.png";
import editImg from "../../assets/images/edit_img.png";
import removeImg from "../../assets/images/remove_img.png";

class Task extends PureComponent {
  onCheckboxChange = (event) => {
    const {
      change,
      todo: { id },
    } = this.props;
    return change(id, event.target.checked);
  };

  onClickStatusChange = () => {
    const {
      status,
      todo: { id, isCompleted },
    } = this.props;
    return status(id, isCompleted);
  };

  onClickEdit = () => {
    const {
      edit,
      todo: { id },
    } = this.props;
    return edit(id);
  };

  onClickRemove = () => {
    const {
      remove,
      todo: { id },
    } = this.props;
    return remove(id);
  };

  getListItem = (task, isChecked, isCompleted) => {
    let taskClass = "Task";
    let statusImg = doneImg;
    let statusAlt = "Done";

    if (isCompleted) {
      taskClass = "Task Finished";
      statusImg = undoneImg;
      statusAlt = "Undone";
    }

    return (
      <li className="LiItem">
        <span className={taskClass}>
          <input
            type="checkbox"
            className="Checkbox"
            onChange={this.onCheckboxChange}
            checked={isChecked}
          />
          {task}
        </span>

        <span className="LiBtnGroup">
          <span className="LiBtn" onClick={this.onClickStatusChange}>
            <img src={statusImg} alt={statusAlt} className="Img" />
          </span>
          <span className="LiBtn" onClick={this.onClickEdit}>
            <img src={editImg} alt="Edit" className="Img" />
          </span>
          <span className="LiBtn" onClick={this.onClickRemove}>
            <img src={removeImg} alt="Remove" className="Img" />
          </span>
        </span>
      </li>
    );
  };

  render() {
    const {
      todo: { task, isChecked, isCompleted },
    } = this.props;

    return this.getListItem(task, isChecked, isCompleted);
  }
}

export default Task;
