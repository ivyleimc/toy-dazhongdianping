import React, { Component } from 'react';


class ErrorToast extends Component {
    render() {
        const { error } = this.props;
        return (
            <div className='errorToast'>
                <div className='errorToast__text'>
                    {error}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.clearTimer = setTimeout(() => {
            this.props.clearError();
        }, 3000);
    }

    componentWillUnmount() {
        if (this.clearTimer) {
            clearTimeout(this.clearTimer);
        }
    }
}

export default ErrorToast;