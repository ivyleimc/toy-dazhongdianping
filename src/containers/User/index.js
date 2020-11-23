import React, { Component } from 'react';
import UserMain from './containers/UserMain'
import UserHeader from './components/UserHeader';
import { connect } from 'react-redux';
import { actions, selectors } from '../../redux/modules/user';
import { actions as loginActions } from '../../redux/modules/login';
import { bindActionCreators } from 'redux'

class User extends Component {
    render() {
        const { orders } = this.props;
        return (
            <div>
                <UserHeader
                    onBack={this.onBack}
                    onLogout={this.onLogout} />
                <UserMain
                    orders={orders} />
            </div>
        );
    }

    componentDidMount() {
        this.props.actions.loadOrders();
    }

    componentWillUnmount() {
        this.props.actions.setTab(0);
    }

    setTab = (idx) => {
        this.props.actions.setTab(idx);
    }

    onBack = () => {
        this.props.history.push('/');
    }

    onLogout = () => {
        this.props.loginActions.logout();
    }
}

const mapStateToProps = (state, props) => {
    return {
        orders: selectors.orders(state)
    }
}

const mapDispatchToProps = (Dispatch, props) => {
    return {
        actions: bindActionCreators(actions, Dispatch),
        loginActions: bindActionCreators(loginActions, Dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);