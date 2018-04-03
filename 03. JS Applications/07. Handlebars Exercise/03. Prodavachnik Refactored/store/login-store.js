(function () {
    class Login {
        constructor(viewName, title, id, btnValue) {
            this.viewName = viewName;
            this.title = title;
            this.id = id;
            this.btnValue = btnValue;
        }
    }

    let loginView = new Login('viewLogin', 'Please login','buttonLoginUser', 'Login');
    let registerView = new Login('viewRegister', 'Please register here', 'buttonRegisterUser','Register');

    window.logAndRegView = {loginView, registerView};

})()




