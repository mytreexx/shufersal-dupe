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

export const getCategoriesFromServer = (currentUser) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        }
    };

    return fetch(`${serverUrl}/product/categories`, requestOptions)
}

export const getAllProducts = (currentUser) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        }
    };

    return fetch(`${serverUrl}/product/all`, requestOptions)
}

export const onGetCategoryItems = (currentUser, categoryId) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        },
        body: JSON.stringify({
            categoryId
        }),
    };

    return fetch(`${serverUrl}/product/`, requestOptions)
}

export const getSearchedProducts = (currentUser, searchTerm) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        },
        body: JSON.stringify({
            searchTerm
        }),
    };

    return fetch(`${serverUrl}/product/search`, requestOptions)
}

export const getCartItems = (currentUser) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${currentUser}`
        }
    };

    return fetch(`${serverUrl}/cart`, requestOptions)
}