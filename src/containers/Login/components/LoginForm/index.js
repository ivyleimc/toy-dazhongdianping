import React, { Component } from 'react';
import "./style.css"

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUserNameErr: null,
      inputPasswordErr: null
    }
    this.userNameTimer = null;
    this.passwordTimer = null;
  }
  render() {
    const { userName, password } = this.props;
    return (
      <div className="loginForm">
        <div className="loginForm__inputContainer">
          <div className="loginForm__row">
            <label className="loginForm__mobileLabel">86</label>
            <input className="loginForm__input"
              type='number'
              name="username"
              value={userName}
              placeholder='手机号码'
              onChange={this.handleUserNameChange}
            ></input>
          </div>
          <div className="loginForm__row">
            <label className="loginForm__passwordLabel">密码</label>
            <input className="loginForm__input"
              name="password"
              type="password"
              value={password}
              onChange={this.handlePasswordChange}
            ></input>
          </div>
        </div>
        <div className="loginForm__errContainer">
          <i dangerouslySetInnerHTML={{__html: this.state.inputUserNameErr || this.state.inputPasswordErr}}></i>
        </div>
        <div className="loginForm__btnContainer">
          <button 
            className={(!password || !userName)?"disabled loginForm__btn":"loginForm__btn"}
            onClick={this.submit}>
            登录
          </button>
        </div>
      </div>
    );
  }

  submit = () => {
    if (this.props.password && this.props.userName) {
      var usernamereg=/^[1][3,4,5,7,8][0-9]{9}$/;
      var passwordreg=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/; 
      if (usernamereg.test(this.props.userName)) {
          if (passwordreg.test(this.props.password)) {
            this.props.onSubmit();
          }
          else {
            this.setState({
              inputPasswordErr: '密码不对，请重新输入<br/>字母开头、可带数字、“_”、“.”、长度 5 — 20'
            });
          }
      }
      else {
        this.setState({
          inputUserNameErr: '手机号码不对，请重新输入'
        });
      }
    }
  }

  handleUserNameChange = (e) => {
    const val = e.target.value;
    if (this.userNameTimer != null) {
      clearTimeout(this.userNameTimer);
    }
    this.userNameTimer = setTimeout(() => {
      this.props.onUserNameChange(val);
      if (this.state.inputUserNameErr) {
        this.setState({
          inputUserNameErr: null
        });
      }
    }, 100);
  }

  handlePasswordChange = (e) => {
    const val = e.target.value;
    if (this.passwordTimer != null) {
      clearTimeout(this.passwordTimer);
    }
    this.passwordTimer = setTimeout(() => {
      this.props.onPasswordChange(val);
      if (this.state.inputPasswordErr) {
        this.setState({
          inputPasswordErr: null
        });
      }
    }, 100);
  }
}

export default LoginForm;