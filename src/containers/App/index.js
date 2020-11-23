import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorToast from '../../components/ErrorToast';
import { appActions, getError } from '../../redux/modules/app';
import { bindActionCreators } from 'redux';
import Home from '../../containers/Home';
import Search from '../../containers/Search';
import SearchResult from '../../containers/SearchResult';
import ProductDetail from '../../containers/ProductDetail';
import Login from '../../containers/Login';
import User from '../../containers/User';
import Purchase from '../../containers/Purchase';
import PrivateRoute from '../../containers/PrivateRoute';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        const { error, appActions: { clearError } } = this.props;
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path='/detail/:id' component={ProductDetail} />
                        <PrivateRoute path='/user' component={User} />
                        <PrivateRoute path='/purchase/:id' component={Purchase} />
                        <Route path='/login' component={Login} />
                        <Route path='/search' component={Search} />
                        <Route path='/search_result' component={SearchResult} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Router>
                {error ? <ErrorToast error={error} clearError={clearError} /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

