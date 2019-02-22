import { combineReducers } from 'redux';


const community = (community = null, action) => {
    if(action.type === 'COMMUNITY'){       
        return action.payload;
    } else {    
        return community;
    }
}

export default combineReducers({
    community
})