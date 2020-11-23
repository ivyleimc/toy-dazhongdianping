import createEntityReducer from '../../../utils/createEntityReducer';

const schame = {
    id: 'id',
    name: 'shops'
}

const reducer = createEntityReducer(schame.name);

const selector = {
    getShopById: (state, id) => {
        const shop = state.entities[schame.name][id];
        if (shop) {
            return shop;
        }
        return null;
    }
}

export {
    schame,
    reducer,
    selector
};