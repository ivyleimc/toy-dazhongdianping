import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

class BuyButton extends Component {
  render() {
    const { id } = this.props;
    return (
      <Link to={`/purchase/:${id}`} className="buyButton">
        立即购买
      </Link>
    );
  }
}

export default BuyButton;