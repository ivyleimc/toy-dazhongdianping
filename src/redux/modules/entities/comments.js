import createEntityReducer from '../../../utils/createEntityReducer';

const schame = {
    id: 'id',
    name: 'comments'
}

const actionTypes = {
    ADD_COMMENT: 'ADD_COMMENT'
}

const actions = {
    addComment: (comment) => ({
        type: actionTypes.ADD_COMMENT,
        comment
    })
}

const genernalReducer = createEntityReducer(schame.name);

const reducer = (state={}, action) => {
    switch(action.type) {
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            };
        default:
            return genernalReducer(state, action);
    }
}

export {
    schame,
    reducer,
    actions
}