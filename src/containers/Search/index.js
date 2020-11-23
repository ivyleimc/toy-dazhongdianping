import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import PopularSearch from './components/PopularSearch';
import SearchHistory from './components/SearchHistory';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector, actions } from '../../redux/modules/search';

class Search extends Component {
    render() {
        const { inputText, historyList, popluarKeywords, relatedKeywords, actions} = this.props;
        return (
            <div>
                <SearchBox 
                    onCancel={this.onCancel} 
                    clickKeyword={this.clickKeyword} 
                    loadRelatedKeywords={actions.loadRelatedKeywords} 
                    clearInputText={actions.clearInputText} 
                    setInputText={actions.setInputText} 
                    value={inputText} 
                    relatedKeywords={relatedKeywords} 
                />
                <PopularSearch 
                    clickKeyword={this.clickKeyword} 
                    popluarKeywords={popluarKeywords} 
                />
                <SearchHistory 
                    clearHistory={actions.clearHistory} 
                    clickKeyword={this.clickKeyword} 
                    data={historyList} 
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.actions.loadPopularKeywords();
    }

    componentWillUnmount() {
        this.props.actions.clearInputText();
    }

    clickKeyword = (value, id) =>{
        this.props.actions.addHistory(id);
        this.props.actions.setInputText(value);
        this.props.actions.loadRelatedShopsByKeywordId(id);
        this.props.history.push('/search_result');
    }

    onCancel = () => {
        this.props.history.push({pathname: '/'});      
    }
}

const mapStateToProps = (state) => {
    return {
        popluarKeywords: selector.getPopularKeywords(state),
        relatedKeywords: selector.getRelatedKeywords(state),
        inputText: selector.getInputText(state),
        historyList: selector.getHistory(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);