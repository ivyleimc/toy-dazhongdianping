import { getOrdersUrl } from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import {
    schame,
    orderTypes,
    selector as orderSelectors,
    actionTypes as orderEntitiesActionTypes,
    actions as orderEntitiesActions
} from '../modules/entities/orders';
import { actions as commentEntitiesActions } from '../modules/entities/comments'
import { combineReducers } from 'redux';
import { purchaseOrderTypes } from './purchase'

let hadLoadOrder = false;
const initState = {
    orders: {
        isFetching: false,
        ids: [],
        toPayIds: [],
        availableIds: [],
        refundIds: [],
        error: null
    },
    currentTab: 0,
    currentOrder: {
        id: 0,
        isDeleting: false,
        error: null,
        isCommenting: false,
        comment: '',
        start: 0
    }
};

const fetchOrderTypes = {
    fetchRequestType: 'ORDERS_REQUEST',
    fetchSuccessType: 'ORDERS_SUCCESS',
    fetchFailureType: 'ORDERS_FAILURE'
}

const DeleteOrderTypes = {
    fetchRequestType: 'DELETE_ORDERS_REQUEST',
    fetchSuccessType: 'DELETE_ORDERS_SUCCESS',
    fetchFailureType: 'DELETE_ORDERS_FAILURE'
}

const CommentOrderTypes = {
    fetchRequestType: 'COMMENT_ORDERS_REQUEST',
    fetchSuccessType: 'COMMENT_ORDERS_SUCCESS',
    fetchFailureType: 'COMMENT_ORDERS_FAILURE'
}

const types = {
    SET_TAB: 'SET_TAB',
    SHOW_DELETE_DIALOG: 'SHOW_DELETE_DIALOG',
    HIDE_DELETE_DIALOG: 'HIDE_DELETE_DIALOG',
    SHOW_COMMENT_DIALOG: 'SHOW_COMMENT_DIALOG',
    HIDE_COMMENT_DIALOG: 'HIDE_COMMENT_DIALOG',
    SET_COMMENT: 'SET_COMMENT',
    SET_START: 'SET_START'
};

const actions = {
    loadOrders: () => {
        return (dispatch, getState) => {
            const orderIds = getState().user.orders.ids;
            if (orderIds && orderIds.length && hadLoadOrder) {
                return null;
            }
            else {
                const ac = {
                    [FETCH_DATA]: {
                        types: fetchOrderTypes,
                        endPoint: getOrdersUrl(),
                        schame: schame
                    }
                }
                return dispatch(ac);
            }
        }
    },
    deleteOrder: (id) => {
        return (dispatch, getState) => {
            if (id) {
                dispatch(innerActions.deleteOrderRequest(id));
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        dispatch(innerActions.deleteOrderSuccess(id));
                        dispatch(orderEntitiesActions.deleteEntityOrder(id))
                        resolve();
                    }, 100)
                })
            }
            return null;
        }
    },
    commentOrder: (orderId) => {
        return (dispatch, getState) => {
            if (orderId) {
                dispatch(innerActions.commentOrderRequest(orderId));
                const { start, comment } = getState().user.currentOrder;
                const commentObj = {
                    id: new Date(),
                    comment,
                    start
                }
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        dispatch(innerActions.commentOrderSuccess(orderId, commentObj.id, comment, start));
                        dispatch(orderEntitiesActions.addOrderComment(orderId, commentObj.id));
                        dispatch(commentEntitiesActions.addComment(commentObj))
                        resolve();
                    }, 100)
                })
            }
            return null;
        }
    },
    showDeleteDialog: (id) => ({
        type: types.SHOW_DELETE_DIALOG,
        id
    }),
    hideDeleteDialog: (id) => ({
        type: types.HIDE_DELETE_DIALOG,
        id
    }),
    showCommentDialog: (id) => ({
        type: types.SHOW_COMMENT_DIALOG,
        id
    }),
    hideCommentDialog: (id) => ({
        type: types.HIDE_COMMENT_DIALOG,
        id
    }),
    setComment: (comment) => ({
        type: types.SET_COMMENT,
        comment
    }),
    setStart: (start) => ({
        type: types.SET_START,
        start
    }),
    setTab: (index) => ({
        type: types.SET_TAB,
        index
    })
};

const innerActions = {
    deleteOrderRequest: (id) => {
        return {
            type: DeleteOrderTypes.fetchRequestType,
            id
        }
    },
    deleteOrderSuccess: (id) => {
        return {
            type: DeleteOrderTypes.fetchSuccessType,
            id
        }
    },
    commentOrderRequest: (orderId) => {
        return {
            type: CommentOrderTypes.fetchRequestType,
            orderId
        }
    },
    commentOrderSuccess: (orderId, commentId, comment, start) => {
        return {
            type: CommentOrderTypes.fetchSuccessType,
            orderId,
            commentId,
            comment,
            start
        }
    }
}

