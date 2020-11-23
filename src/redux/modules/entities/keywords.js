import createEntityReducer from '../../../utils/createEntityReducer';

const schema = {
    id: 'id',
    name: 'keywords'
}

const reducer = createEntityReducer(schema.name);

const getKeywordById = (state, id) => {
    if (state.entities[schema.name] && state.entities[schema.name][id]) {
        return state.entities[schema.name][id];
    }
    else {
        return null;
    }
}

export {
    schema,
    reducer,
    getKeywordById
}