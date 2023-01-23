
const DATA_NAME =  'rl_table_data'


const setStorage = data => {
    let dt = JSON.stringify(data)
    sessionStorage.setItem(DATA_NAME, dt);
}

const loadStorage = () => {
    let data = sessionStorage.getItem(DATA_NAME);

    return JSON.parse(data);
}




export {
    setStorage,
    loadStorage,
}