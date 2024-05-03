function isAppOnline() {
    return new Promise((resolve, reject) => {
        if(navigator.onLine){
            fetch('/is-online', {})
                .then(() => resolve(true))
                .catch(() => resolve(false));
        }else{
            resolve(false)
        }
    });
}

export default isAppOnline;
