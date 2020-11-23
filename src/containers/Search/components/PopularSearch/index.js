import React, { Component } from 'react';
import "./style.css"

class PopularSearch extends Component {
    render() {
        const { popluarKeywords, clickKeyword } = this.props;
        return (
            <div className="popularSearch">
                {
                    popluarKeywords.map((item, index) => {
                        return (
                            <span 
                                key={index} 
                                onClick={() => {clickKeyword(item.keyword, item.id)}} 
                                className="popularSearch__item">
                                    {item.keyword}
                            </span>
                        )
                    })
                }
            </div>
        );
    }
}

export default PopularSearch;