import React, { Component } from 'react';

class Mouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
    }
    render() {
        return (
            <div style={{height: '100%', width: '100%'}} onMouseMove={this.handleMouseMove}>
                { this.props.render(this.state)}
            </div>
        );
    }

    handleMouseMove = (e) => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        });
    }
}

export default Mouse;