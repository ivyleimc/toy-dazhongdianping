import React, { Component } from "react";
import "./style.css";
import Tip from '../../../components/Tip';

class PurchaseForm extends Component {
  render() {
    const {
      quantity,
      onIncreaseQuantity,
      onDecreaseQuantity,
      currentPrice,
      showTip,
      userName
    } = this.props;
    const sumPrice = (currentPrice * quantity).toFixed(2);
    return (
      <div className="purchaseForm">
        <div className="purchaseForm__wrapper">
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">数量</div>
            <div className="purchaseForm__rowValue">
              <span
                className="purchaseForm__counter--dec"
                onClick={onDecreaseQuantity}
              >
                -
              </span>
              <input
                type='number'
                className="purchaseForm__quantity"
                onChange={this.handleChange}
                value={quantity}
              />
              <span
                className="purchaseForm__counter--inc"
                onClick={onIncreaseQuantity}
              >
                +
              </span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">小计</div>
            <div className="purchaseForm__rowValue">
              <span className="purchaseForm__totalPrice">¥{sumPrice}</span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">手机号码</div>
            <div className="purchaseForm__rowValue">{userName}</div>
          </div>
        </div>
        <ul className="purchaseForm__remark">
          <li className="purchaseForm__remarkItem">
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持随时退</span>
          </li>
          <li>
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持过期退</span>
          </li>
        </ul>
        <i className="purchaseForm__submit" onClick={this.handleClick}>
          提交订单
        </i>
        {showTip ? this.renderTip() : null}
      </div>
    );
  }

  handleDecrease = () => { };

  handleIncrease = () => { };

  handleChange = (e) => {
    this.props.onSetQuantity(e.target.value);
  };

  handleClick = () => {
    this.props.purchaseOrder();
  };

  renderTip = () => {
    return (
      <Tip
        message='购买成功'
        onClose={this.props.hideTip} />
    )
  }
}

export default PurchaseForm;