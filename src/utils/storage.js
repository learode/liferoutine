
const DATA_NAME =  'rl_table_data'


const setStorage = data => {
    let dt = JSON.stringify(data)
    sessionStorage.setItem(DATA_NAME, dt);
}

const loadStorage = () => {
    let data = sessionStorage.getItem(DATA_NAME);

    return JSON.parse(data);
}

const removeStorage = () => {
    sessionStorage.removeItem(DATA_NAME);
}




export {
    setStorage,
    loadStorage,
    removeStorage,
}