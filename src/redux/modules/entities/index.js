import { reducer as comments } from './comments';
import { reducer as products } from './products';
import { reducer as shops } from './shops';
import { reducer as keywords } from './keywords';
import { reducer as orders } from './orders';
import { combineReducers } from 'redux';


export default combineReducers({ comments, products, orders, shops, keywords });