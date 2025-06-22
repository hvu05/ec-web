import { URL_USER } from "../constants"

export const get = async(path) => {
    const response = await fetch(URL_USER + path)
    const result = await response.json()
    return result
}
export const post = async(path, option) => {
    const response = await fetch(URL_USER + path, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option)
    })
    const result = await response.json();
    return result;
}

// can add update (patch) from api