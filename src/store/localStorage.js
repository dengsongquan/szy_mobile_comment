var setLocalStorage = function (key, value){
    if (typeof value == "string"){
        localStorage.setItem(key ,value);
    }else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

var getLocalStorage = function (key){
    const str = localStorage.getItem(key);
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
    setLocalStorage,
    getLocalStorage
}