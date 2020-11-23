const createEntityReducer = (schameName) => {
    return (state = {}, action) => {
        if (action.response && action.response[schameName]) {
            return {
                ...state,
                ...action.response[schameName]
            }
        }
        return state;
    };
}

export default createEntityReducer;