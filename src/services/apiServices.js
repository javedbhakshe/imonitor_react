import swal from 'sweetalert'
import _ from 'lodash';
import axios from "axios";


// const apiUrl= 'https://api.imonitorplus.com/api/imonitor';
const apiUrl = 'https://uat.imonitorplus.com/service/api';

export const apiServices = {
    login,
    changePassword,
    logout,
    register,
    createCommunity,
    createPreferences,
    cloudinaryUpload,
    updateCommunityLangs,
    addNearme,    
    nearmeList,
    translation
};

function login(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/imonitor/communities/authenticate.json`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.status === 'SUCCESS') {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('community', JSON.stringify(data));
            }

            return data;
        });
}

function changePassword(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/imonitor/communities/um/credentials.json`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.status === 'SUCCESS') {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let communityBO = JSON.parse(localStorage.getItem('community'));                
                communityBO.identityBO.users.firstTimeLogin = false;
                localStorage.setItem('community', JSON.stringify(communityBO));
            }

            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('community');
    window.location.reload(); 
}



function register(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/imonitor/communities/signup.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
         return data;
    });
}

function createCommunity(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/imonitor/communities/_save.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('community', JSON.stringify(data));
            let communityBO = JSON.parse(localStorage.getItem('community'));
            communityBO.community = data.community;
            communityBO.uuidLocales = data.uuidLocales;
            localStorage.setItem('community', JSON.stringify(communityBO));
        }

        return data;
    });
}

function createPreferences(uuid,requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/imonitor/communities/${uuid}/preferences/_save.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           
            // let communityBO = JSON.parse(localStorage.getItem('community'));
            // if(_.isEmpty(communityBO.communityFAQBOs)){
            //     communityBO.communityFAQBOs.push(data);
            // } else{
            //     communityBO.communityFAQBOs[0] = data;
            // }
            // localStorage.setItem('community', JSON.stringify(communityBO));
        }

        return data;
    });
}


function updateCommunityLangs(requestObject){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };
   
    return fetch(`${apiUrl}/creative/translations/save.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('Updated ');
        }

        return data;
    });
}

function addNearme(requestObject){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };
   
    return fetch(`${apiUrl}/ireview/nearme/addNearme.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('Updated ');
        }

        return data;
    });
}

function nearmeList(requestObject){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };
   
    return fetch(`${apiUrl}/creative/nearme/load.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('Updated ');
        }

        return data;
    });
}

function translation(uuid, local){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
   
    return fetch(`${apiUrl}/creative/translations/${uuid}/${local}/IMONITOR/true/load.json`)
    .then(handleResponse)
    .then(data => {
        // login successful if there's a jwt token in the response
        if (data.status === 'SUCCESS') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log('Updated ');
        }

        return data;
    });
}

function cloudinaryUpload(file){

    let communityBO = localStorage.getItem('community');
    let community = JSON.parse(communityBO).community;    
    let cloundName = community.cloudinaryCloudName;
    let cloundPreset = community.cloudinaryPreset;

    const dataForm = new FormData();
        dataForm.append('upload_preset', cloundPreset);
        dataForm.append('file', file);

    const requestOptions = {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: dataForm
    };

    return fetch(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, requestOptions)
    .then(handleResponse)
    .then(data => {       
        return data;
    })
    .catch(data => {
        swal("Cloudinary unauthorised key!", {
            icon: "error",
        });
        return data;
    });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}