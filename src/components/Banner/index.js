import React, { Component } from 'react';
import './style.css';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.fileEle = React.createRef();
    }
    render() {
        const { dark } = this.props;
        const style = dark ? { backgroundImage: 'url(https://img.zcool.cn/community/01c2065d15bb2fa801215529cc509f.jpg@1280w_1l_2o_100sh.jpg)' } : null;
        return (
            <header className='banner' style={style}>
                <div className='banner__title'>
                    <span className='banner__logo' />
                    <span className='banner__text'>吃喝玩乐，找优惠</span>
                </div>
                {/* <div className='banner__btns'>
                    <a className='banner__btn' href='https://evt.dianping.com/synthesislink/6702.html'>打开大众点评</a>
                    <a className='banner__btn banner__btn--bg' href='https://m.dianping.com/download/redirect?id=11186'>下载APP享特价</a>
                </div> */}
            </header>
        )
    }
}

export default Banner;