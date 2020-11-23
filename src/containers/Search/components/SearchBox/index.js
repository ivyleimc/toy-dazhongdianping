import React, { Component } from 'react';
import './style.css'

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }
    render() {
        var { relatedKeywords, value, onCancel } = this.props;
        return (
            <div className="searchBox">
                <div className="searchBox__container">
                    <input className="searchBox__text" value={value} onChange={this.handleChange} />
                    <span className="searchBox__clear" onClick={this.handleClear}></span>
                    <span className="searchBox__cancel" onClick={onCancel}>取消</span>
                </div>
                {relatedKeywords && relatedKeywords.length > 0 ? this.renderSuggestList(relatedKeywords) : null}
            </div>
        );
    }

    renderSuggestList(relatedKeywords) {
        return (
            <ul className="searchBox__list">
                {
                    relatedKeywords.map(item => {
                        return (
                            <li key={item.id} onClick={() => {this.props.clickKeyword(item.keyword, item.id)}} className="searchBox__item">
                                <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                                <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
                            </li>
                        )
                    })
                }

            </ul>
        )
    }

    handleChange = (e) => {
        if (this.timer != null) {
            clearTimeout(this.timer);
        }
        var v = e.target.value;
        this.timer = setTimeout(() => {
            this.props.setInputText(v);
            this.props.loadRelatedKeywords(v);
        }, 100);
    }

    handleClear = () => {
        this.props.clearInputText();
    }

    handleCancel = () => {
        this.props.history.goBack();
    }
}

export default SearchBox;