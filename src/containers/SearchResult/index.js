import React, { Component } from 'react';
import ShopList from "./components/ShopList"
import SearchHeader from "./components/SearchHeader"
import KeywordBox from "./components/KeywordBox"
import Banner from "../../components/Banner"
import { connect } from 'react-redux'
import { selector } from '../../redux/modules/search'
import { Redirect } from 'react-router-dom'

class SearchResult extends Component {
  render() {
    const { shops, text, location, computedMatch } = this.props;
    if (text) {
      return (
        <div>
          <SearchHeader onBack={this.handleBack} onSearch={this.handleSearch} />
          <KeywordBox text={text} />
          <Banner dark />
          <ShopList data={shops} />
        </div>
      );
    }
    else {
      return (<Redirect match={computedMatch} to={{
          pathname: '/',
          state: {
              from: location
          }
      }} />);
    }
  }

  handleBack = () => {
    this.props.history.push('/search')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
}

const mapStateToProps = (state, props) => {
  return {
    shops: selector.getRelatedShops(state),
    text: selector.getCurrentKeyword(state)
  }
}

export default connect(mapStateToProps, null)(SearchResult);