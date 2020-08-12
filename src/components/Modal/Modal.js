import React, { PureComponent, Fragment } from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends PureComponent {
  getBackgrop(close) {
    return <Backdrop clicked={close} />;
  }

  getChildren(children, show) {
    let modalClasses = "Modal ModalHide";
    if (show) {
      modalClasses = "Modal ModalShow";
    }

    return <div className={modalClasses}>{children}</div>;
  }

  render() {
    const { show, close, children } = this.props;

    return show ? (
      <Fragment>
        {this.getBackgrop(close)}
        {this.getChildren(children, show)}
      </Fragment>
    ) : null;
  }
}

export default Modal;
