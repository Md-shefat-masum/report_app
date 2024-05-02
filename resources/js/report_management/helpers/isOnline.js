function isAppOnline() {
    return new Promise((resolve, reject) => {
        fetch('/is-online', {})
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

export default isAppOnline;
