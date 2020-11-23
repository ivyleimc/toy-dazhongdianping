import React, { Component } from "react";
import "./style.css"

class OrderItem extends Component {
  render() {
    const {
      data: {
        id,
        title,
        statusText,
        orderPicUrl,
        channel,
        text,
        type,
        commentId
      },
      showDeleteDialog,
      commentingId,
      showCommentDialog
    } = this.props;
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img alt="" className="orderItem__img" src={orderPicUrl} />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {type === 2 && !commentId ? <div className="orderItem__btn" onClick={() => { showCommentDialog(id) }}>评价</div> : null}
            <div className="orderItem__btn" onClick={() => { showDeleteDialog(id) }}>删除</div>
          </div>
        </div>
        {commentingId === id ? this.renderEditArea(id) : null}
      </div>
    );
  }

  renderEditArea(id) {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={this.props.comment}
        />
        {this.renderStars()}
        <button className="orderItem__commentBtn" onClick={() => { this.props.commentOrder(id) }}>
          提交
        </button>
        <button className="orderItem__commentBtn" onClick={() => { this.props.hideCommentDialog(id) }}>
          取消
        </button>
      </div>
    );
  }

  renderStars() {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = this.props.start >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={() => {
                this.handleStartChange(item)
              }}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  handleCommentChange = (e) => {
    this.props.setComment(e.target.value);
  }

  handleStartChange = (item) => {
    this.props.setStart(item)
  }
}

export default OrderItem;
