import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { selectors } from '../../redux/modules/login';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
    render() {
        const { component: Component, isLogin, computedMatch, location } = this.props;
        if (isLogin) {
            return (<Component {...this.props} match={computedMatch} />);
        }
        else {
            return (<Redirect match={computedMatch} to={{
                pathname: '/login',
                state: {
                    from: location
                }
            }} />)
        }
        /* return (
            <Route {...this.props} render={(props) => {
                props.match = computedMatch;
                return isLogin ?
                    (<Component {...props} />) :
                    (<Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />)
            }}></Route>
        ); */
    }
}

const mapStateToProps = (state, props) => {
    return {
        isLogin: selectors.isLogin(state)
    }
}

export default withRouter(connect(mapStateToProps, null)(PrivateRoute));