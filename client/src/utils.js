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

export const checkForRegistration = (idNumber, email, password, confirmPassword) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idNumber,
            email,
            password,
            confirmPassword
        }),
    };

    return fetch(`${serverUrl}/register-step-one`, requestOptions)
}

export const completeRegistration = (idNumber, email, password, confirmPassword, firstName, lastName, street, city) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idNumber,
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            street,
            city
        }),
    };

    return fetch(`${serverUrl}/register-step-two`, requestOptions)
}

export const getLogin = (idNumber, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            idNumber,
            password
        }),
    };

    return fetch(`${serverUrl}/login`, requestOptions)
}