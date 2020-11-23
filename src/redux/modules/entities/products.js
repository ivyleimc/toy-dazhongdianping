import createEntityReducer from '../../../utils/createEntityReducer';

const schame = {
    id: 'id',
    name: 'products'
}

const reducer = createEntityReducer(schame.name)/* (state = {}, action) => {
    if (action.response && action.response[schame.name]) {
        let newState = {...state};
        for (const key in action.response[schame.name]) {
            if (newState[key]) {
                newState[key] = {
                    ...newState[key],
                    ...action.response[schame.name][key]
                }
                
            }
            else {
                newState[key] = action.response[schame.name][key];
            }
        }
        return newState;
    }
    return state;
}; */;

const selector = {
    getProductDetailById: (state, id) => {
        const productDet = state.entities[schame.name][id];
        if (productDet && productDet.purchaseNotes && productDet.detail) {
            return productDet;
        }
        return null;
    },
    getProductShopIdByProductId: (state, id) => {
        const productDet = state.entities[schame.name][id];
        if (productDet && productDet.nearestShop) {
            return productDet.nearestShop;
        }
        return null;
    }
}

export {
    schame,
    reducer,
    selector
};