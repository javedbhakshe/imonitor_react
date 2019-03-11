import { combineReducers } from 'redux';


const community = (community = null, action) => {
    let communityBO = JSON.parse(localStorage.getItem('community'));
    if(action.type === 'COMMUNITY'){       
        return action.payload;
    } else if(communityBO){
        return communityBO.community;
    }else {    
        return community;
    }
}

const knowledgeData = (knowledge = {}, action) => {
    if(action.type === 'KNOWLEDGE'){       
        return action.payload;
    } else {    
        return knowledge;
    }
}

const activeNearme = (nearme = {}, action) => {
    if(action.type === 'ACTIVE_NEARME'){       
        return action.payload;
    } else {    
        return nearme;
    }
}

export default combineReducers({
    community,
    knowledgeData,
    activeNearme
})