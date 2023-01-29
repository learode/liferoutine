
/**
 * Store the data with the identifier key in the sessionstorage of the browser.
 * 
 * @param {String} key - the identifier for the stored data
 * @param {{periods: [], days: []}} data - a collection of periods and days 
 */
const setStorage = (key, data) => {
    let dt = JSON.stringify(data)
    sessionStorage.setItem(key, dt);
}

/**
 * Get the stored data with the **key** identifier 
 * 
 * @param {String} key - identifier of stored data
 * @returns {{}} Js Object
 */
const loadStorage = key => {
    let data = sessionStorage.getItem(key);

    return JSON.parse(data);
}

const removeStorage = key => {
    sessionStorage.removeItem(key);
}




export {
    setStorage,
    loadStorage,
    removeStorage,
}