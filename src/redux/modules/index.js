import { combineReducers } from 'redux';
import entities from './entities';
import { homeReduers as home } from './home';
import { detailReducers as detail } from './detail';
import { reducers as search } from './search';
import { reducers as login } from './login';
import { reducers as user } from './user';
import { reducers as purchase } from './purchase';
import { appReducer as app } from './app';

export default combineReducers({ entities, home, detail, search, login, user, purchase, app });