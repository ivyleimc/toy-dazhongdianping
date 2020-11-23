import React, { Component } from 'react';
import './style.css';

class ShopInfo extends Component {
    render() {
        const {total, shop} = this.props;
        return (
          <div className="shopInfo">
            <div className="shopInfo__header">
        使用商户（{total}）
              <span className="shopInfo__arrow"></span>
            </div>
            <div className="shopInfo__middle">
              <div className="shopInfo__middleLeft">
                <div className="shopInfo__shopName">
                {shop}
                </div>
                <div className="shopInfo__starsWrapper">
                  <span className="shopInfo__stars">
                  <i className="shopInfo__stars--red" style={{"width": "100%"}}></i>
                  </span>
                  <span className="shopInfo__distance">100km</span>
                </div>
              </div>
              <div className="shopInfo__middleRight">
                <i className="shopInfo__phoneIcon"></i>
              </div>
            </div>
            <div className="shopInfo__bottom">
              <i className="shopInfo__locationIcon"></i>北京朝阳区
            </div>
          </div>
        );
    }
}

export default ShopInfo;