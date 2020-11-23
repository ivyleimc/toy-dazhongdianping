import { getProductDetailUrl, getShopUrl } from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import { schame as productSchame, selector as productSelector } from '../modules/entities/products';
import { schame as shopSchame, selector as shopSelector } from '../modules/entities/shops';
import { combineReducers } from 'redux';

const initState = {
    detail: {
        isFetching: false,
        id: null
    },
    shop: {
        isFetching: false,
        id: null
    },
    error: ''
};

const fetchDetialTypes = {
    fetchRequestType: 'fetchDetailRequest',
    fetchSuccessType: 'fetchDetailSuccess',
    fetchFailureType: 'fetchDetailFailure'
}
const fetchShopTypes = {
    fetchRequestType: 'fetchShopRequest',
    fetchSuccessType: 'fetchShopSuccess',
    fetchFailureType: 'fetchShopFailure'
}
const detailActions = {
    loadDetail: (id) => {
        return (dispatch, getState) => {
            const state = getState();
            var productDet = productSelector.getProductDetailById(state, id);
            if (productDet) {
                return dispatch({
                    type: fetchDetialTypes.fetchSuccessType,
                    response: {
                        ids: [id]
                    }
                });
            }
            const fetchDetailAction = {
                [FETCH_DATA]: {
                    endPoint: getProductDetailUrl(id),
                    types: fetchDetialTypes,
                    schame: productSchame
                }
            };
            return dispatch(fetchDetailAction);

        }
    },
    loadShop: (id) => {
        return (dispatch, getState) => {
            const state = getState();
            var shop = shopSelector.getShopById(state, id);
                if (shop) {
                    return dispatch({
                        type: fetchShopTypes.fetchSuccessType,
                        response: {
                            ids: [id]
                        }
                    });
                }
                const fetchShopAction = {
                    [FETCH_DATA]: {
                        endPoint: getShopUrl(id),
                        types: fetchShopTypes,
                        schame: shopSchame
                    }
                };
                return dispatch(fetchShopAction);
        }
    }
}

const detail = (state = initState.detail, action) => {
    switch (action.type) {
        case fetchDetialTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            }
        case fetchDetialTypes.fetchSuccessType:
            return {
                ...state,
                isFetching: false,
                id: action.response.ids[0]
            }
        case fetchDetialTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
};

const shop = (state = initState.shop, action) => {
    switch (action.type) {
        case fetchShopTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            }
        case fetchShopTypes.fetchSuccessType:
            return {
                ...state,
                isFetching: false,
                id: action.response.ids[0]
            }
        case fetchShopTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
};

const detailReducers = combineReducers({ detail, shop });

const detailSelector = {
    getProductDetail: (state, id) => {
        if (id) {
            return productSelector.getProductDetailById(state, id);
        }
        return null;
    },
    getShop: (state, productId) => {
        const id = productSelector.getProductShopIdByProductId(state, productId);
        if (id) {
            return shopSelector.getShopById(state, id);
        }
        return null;
    }
}

export {
    detailActions,
    detailReducers,
    detailSelector
};