export function getCookie(cname) {
    // console.log(document.cookie)
    var listCookie = document.cookie.split(';')
    // console.log(listCookie)
    listCookie.forEach(item => {
        const name = item.split('=')[0]
        if(name === cname){
            return true
        }
    })
    return false
}

export function setCookie(cname, cvalue, exdays) {
    var date = new Date()
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + date.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires
}

export function deleteAllCookie() {
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim()
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
}