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

export default combineReducers({
    community,
    knowledgeData
})