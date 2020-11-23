const log = store => next => action => {
    /* console.log('');
    console.log('log start');
    console.log('ation');
    console.log(action);
    console.log('log end');
    console.log(''); */
    next(action);
}

export default log;