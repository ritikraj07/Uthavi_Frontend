import { combineReducers } from 'redux';
import Admin from './Admin';
import Group from './Group';
import Member from './Member';
import Count from './Count';
import BaseUrl from './BaseUrl';
import Loading from './Loading';


const rootReducer = combineReducers({
    Admin: Admin,
    Group: Group,
    Member: Member,
    BaseUrl:BaseUrl,
    Count: Count,
    Loading:Loading
});

export default rootReducer;