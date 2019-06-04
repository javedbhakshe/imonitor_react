import React, {useState, useEffect} from 'react';
import _ from 'lodash';

let communityBO = {};
let uuid = null;

const communityBOData = () => {
    communityBO = localStorage.getItem('community') ? JSON.parse(localStorage.getItem('community')) : {};
    uuid =  communityBO ? communityBO.community.uuid : null;
}

/**
 * get a community details
 * @returns {object} community object represents community information
 */
const getCommunity = () => {   

    communityBOData();
    let community= {};
    if(!_.isEmpty(communityBO.community)){
        community =communityBO.community;
    } 
    return community;
}

/**
 * get a community preference BO
 * @returns {object} community object represents community preference
 */
const getCommunityPreferenceBOs = () => {   
    communityBOData();
    let community= {};
    if(!_.isEmpty(communityBO.communityPreferenceBOs)){
        community = communityBO.communityPreferenceBOs;
    }
    return community;
}

/**
 * get a community faq BO
 * @returns {object} community object represents community faq
 */
const communityFAQPages = () => {   
    communityBOData();
    let community= [];
    if(!_.isEmpty(communityBO.communityFAQBOs)){
        _.forEach(communityBO.communityFAQBOs, (value) => {
            if(value.communityPreferences.code !== 'knowledge'){
                community.push(value);
            }
        });
    }
    return community;
}

/**
 * get a language list details
 * @returns {Array} language array represents language information
 */
const getLanguageList = () => {   
    communityBOData();
    let language = [];
    if(!_.isEmpty(communityBO.uuidLocales)){
        const aLanguageList = communityBO.uuidLocales[uuid] ? communityBO.uuidLocales[uuid] : [];
        for(let i in aLanguageList){
            if(aLanguageList[i].locale === 'en_US'){
                let oEle = aLanguageList.splice(i,1)[0];
                aLanguageList.unshift(oEle);
                break;
            }
        }  
        language = aLanguageList;      
    }       
    return language;
}


export {
    getCommunity,
    getCommunityPreferenceBOs,
    getLanguageList,
    communityFAQPages
};