const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then((response) => {
        return handleRespose(response, url);
    }).catch((err) => {
        console.error(`request fail: url: ${url} Message: ${err}`);
        return Promise.reject({
            error: {
                message: `request fail: url: ${url} Message: ${err}`
            }
        })
    })
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        body: data,
        headers: headers
    }).then((response) => {
        return handleRespose(response, url);
    }).catch((err) => {
        console.error(`request fail: url: ${url} Message: ${err}`);
        return Promise.reject({
            error: {
                message: `request fail: url: ${url} Message: ${err}`
            }
        })
    })
}

function handleRespose(response, url) {
    if (response.status === 200) {
        return Promise.resolve(response.json());
    }
    else {
        console.error(`request fail: status: ${response.status} url: ${url} Due to server`);
        return Promise.reject({
            error: {
                message: `request fail: status: ${response.status} url: ${url} Due to server`
            }
        })
    }
}

export {
    get,
    post
};