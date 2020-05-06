import {combineReducers} from 'redux'

import {user} from './user'
import {shoppingCart} from "./shoppingCart";

export default combineReducers({user, shoppingCart})