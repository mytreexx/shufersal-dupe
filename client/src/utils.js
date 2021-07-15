const serverUrl = process.env.REACT_APP_SERVER_URL || '';

export const getStoreDetails = (requestOptions) => {
    return fetch(`${serverUrl}/details`, requestOptions)
}

export const checkForRegistration = (requestOptions) => {
    return fetch(`${serverUrl}/register-step-one`, requestOptions)
}

export const completeRegistration = (requestOptions) => {
    return fetch(`${serverUrl}/register-step-two`, requestOptions)
}