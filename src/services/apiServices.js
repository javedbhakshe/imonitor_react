import swal from 'sweetalert'

// const apiUrl= 'https://api.imonitorplus.com/api/imonitor';
const apiUrl = 'https://uat.imonitorplus.com/service/api';

export const apiServices = {
    login,
    logout,
    register,
    createCommunity,
    cloudinaryUpload,
    updateCommunityLangs    
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
            localStorage.setItem('community', JSON.stringify(communityBO));
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
    // .then(handleResponse)
    .then(data => {
        if (data.status === 401) {
            swal("Please update cloudinary key!", {
                icon: "error",
            });
        }
        return data;
    });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}