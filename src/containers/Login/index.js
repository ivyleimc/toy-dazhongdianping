import React, { Component } from 'react';
import LogicHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import { connect } from 'react-redux';
import { selectors, actions } from '../../redux/modules/login';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class Login extends Component {
    render() {
        const { isLogin, userName, password, location: {state}} = this.props;
        if (isLogin) {
            if (state && state.from) {
                return <Redirect to={state.from} />
            }
            return <Redirect to='/user' />
        }
        return (
            <div>
                <LogicHeader />
                <LoginForm
                    userName={userName}
                    password={password}
                    onSubmit={this.onSubmit}
                    onUserNameChange={this.onUserNameChange}
                    onPasswordChange={this.onPasswordChange}
                />
            </div>
        );
    }

    onSubmit = () => {
        this.props.actions.login();
    }

    onUserNameChange = (v) => {
        this.props.actions.setUserName(v)
    }

    onPasswordChange = (v) => {
        this.props.actions.setPassword(v)
    }
}

const mapStateToProps = (state, props) => {
    return {
        userName: selectors.getUserName(state),
        password: selectors.getPassword(state),
        isLogin: selectors.isLogin(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);