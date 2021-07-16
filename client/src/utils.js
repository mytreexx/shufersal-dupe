const serverUrl = process.env.REACT_APP_SERVER_URL || '';

export const getStoreDetails = (currentUser) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        }
    };
    
    return fetch(`${serverUrl}/details`, requestOptions)
}

export const checkForRegistration = (requestOptions) => {
    return fetch(`${serverUrl}/register-step-one`, requestOptions)
}

export const completeRegistration = (requestOptions) => {
    return fetch(`${serverUrl}/register-step-two`, requestOptions)
}

export const getLogin = (requestOptions) => {
    return fetch(`${serverUrl}/login`, requestOptions)
}