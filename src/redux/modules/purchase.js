import { selector as productEntitiesSelector } from './entities/products';
import { actions as orderEntitiesActions } from './entities/orders'

const initState = {
    quantity: 1,
    isPurchasing: false,
    showTip: false,
    error: null
}
let newOrderId = 10;

const purchaseOrderTypes = {
    fetchRequestType: 'PURCHASE_ORDERS_REQUEST',
    fetchSuccessType: 'PURCHASE_ORDERS_SUCCESS',
    fetchFailureType: 'PURCHASE_ORDERS_FAILURE'
}

const types = {
    INCREASE_QUANTITY: 'INCREASE_QUANTITY',
    DECREASE_QUANTITY: 'DECREASE_QUANTITY',
    SET_QUANTITY: 'SET_QUANTITY',
    SHOW_TIP: 'SHOW_TIP',
    HIDE_TIP: 'HIDE_TIP'
}

const innerActions = {
    purchaseOrderRequest: () => ({
        type: purchaseOrderTypes.fetchRequestType
    }),
    purchaseOrderSuccess: (order) => ({
        type: purchaseOrderTypes.fetchSuccessType,
        order
    })
}

const actions = {
    purchaseOrder: (id) => {
        return (dispatch, getState) => {
            const state = getState();
            const quantity = state.purchase.quantity;
            const productDetail = productEntitiesSelector.getProductDetailById(state, id)
            dispatch(innerActions.purchaseOrderRequest())
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const sumPrice = (quantity * productDetail.currentPrice).toFixed(2);
                    newOrderId++;
                    const order = {
                        id: `o-${newOrderId}`,
                        statusText: "待付款",
                        orderPicUrl: productDetail.picture,
                        channel: "团购",
                        title: productDetail.product,
                        text: [`${quantity}张 | 总价：￥${sumPrice}", "有效期${productDetail.validityPeriod}`],
                        type: 1
                    }
                    dispatch(innerActions.purchaseOrderSuccess(order));
                    dispatch(orderEntitiesActions.addOrder(order))
                    resolve();
                })
            })
        }
    },
    increaseQuantity: () => ({
        type: types.INCREASE_QUANTITY
    }),
    decreaseQuantity: () => ({
        type: types.DECREASE_QUANTITY
    }),
    setQuantity: (quantity) => ({
        type: types.SET_QUANTITY,
        quantity
    }),
    hideTip: () => ({
        type: types.HIDE_TIP
    })
}

const reducers = (state = initState, action) => {
    switch (action.type) {
        case types.INCREASE_QUANTITY:
            return {
                ...state,
                quantity: state.quantity + 1
            }
        case types.DECREASE_QUANTITY:
            return {
                ...state,
                quantity: state.quantity === 1 ? 1 : state.quantity - 1
            }
        case types.SET_QUANTITY:
            return {
                ...state,
                quantity: action.quantity
            }
        case purchaseOrderTypes.fetchRequestType:
            return {
                ...state,
                isPurchasing: true
            }
        case purchaseOrderTypes.fetchSuccessType:
            return {
                ...state,
                isPurchasing: false,
                showTip: true
            }
        case purchaseOrderTypes.fetchFailureType:
            return {
                ...state,
                isPurchasing: false,
                error: action.error
            }
        case types.HIDE_TIP:
            return {
                ...state,
                showTip: false
            }
        default:
            return state;
    }
}

const selectors = {
    getProductDetail: (state, id) => {
        return productEntitiesSelector.getProductDetailById(state, id);
    },
    getQuantity: (state) => {
        return state.purchase.quantity;
    },
    getShowTip: (state) => {
        return state.purchase.showTip;
    }
}

export {
    actions,
    selectors,
    reducers,
    purchaseOrderTypes
}

