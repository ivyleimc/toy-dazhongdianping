import React, { Component } from 'react';
import './style.css';

class Remark extends Component {
  render() {
    const { purchaseNotes } = this.props;
    return (
      <div className="remark">
        <div className="remark__header">
          购买须知
              <i className="remark__icon" />
        </div>
        <div className="remark__list">
          {
            purchaseNotes.map((e, i) => {
              return (
                <dl key={i} className="remark__item">
                  <dt className="remark__itemTitle">{e.title}</dt>
                  <dd className="remark__itemDesc">{e.content}</dd>
                </dl>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Remark;