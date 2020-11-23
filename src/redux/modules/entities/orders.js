import createEntityReducer from '../../../utils/createEntityReducer';

const schame = {
    id: 'id',
    name: 'orders'
}

const orderTypes = {
    ALL: 0,
    TOPAY: 1,
    AVAILABLE: 2,
    REFUND: 3,
}

const genernalReducer = createEntityReducer(schame.name);

const reducer = (state={}, action) => {
    switch(action.type) {
        case actionTypes.DELETE_ORDER:
            const {[action.id]: deleteOrders, ...restOrders} = state;
            return restOrders;
        case actionTypes.ADD_ORDER_COMMENT:
            return {
                ...state,
                [action.orderId]: {
                    ...state[action.orderId],
                    commentId: action.commentId
                }
            };
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                [action.order.id]: action.order
            };
        default:
            return genernalReducer(state, action);
    }
}

const actionTypes = {
    DELETE_ORDER: 'DELETE_ORDER',
    ADD_ORDER_COMMENT: 'ADD_ORDER_COMMENT',
    ADD_ORDER: 'ADD_ORDER'
}

const actions = {
    deleteEntityOrder: (id) => ({
        type: actionTypes.DELETE_ORDER,
        id
    }),
    addOrderComment: (orderId, commentId) => ({
        type: actionTypes.ADD_ORDER_COMMENT,
        orderId,
        commentId
    }),
    addOrder: (order) => ({
        type: actionTypes.ADD_ORDER,
        order
    })
}

const selector = {
    getOrderById: (state, id) => {
        return state.entities.orders[id];
    }
}

export {
    schame,
    reducer,
    orderTypes,
    selector,
    actions,
    actionTypes
}