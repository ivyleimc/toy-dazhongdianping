import { getPopularKeywordsUrl, getRelatedKeywordsUrl, getRelatedShopsUrl } from '../../utils/url';
import { FETCH_DATA } from '../../redux/middlewares/api';
import { schema, getKeywordById } from '../modules/entities/keywords';
import { schame as shopSchame, selector as shopSelectors } from '../modules/entities/shops';
import { combineReducers } from 'redux';

const popularKeywordsTypes = {
    fetchRequestType: 'popularKeywordsRequest',
    fetchSuccessType: 'popularKeywordsSuccess',
    fetchFailureType: 'popularKeywordsFailure',
}

const relatedKeywordsTypes = {
    fetchRequestType: 'relatedKeywordsRequest',
    fetchSuccessType: 'relatedKeywordsSuccess',
    fetchFailureType: 'relatedKeywordsFailure',
}

const relatedShopsTypes = {
    fetchRequestType: 'relatedShopsRequest',
    fetchSuccessType: 'relatedShopsSuccess',
    fetchFailureType: 'relatedShopsFailure',
}

const setInputTextType = 'setInputTextType';
const clearInputTextType = 'clearInputTextType';
const addHistoryType = 'addHistoryType';
const clearHistoryType = 'clearHistoryType';

const initState = {
    inputText: '',
    popularKeywords: {
        isFetching: false,
        ids: [],
        error: null
    },
    relatedKeywords: {

    },
    historyKeywordIds: [],
    relatedShopsByKeyword: {

    }
}

const actions = {
    loadPopularKeywords: () => {
        return (dispatch, getState) => {
            const state = getState();
            const ids = state.search.popularKeywords.ids;
            if (ids && ids.length) {
                return null;
            }
            else {
                const ac = {
                    [FETCH_DATA]: {
                        types: popularKeywordsTypes,
                        endPoint: getPopularKeywordsUrl(),
                        schame: schema
                    }
                }
                return dispatch(ac);
            }
        }
    },
    loadRelatedKeywords: (text) => {
        return (dispatch, getState) => {
            const state = getState();
            const relate = state.search.relatedKeywords[text];
            if (relate && relate.ids && relate.ids.length) {
                return null;
            }
            else {
                const ac = {
                    [FETCH_DATA]: {
                        types: relatedKeywordsTypes,
                        endPoint: getRelatedKeywordsUrl(text),
                        schame: schema
                    },
                    text
                }
                return dispatch(ac);
            }

        }
    },
    loadRelatedShopsByKeywordId: (id) => {
        return (dispatch, getState) => {
            const state = getState();
            const relatedShops = state.search.relatedShops[id];
            if (relatedShops && relatedShops.ids.length) {
                return null;
            }
            else {
                const ac = {
                    [FETCH_DATA]: {
                        types: relatedShopsTypes,
                        endPoint: getRelatedShopsUrl(id),
                        schame: shopSchame
                    },
                    id
                }
                return dispatch(ac);
            }
        }
    },
    setInputText: (text) => {
        return {
            type: setInputTextType,
            text
        }
    },
    clearInputText: () => {
        return {
            type: clearInputTextType
        }
    },
    addHistory: (id) => {
        return {
            type: addHistoryType,
            id
        }
    },
    clearHistory: () => {
        return {
            type: clearHistoryType
        }
    }
}

const popularKeywords = (state = initState.popularKeywords, action) => {
    switch (action.type) {
        case popularKeywordsTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            };
        case popularKeywordsTypes.fetchSuccessType:
            return {
                ...state,
                isFetching: false,
                ids: [...state.ids, ...action.response.ids]
            };
        case popularKeywordsTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

const relatedKeywords = (state = initState.relatedKeywords, action) => {
    switch (action.type) {
        case relatedKeywordsTypes.fetchRequestType:
        case relatedKeywordsTypes.fetchSuccessType:
        case relatedKeywordsTypes.fetchFailureType:
            return {
                ...state,
                [action.text]: dealWithRelatedKeyword(state[action.text], action)
            };
        default:
            return state;
    }
}

const relatedShops = (state = initState.relatedShopsByKeyword, action) => {
    switch (action.type) {
        case relatedShopsTypes.fetchRequestType:
        case relatedShopsTypes.fetchSuccessType:
        case relatedShopsTypes.fetchFailureType:
            return {
                ...state,
                [action.id]: dealWithRelatedShop(state[action.id], action)
            };
        default:
            return state;
    }
}

const inputText = (state = initState.inputText, action) => {
    switch (action.type) {
        case setInputTextType:
            return action.text
        case clearInputTextType:
            return ''
        default:
            return state;
    }
}

const historyIds = (state = initState.historyKeywordIds, action) => {
    switch (action.type) {
        case addHistoryType:
            var newHistory = state.filter((h) => {
                if (h !== action.id) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return [action.id, ...newHistory]
        case clearHistoryType:
            return []
        default:
            return state;
    }
}

const dealWithRelatedKeyword = (state, action) => {
    if (!state) {
        state = {
            isFetching: false,
            ids: [],
            error: null
        }
    }
    switch (action.type) {
        case relatedKeywordsTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            };
        case relatedKeywordsTypes.fetchSuccessType:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            };
        case relatedKeywordsTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

const dealWithRelatedShop = (state, action) => {
    if (!state) {
        state = {
            isFetching: false,
            ids: [],
            error: null
        }
    }
    switch (action.type) {
        case relatedShopsTypes.fetchRequestType:
            return {
                ...state,
                isFetching: true
            };
        case relatedShopsTypes.fetchSuccessType:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            };
        case relatedShopsTypes.fetchFailureType:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        default:
            return state;
    }
}

const reducers = combineReducers({ 
    popularKeywords, 
    relatedKeywords,
    inputText,
    historyIds,
    relatedShops
});

const selector = {
    getPopularKeywords: (state) => {
        var ids = state.search.popularKeywords.ids;
        return ids.map((id) => {
            return getKeywordById(state, id);
        })
    },
    getRelatedKeywords: (state) => {
        var text = state.search.inputText;
        var obj = state.search.relatedKeywords[text];
        var ids = obj ? obj.ids : [];
        return ids.map((id) => {
            return getKeywordById(state, id);
        })
    },
    getRelatedShops: (state) => {
        var id = state.search.historyIds[0];
        var obj = state.search.relatedShops[id];
        var ids = obj ? obj.ids : [];
        return ids.map((id) => {
            return shopSelectors.getShopById(state, id);
        })
    },
    getInputText: (state) => {
        return state.search.inputText;
    },
    getHistory: (state) => {
        var ids = state.search.historyIds;
        return ids.map((id) => {
            return getKeywordById(state, id);
        })
    },
    getCurrentKeyword: (state) => {
        var id = state.search.historyIds[0];
        if (id) {
            const keyword = getKeywordById(state, id);
            return keyword.keyword;
        }
        else {
            return '';
        }
    }
}

export {
    actions,
    reducers,
    selector
}
