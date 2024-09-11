export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET: 'SET',
};

export const initialState = {
    username: null,
    isLoggedIn: false,
    error: null,
};

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload.username,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                username: null,
            };
        case actionTypes.SET:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
