import React, { Component } from "react";
import OrderItem from "../../components/OrderItem"
import "./style.css"
import { connect } from 'react-redux';
import { selectors, actions } from '../../../../redux/modules/user'
import Confirm from '../../../../components/Confirm'

const tabTitles = ["全部订单", "待付款", "已消费", "退款/售后"];

class UserMain extends Component {
  render() {
    const { currentTab, orders: data } = this.props;
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div key={index} className="userMain__tab" onClick={() => { this.handleClickTab(index) }}>
                <span
                  className={
                    currentTab === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {data && data.length > 0
            ? this.renderOrderList(data)
            : this.renderEmpty()}
        </div>
        
        {this.props.deleteId ? 
        this.renderConfirmDialog() :  null}
      </div>
    );
  }

  renderOrderList = data => {
    return data.map(item => {
      return (
        <OrderItem
          key={item.id}
          data={item}
          commentingId={this.props.commentingId}
          hideDeleteDialog={this.props.hideDeleteDialog}
          showDeleteDialog={this.props.showDeleteDialog}
          hideCommentDialog={this.props.hideCommentDialog}
          showCommentDialog={this.props.showCommentDialog}
          deleteOrder={this.props.deleteOrder}
          commentOrder={this.props.commentOrder}
          comment={this.props.comment}
          start={this.props.start}
          setComment={this.props.setComment}
          setStart={this.props.setStart} />
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    )
  }

  renderConfirmDialog = () => {
    const {deleteOrder, hideDeleteDialog } = this.props;
    return (
      <Confirm 
      content='确定要删除这个订单吗？'
      cancelText='取消'
      confirmText='确定'
      onCancel={()=>{hideDeleteDialog(this.props.deleteId)}}
      onConfirm={()=>{deleteOrder(this.props.deleteId)}}
      />
    )
  }

  handleClickTab = (index) => {
    this.props.setTab(index);
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentTab: selectors.currentTab(state),
    deleteId: selectors.deleteId(state),
    commentingId: selectors.commentingId(state),
    comment: selectors.getComment(state),
    start: selectors.getStart(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setTab: (index) => {
      dispatch(actions.setTab(index))
    },
    showDeleteDialog: (id) => {
      dispatch(actions.showDeleteDialog(id))
    },
    hideDeleteDialog: (id) => {
      dispatch(actions.hideDeleteDialog(id))
    },
    showCommentDialog: (id) => {
      dispatch(actions.showCommentDialog(id))
    },
    hideCommentDialog: (id) => {
      dispatch(actions.hideCommentDialog(id))
    },
    deleteOrder: (id) => {
      dispatch(actions.deleteOrder(id))
    },
    commentOrder: (id) => {
      dispatch(actions.commentOrder(id))
    },
    setComment: (v) => {
      dispatch(actions.setComment(v))
    },
    setStart: (v) => {
      dispatch(actions.setStart(v))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);