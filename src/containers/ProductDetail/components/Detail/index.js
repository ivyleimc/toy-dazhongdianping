import React, { Component } from 'react';
import './style.css';

class Detail extends Component {
  render() {
    const { category, products, remark } = this.props;
    return (
      <div className="detail">
        <div className="detail__header">
          <span>团购详情</span>
          <i className="detail__headerIcon"></i>
        </div>
        <table cellPadding="0" cellSpacing="0" className="detail__table">
          <tbody>
            <tr className="detail__row">
              <th colSpan="3" className="detail__category">
                {category}
              </th>
            </tr>
            {
              products.map((e, i) => {
                return (
                  <tr key={i} className="detail__row">
                    <td>{e.name}</td>
                    <td className="detail__td--alignRight">
                      {e.quantity}
                    </td>
                    <td className="detail__td--alignRight">
                      {e.price}
                    </td>
                  </tr>
                )
              })
            }

            <tr className="detail__row">
              <td />
              <td className="detail__td--price">
                最高价值
                    <br />
                <strong className="detail__td--priceNew">
                  团购价
                    </strong>
              </td>
              <td className="detail__td--price">
                48元
                    <br />
                <strong className="detail__td--priceNew">
                  19.9元
                    </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail__remark">
          {remark}
        </div>
        <div className="detail__more">
          <span>更多图文详情</span>
          <span className="detail__notice">(建议Wifi环境下打卡，土豪请随意)</span>
          <i className="detail__arrow" />
        </div>
      </div>
    );
  }
}

export default Detail;