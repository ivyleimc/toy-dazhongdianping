import React, { Component } from 'react';

const HocFactory = (Comp) => {
    class Hoc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                x: 0,
                y: 0
            }
        }
        render() {
            return (
                <div className='hoc' onMouseMove={this.handleMove}>
                    <Comp {...this.props} move={this.state}/>
                </div>
            );
        }

        handleMove = (e) => {
            console.log(e);
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
    }

    return Hoc;
}

export default HocFactory;