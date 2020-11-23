import React, { Component } from 'react';
import Header from '../../components/Header';
import PurchaseFrom from './PurchaseFrom';
import { connect } from 'react-redux';
import { detailActions } from '../../redux/modules/detail';
import { selectors as loginSelectors } from '../../redux/modules/login';
import { selectors as purchaseSelectors, actions as purchaseActions } from '../../redux/modules/purchase';
import { bindActionCreators } from 'redux'

class Purchase extends Component {
    render() {
        const {
            quantity,
            purchaseActions,
            productDetail,
            showTip,
            userName
        } = this.props;
        return (
            <div>
                <Header title='下单' onBack={this.onBack} />
                <PurchaseFrom
                    userName={userName}
                    quantity={quantity}
                    showTip={showTip}
                    hideTip={this.hideTip}
                    purchaseOrder={this.purchaseOrder}
                    currentPrice={productDetail ? productDetail.currentPrice : 0}
                    onSetQuantity={purchaseActions.setQuantity}
                    onIncreaseQuantity={purchaseActions.increaseQuantity}
                    onDecreaseQuantity={purchaseActions.decreaseQuantity} />
            </div>
        );
    }

    componentDidMount() {
        const id = this.props.match.params.id.replace(':', '');
        this.props.detailActions.loadDetail(id);
    }

    onBack = () => {
        this.props.history.goBack();
    }

    purchaseOrder = () => {
        const id = this.props.match.params.id.replace(':', '');
        this.props.purchaseActions.purchaseOrder(id);
    }

    hideTip = () => {
        this.props.purchaseActions.hideTip();
        this.props.history.push('/user');
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id.replace(':', '');
    return {
        productDetail: purchaseSelectors.getProductDetail(state, id),
        quantity: purchaseSelectors.getQuantity(state),
        showTip: purchaseSelectors.getShowTip(state),
        userName: loginSelectors.getUserName(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        detailActions: bindActionCreators(detailActions, dispatch),
        purchaseActions: bindActionCreators(purchaseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);