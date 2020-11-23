import React, { Component } from 'react';
import LikeItem from '../LikeItem';
import Loading from '../../../../components/Loading';
import './style.css';

class LikeList extends Component {
    constructor(props) {
        super(props);
        this.likeListEle = React.createRef();
        this.removeScroll = false;
    }

    render() {
        const { data, page } = this.props;
        return (
            <div ref={this.likeListEle} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return <LikeItem key={item.id + index} data={item} />
                        })
                    }
                </div>
                <div>
                    {
                        page < 3 ?
                            <Loading /> :
                            <a href="/" className="likeList__viewAll">查看更多</a>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.page < 3) {
            document.addEventListener('scroll', this.handleScroll);
        }
        else {
            this.removeScroll = true;
        }
    }

    componentDidUpdate() {
        if (this.props.page >= 3) {
            document.removeEventListener('scroll', this.handleScroll);
            this.removeScroll = true;
        }
    }

    componentWillUnmount() {
        if (!this.removeScroll) {
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll = (e) => {
        this.props.loadLikes();
    }
}

export default LikeList;