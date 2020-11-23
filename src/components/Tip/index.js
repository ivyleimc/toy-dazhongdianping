import React, { Component } from "react";
import "./style.css"

class Tip extends Component {
  render() {
    const { message, onClose } = this.props;
    return (
      <div className="tip">
        <div className="tip__alert">
          <div className="tip__content">{message}</div>
          <div className="tip__btns">
            <i className="tip__btn" onClick={onClose}>
              确定
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default Tip;