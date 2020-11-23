const initState = {
    userName: localStorage.getItem('userName') || '',
    password: '',
    error: null,
    isFetching: false,
    state: localStorage.getItem('login') || false
}

const types = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    SET_USERNAME: 'SET_USERNAME',
    SET_PASSWORD: 'SET_PASSWORD',
    LOGOUT: 'LOGOUT'
}

const actions = {
    login: () => {
        return (dispatch, getState) => {
            const userName = getState().login.userName;
            const password = getState().login.password;
            if (!(userName && userName.length > 0 && password && password.length > 0)) {
                return dispatch(innerActions.loginFaile(`请输入用户名和密码`));
            }
            else {
                dispatch(innerActions.loginRequest())
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        localStorage.setItem('userName', userName);
                        localStorage.setItem('login', true);
                        dispatch(innerActions.loginSuccess(userName, password));
                        resolve();
                    }, 100);
                });
            }
        }
    },
    logout: () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('login');
        return {
            type: types.LOGOUT
        }
    },
    setUserName: (text) => ({
        type: types.SET_USERNAME,
        text
    }),
    setPassword: (text) => ({
        type: types.SET_PASSWORD,
        text
    })
}

const innerActions = {
    loginFaile: (error) => ({
        type: types.LOGIN_FAILURE,
        error
    }),
    loginRequest: () => ({
        type: types.LOGIN_REQUEST,
    }),
    loginSuccess: (userName, password) => ({
        type: types.LOGIN_SUCCESS,
        userName,
        password
    })
}

const reducers = (state = initState, action) => {
    switch(action.type){
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                state: true,
                userName: action.userName,
                password: action.password
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case types.LOGOUT:
            return {
                ...state,
                state: false,
                userName: '',
                password: ''
            }
        case types.SET_USERNAME:
            return {
                ...state,
                userName: action.text
            }
        case types.SET_PASSWORD:
            return {
                ...state,
                password: action.text
            }
        default:
            return state;
    }
}

const selectors = {
    getUserName: (state) => {
        return state.login.userName;
    },
    getPassword: (state) => {
        return state.login.password;
    },
    isLogin: (state) => {
        return state.login.state;
    }
}

export {
    actions,
    reducers,
    selectors
}