const orders = (state = initState.orders, action) => {
    switch (action.type) {
        case fetchOrderTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            }
        case fetchOrderTypes.fetchSuccessType:
            hadLoadOrder = true;
            const toPayIds = action.response.ids.filter((id) => {
                const order = action.response[schame.name][id];
                if (order.type === orderTypes.TOPAY) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const availableIds = action.response.ids.filter((id) => {
                const order = action.response[schame.name][id];
                if (order.type === orderTypes.AVAILABLE) {
                    return true;
                }
                else {
                    return false;
                }
            });
            const refundIds = action.response.ids.filter((id) => {
                const order = action.response[schame.name][id];
                if (order.type === orderTypes.REFUND) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids),
                availableIds: state.availableIds.concat(availableIds),
                toPayIds: state.toPayIds.concat(toPayIds),
                refundIds: state.refundIds.concat(refundIds)
            }
        case fetchOrderTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case orderEntitiesActionTypes.DELETE_ORDER:
        case DeleteOrderTypes.fetchSuccessType:
            return {
                ...state,
                ids: removeDeleteId('ids', state, action.id),
                availableIds: removeDeleteId('availableIds', state, action.id),
                toPayIds: removeDeleteId('toPayIds', state, action.id),
                refundIds: removeDeleteId('refundIds', state, action.id)
            }
        case CommentOrderTypes.fetchSuccessType:
            return {
                ...state,
                [action.orderId]: {
                    ...state[action.orderId],
                    commentId: action.commentId
                }
            }
        case orderEntitiesActionTypes.ADD_ORDER:
            return {
                ...state,
                ids: [...state.ids, action.order.id]
            }
        case purchaseOrderTypes.fetchSuccessType:
            let newtoPayIds = state.toPayIds;
            newtoPayIds.push(action.order.id);
            return {
                ...state,
                toPayIds: newtoPayIds
            }
        default:
            return state;
    }
};

const removeDeleteId = (key, state, id) => {
    return state[key].filter((i) => {
        return i !== id;
    });
}

const currentOrder = (state = initState.currentOrder, action) => {
    switch (action.type) {
        case DeleteOrderTypes.fetchRequestType:
        case types.SHOW_DELETE_DIALOG:
            return {
                ...state,
                isDeleting: true,
                id: action.id
            }
        case DeleteOrderTypes.fetchSuccessType:
        case types.HIDE_DELETE_DIALOG:
            return {
                ...state,
                isDeleting: false,
                id: 0
            }
        case DeleteOrderTypes.fetchFailureType:
            return {
                ...state,
                isDeleting: false,
                id: 0,
                error: action.error
            }
        case CommentOrderTypes.fetchRequestType:
        case types.SHOW_COMMENT_DIALOG:
            return {
                ...state,
                isCommenting: true,
                id: action.id
            }
        case CommentOrderTypes.fetchSuccessType:
        case types.HIDE_COMMENT_DIALOG:
            return {
                ...state,
                isCommenting: false,
                id: 0,
                comment: '',
                start: 0
            }
        case CommentOrderTypes.fetchFailureType:
            return {
                ...state,
                isCommenting: false,
                id: 0,
                error: action.error,
                comment: '',
                start: 0
            }
        case types.SET_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case types.SET_START:
            return {
                ...state,
                start: action.start
            }
        default:
            return state;
    }
}

const tab = (state = initState.currentTab, action) => {
    switch (action.type) {
        case types.SET_TAB:
            return action.index;
        default:
            return state;
    }
}

const reducers = combineReducers({ orders, currentOrder, tab });

const selectors = {
    orders: (state) => {
        const type = state.user.tab;
        let orders = [];
        if (type === orderTypes.TOPAY) {
            orders = state.user.orders.toPayIds.map((id) => {
                return orderSelectors.getOrderById(state, id);
            });
        }
        else if (type === orderTypes.AVAILABLE) {
            orders = state.user.orders.availableIds.map((id) => {
                return orderSelectors.getOrderById(state, id);
            });
        }
        else if (type === orderTypes.REFUND) {
            orders = state.user.orders.refundIds.map((id) => {
                return orderSelectors.getOrderById(state, id);
            });
        }
        else {
            orders = state.user.orders.ids.map((id) => {
                return orderSelectors.getOrderById(state, id);
            });
        }
        orders.sort(function (a, b) {
            var aId = parseInt(a.id.replace('o-', ''));
            var bId = parseInt(b.id.replace('o-', ''));
            if (aId - bId < 0) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return orders;
    },
    currentTab: (state) => {
        return state.user.tab;
    },
    deleteId: (state) => {
        return state.user.currentOrder.isDeleting ? state.user.currentOrder.id : 0;
    },
    commentingId: (state) => {
        return state.user.currentOrder.isCommenting ? state.user.currentOrder.id : 0;
    },
    getComment: (state) => {
        return state.user.currentOrder.isCommenting ? state.user.currentOrder.comment : ''
    },
    getStart: (state) => {
        return state.user.currentOrder.isCommenting ? state.user.currentOrder.start : 0
    }
}

export {
    actions,
    reducers,
    selectors
}