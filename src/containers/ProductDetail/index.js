import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from './components/BuyButton';
import Header from '../../components/Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { detailActions, detailSelector } from '../../redux/modules/detail';

class ProdutDetail extends Component {
    render() {
        const { detail, shop } = this.props;
        return (
            <div>
                {detail && shop ?
                    <div>
                        <Header title='团购详情' onBack={this.handleBack} />
                        <ProductOverview data={detail} />
                        <ShopInfo shop={detail.shop} total={detail.shopIds.length} />
                        <Detail category={detail.detail.category} products={detail.detail.products} remark={detail.detail.remark} />
                        <Remark purchaseNotes={detail.purchaseNotes} />
                        <BuyButton id={detail.id} />
                    </div> :
                    ""}
            </div>
        );
    }

    componentDidMount() {
        const id = this.props.match.params.id.replace(':', '');
        if (!this.props.detail) {
            this.props.detailActions.loadDetail(id);
        }
        else if (!this.props.shop) {
            this.props.detailActions.loadShop(this.props.detail.nearestShop);
        }

    }

    componentDidUpdate(preProps) {
        if (!preProps.detail && this.props.detail) {
            this.props.detailActions.loadShop(this.props.detail.nearestShop);
        }
    }

    handleBack = () => {
        this.props.history.push('/');
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id.replace(':', '');
    return {
        detail: detailSelector.getProductDetail(state, id),
        shop: detailSelector.getShop(state, id)
    }
};

const mapDispatchToProps = (dispatch) => ({
    detailActions: bindActionCreators(detailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProdutDetail);