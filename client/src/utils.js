const serverUrl = process.env.REACT_APP_SERVER_URL || '';

export const getStoreDetails = (requestOptions) => {
    return fetch(`${serverUrl}/details`, requestOptions)
}