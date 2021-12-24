var setSessionStorage = function (key, value){
    if (typeof value == "string"){
        sessionStorage.setItem(key, value);
    }else {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

var getSessionStorage = function (key){
    const str = sessionStorage.getItem(key);
    if (typeof str == "string"){
        try{
            return JSON.parse(str);
        }catch (e){
            return str;
        }
    }
    return ;
}

export default {
    setSessionStorage,
    getSessionStorage
}