import {
    LOGOUT,
    SET_CARTPOOL,
    SET_CONTRIBUTION,
    SET_LOGIN,
    SET_PROFILE,
    SET_SHOPSTORE,
    SET_TOKEN
} from "../actions/user";

const initialState = {
    id:0,
    username: '',
    password: '',
    nickname: '',
    screenName: '',
    contribution: 0,
    role: '',
    pool: '',
    shopStore: '',
    storeName: '',
    token: '',
    isLogin: false
}

export function user(state=initialState,action) {

    switch (action.type) {
        case SET_LOGIN:
            return Object.assign({}, state, {
                isLogin: action.isLogin
            });
        case SET_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            });
        case SET_PROFILE:
            return Object.assign({}, state, {
                id: action.profile.id,
                username: action.profile.email,
                nickname: action.profile.nickname,
                screenName: action.profile.screenName,
                contribution: action.profile.contribution,
                role: action.profile.role,
                pool: action.profile.poolId
            });
        case SET_CARTPOOL:
            return Object.assign({}, state, {
                pool: action.pool
            });
        case SET_SHOPSTORE:
            return Object.assign({}, state, {
                shopStore: action.shopStore.id,
                storeName: action.shopStore.name
            });
        case SET_CONTRIBUTION:
            return Object.assign({}, state, {
                contribution: action.contribution
            });
        case LOGOUT:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}


