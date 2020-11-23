import { get } from '../../utils/request';

const FETCH_DATA = 'FETCH_DATA';

const fetchDataAction = store => next => action => {
    const actionWith = data => {
        let a =  {
            ...action,
            ...data
        }
        delete a[FETCH_DATA];
        return a;
    }
    
    if (action[FETCH_DATA] === undefined) {
        return next(action);
    }
    else {
        const { types, endPoint, schame } = action[FETCH_DATA];
        if (typeof types !== 'object' ||
            typeof types.fetchRequestType !== 'string' ||
            typeof types.fetchSuccessType !== 'string' ||
            typeof types.fetchFailureType !== 'string'
        ) {
            throw new Error(`types 要是一个对象且要有 fetchRequestType，fetchSuccessType，fetchFailureType 字段`);
        }
        if (endPoint === undefined || typeof endPoint !== 'string') {
            throw new Error(`url 一定要有且是一个字符串`);
        }
        if (typeof schame !== 'object' || schame.id === undefined || schame.name === undefined) {
            throw new Error(`schame 要是一个对象且要有 id 和 name 两个字段`);
        }
        if (typeof schame.id !== 'string') {
            throw new Error(`id 一定要有且是一个字符串`);
        }
        if (typeof schame.name !== 'string') {
            throw new Error(`name 一定要有且是一个字符串`);
        }
        next(actionWith({
            type: types.fetchRequestType
        }));
        return get(endPoint).then((data) => {
            const d = normalizeData(data, schame.name, schame.id);
            next(actionWith({
                type: types.fetchSuccessType,
                response: d
            }));
        }).catch((error) => {
            next(actionWith({
                type: types.fetchFailureType,
                error: error.message || '获取信息错误'
            }));
        });
    }
}

const normalizeData = (data, name, id) => {
    let result = {};
    let ids = []
    if (Array.isArray(data)) {
        data.forEach(e => {
            result[e[id]] = e;
            ids.push(e[id]);
        });
    }
    else {
        result[data[id]] = data;
        ids.push(data[id]);
    }
    return {
        [name]: result,
        ids
    }
}

export {
    FETCH_DATA,
    fetchDataAction
}