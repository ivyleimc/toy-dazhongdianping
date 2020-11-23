import React, { Component } from 'react';
import "./style.css"

class SearchHistory extends Component {
    render() {
        const {data, clickKeyword} = this.props;
        return (
            <div className="searchHistory">
                <div className="searchHistory__header">搜索记录</div>
                <ul className="searchHistory__list">
                    {
                        data.map((item, index) => {
                            return <li key={index} onClick={() => {clickKeyword(item.keyword, item.id)}} className="searchHistory__item">
                                {item.keyword}
                            </li>
                        })
                    }
                </ul>
                <div className="searchHistory__clear" onClick={this.handleClear}>清除搜索记录</div>
            </div>
        );
    }

    handleClear = () => {      
        this.props.clearHistory();
    }

}

export default SearchHistory;