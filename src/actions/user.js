export const SET_LOGIN = 'SET_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_PROFILE = 'SET_PROFILE';
export const LOGOUT = 'LOGOUT';
export const SET_CARTPOOL = 'SET_CARTPOOL';
export const SET_SHOPSTORE = 'SET_SHOPSTORE';
export const SET_CONTRIBUTION = 'SET_CONTRIBUTION';

export function setLogin(isLogin) {
    return {
        type: SET_LOGIN,
        isLogin: isLogin
    }
}

export function setToken(token) {
    return {
        type: SET_TOKEN,
        token: token
    }
}

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        profile
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export function setCartPool(pool){
    return{
        type: SET_CARTPOOL,
        pool: pool
    }
}

export function setShopStore(shopStore){
    return{
        type: SET_SHOPSTORE,
        shopStore: shopStore
    }
}

export function setContribution(contribution){
    return{
        type: SET_CONTRIBUTION,
        contribution: contribution
    }
}