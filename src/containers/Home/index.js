import React, { Component } from 'react';
import Banner from '../../components/Banner';
/* import Category from '../Home/components/Category';
import Headerline from '../Home/components/Headline';
import Activity from '../Home/components/Activity'; */
import Discount from '../Home/components/Discount';
import LikeList from '../Home/components/LikeList';
import HomeHeader from '../Home/components/HomeHeader';
import Footer from '../../components/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { homeActions, homeSelectors } from '../../redux/modules/home';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark'
        }
    }
    render() {
        const { discounts, likes, likesPage, homeActions: {loadLikes}} = this.props;
        return (
            <div>
                <HomeHeader />
                <Banner />
                {/* <Category />
                <Headerline />
                <Activity /> */}
                <Discount data={discounts} />
                <LikeList data={likes} page={likesPage} loadLikes={loadLikes}/>
                <Footer />
            </div>
        );
    }

    changeTheme = () => {
        this.setState({
            theme: this.state.theme === 'light' ? 'dark' : 'light'
        });
    }

    componentDidMount() {
        this.props.homeActions.loadDiscounts();
        this.props.homeActions.loadLikes();
    }
}

const mapStateToProps = (state) => ({
    discounts: homeSelectors.getDiscounts(state),
    likes: homeSelectors.getLikes(state),
    likesPage: homeSelectors.getLikesPage(state)
});

const mapDispatchToProps = (dispatch) => ({
    homeActions: bindActionCreators(homeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);