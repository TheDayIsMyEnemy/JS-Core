let auth = (() => {

    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(userData) {
        sessionStorage.setItem('authtoken', userData._kmd.authtoken);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('userId', userData._id);
    }
  
    function register(username, password) {
        let data = {username, password};
        remote.post('user','','basic', data)
            .then(saveSession)
            .catch(console.error);
    }

    function login(username, password) {
        let data = {username, password};
        return remote.post('user','login','basic', data);
    }

    function logout() {
        remote.post('user', '_logout', 'kinvey')
            .then(() => sessionStorage.clear())
            .catch(console.error);
    }

    return {
        isAuth,
        saveSession,
        register,
        login,
        logout
    }

})();