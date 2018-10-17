const apiUrl = 'https://api.imonitorplus.com/api/imonitor';

export const apiServices = {
    login,
    logout,
    register    
};

function login(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/communities/authenticate.json`, requestOptions)
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
}



function register(requestObject) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
    };

    return fetch(`${apiUrl}/communities/signup.json`, requestOptions)
    .then(handleResponse)
    .then(data => {
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