import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    我的
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    社区论坛
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    添加商户
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    意见反馈
                </i>
                <br />
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    美团网
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    美团下载
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    结婚
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    亲子
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    家装
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    宴会
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    教育
                </i>
                <br />
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    电脑版
                </i>
                <em className="footer__seperator">|</em>
                <i className='footer__link' /* href="https://m.dianping.com/nmy/myinfo" */>
                    客户端
                </i>
                <em className="footer__seperator">|</em>
                <br />
                <p className="footer__copyright">copyright ©2018 dianping.com</p>
            </footer>
        );
    }
}

export default Footer;