const actionTypes = {
    CLEAR_ERROR: 'CLEAR_ERROR'
};

const initState = {
    error: ''
}

const appActions = {
    clearError: () => ({
        type: actionTypes.CLEAR_ERROR
    })
}

const appReducer = (state = initState, action) => {
    if (action.error != null) {
        return {
            ...state,
            error: action.error
        }
    }

    switch (action.type) {
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: undefined
            }
        default:
            return state;
    }
};

const getError = (state) => {
    return state.app.error;
}

export {
    getError,
    appActions,
    appReducer
};