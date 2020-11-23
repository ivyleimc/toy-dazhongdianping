import { getProductDiscountsUrl, getProductLikesUrl } from '../../utils/url';
import { FETCH_DATA } from '../middlewares/api';
import { schame } from '../modules/entities/products';

const initState = {
    like: {
        isFetching: false,
        ids: [],
        page: 0
    },
    discount: {
        isFetching: false,
        ids: []
    },
    error: ''
}
const fetchLisksTypes = {
    fetchRequestType: 'fetchLikesRequest',
    fetchSuccessType: 'fetchLikesSuccess',
    fetchFailureType: 'fetchLikesFailure'
}
const fetchDiscountsTypes = {
    fetchRequestType: 'fetchDiscountsRequest',
    fetchSuccessType: 'fetchDiscountsSuccess',
    fetchFailureType: 'fetchDiscountsFailure'
}

const homeActions = {
    loadLikes: () => {
        return (dispatch, getState) => {
            const state = getState();
            if (state.home.like.page >= 3) {
                return null;
            }
            else {
                const page = getState().home.like.page
                const fetchLikesAction = {
                    [FETCH_DATA]: {
                        endPoint: getProductLikesUrl(page, 4),
                        types: fetchLisksTypes,
                        schame
                    },
                    u: 'like'
                };
                return dispatch(fetchLikesAction);
            }
        }
    },
    loadDiscounts: () => {
        return (dispatch, getState) => {
            const state = getState();
            const ids = state.home.discount.ids;
            if (ids.length) {
                return null;
            }
            else {
                const fetchDiscountsAction = {
                    [FETCH_DATA]: {
                        endPoint: getProductDiscountsUrl(),
                        types: fetchDiscountsTypes,
                        schame
                    }
                };
                return dispatch(fetchDiscountsAction);
            }
        }
    }
}

const homeReduers = (state = initState, action) => {
    switch (action.type) {
        case fetchLisksTypes.fetchRequestType:
            return {
                ...state,
                like: {
                    ...state.like,
                    isFetching: true
                }
            };
        case fetchLisksTypes.fetchSuccessType:
            return {
                ...state,
                like: {
                    ...state.like,
                    isFetching: false,
                    ids: [...state.like.ids].concat(action.response.ids),
                    page: state.like.page + 1
                }
            };
        case fetchLisksTypes.fetchFailureType:
            return {
                ...state,
                error: action.error,
                like: {
                    ...state.like,
                    isFetching: false
                }
            }
        case fetchDiscountsTypes.fetchRequestType:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    isFetching: true
                }
            };
        case fetchDiscountsTypes.fetchSuccessType:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    isFetching: false,
                    ids: [...state.discount.ids].concat(action.response.ids)
                }
            };
        case fetchDiscountsTypes.fetchFailureType:
            return {
                ...state,
                error: action.error,
                discount: {
                    ...state.discount,
                    isFetching: false
                }
            }
        default:
            return state;
    }
};

const homeSelectors = {
    getLikes: (state) => {
        let result = [];
        state.home.like.ids.forEach(e => {
            result.push(state.entities.products[e]);
        });
        return result;
    },
    getLikesPage: (state) => {
        return state.home.like.page;
    },
    getDiscounts: (state) => {
        let result = [];
        state.home.discount.ids.forEach(e => {
            result.push(state.entities.products[e]);
        });
        return result;
    }
};

export {
    homeReduers,
    homeActions,
    homeSelectors
};