$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.around(function (callback) {
            if (auth.isAuth()) {
                this.loggedIn = true;
                this.username = sessionStorage.getItem('username');
            }
            if (sessionStorage.getItem('teamId') == 'undefined') {
                this.hasNoTeam = true;
            }
            this.username = sessionStorage.getItem('username');
            callback();
        });

        this.get('#/home', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
            }).then(function () {
                this.partial('templates/home/home.hbs');
            });
        });

        this.get('#/about', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs'
            }).then(function () {
                this.partial('templates/about/about.hbs');
            });
        });

        this.get('#/login', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                loginForm: 'templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('templates/login/loginPage.hbs');
            });
        });

        this.get('#/register', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                registerForm: 'templates/register/registerForm.hbs',
            }).then(function () {
                this.partial('templates/register/registerPage.hbs');
            });
        });

        this.get('#/catalog', function (context) {
            teamsService.loadTeams()
                .then(function (teams) {
                    context.teams = teams;
                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                        team: 'templates/catalog/team.hbs',
                    }).then(function () {
                        this.partial('templates/catalog/teamCatalog.hbs');
                    });
                });
        });

        this.get('#/logout', function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    context.redirect('#/home');
                    auth.showInfo('Logout successful.');
                });
        });

        this.get('#/create', function (context) {
            context.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                createForm: 'templates/create/createForm.hbs',
            }).then(function () {
                this.partial('templates/create/createPage.hbs');
            });
        });

        this.get('#/catalog/:id', function (context) {
            let teamId = context.params.id.substr(1);
            teamsService.loadTeamDetails(teamId)
                .then(function (team) {
                    context.name = team.name;
                    context.comment = team.description;
                    context.teamId = teamId;
                    context.isAuthor = team._acl.creator == sessionStorage.getItem('userId');
                    context.isOnTeam = sessionStorage.getItem('teamId') == teamId;

                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                        teamMember: 'templates/catalog/teamMember.hbs',
                        teamControls: 'templates/catalog/teamControls.hbs',
                    }).then(function () {
                        this.partial('templates/catalog/details.hbs');
                    });

                });
        });

        this.get('#/edit/:id', function (context) {
            let teamId = context.params.id.substr(1);
            teamsService.loadTeamDetails(teamId)
                .then(function (team) {
                    context.name = team.name;
                    context.comment = team.description;
                    context.teamId = teamId;

                    context.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                        editForm: 'templates/edit/editForm.hbs',

                    }).then(function () {
                        this.partial('templates/edit/editPage.hbs');
                    });

                });
        });

        this.get('#/leave', function (context) {
           teamsService.leaveTeam()
               .then(function (userInfo) {
                   auth.saveSession(userInfo);
                   auth.showInfo(`${context.username} has left the team!`);
                   context.redirect('#/catalog');
               });
        });

        this.get('#/join/:id', function (context) {
            let teamId = context.params.id.substr(1);
            teamsService.joinTeam(teamId)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo(`${context.username} has joined team with Id: ${teamId}`);
                    context.redirect('#/catalog');
                });
        })

        this.post('#/login', function (context) {
            let username = context.params.username;
            let password = context.params.password;

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res);
                    context.redirect('#/home');
                    auth.showInfo('Login successful.');
                });
        });

        this.post('#/register', function (context) {
            let username = context.params.username;
            let password = context.params.password;
            let repeatPassword = context.params.repeatPassword;

            if (repeatPassword == password) {
                auth.register(username, password)
                    .then(function (res) {
                        auth.saveSession(res);
                        context.redirect('#/home');
                        auth.showInfo('Registered successfully.');
                    });
            }
            else {
                auth.showError('Passwords do not match!');
            }
        });

        this.post('#/create', function (context) {
            let name = context.params.name;
            let comment = context.params.comment;
            if (sessionStorage.getItem('teamId') == 'undefined') {
                teamsService.createTeam(name, comment)
                    .then(function (team) {
                        auth.showInfo(`${sessionStorage.getItem('username')} has created a new team!`);
                        teamsService.joinTeam(team._id)
                            .then(function (userInfo) {
                                auth.saveSession(userInfo);
                                context.redirect('#/catalog');
                            });
                    });
            }
            else {
                auth.showError('Cannot create a team if you are already in another team!');
            }
        });

        this.post('#/edit/:id', function (context) {
            let teamId = context.params.id.substr(1);
            let name = context.params.name;
            let comment = context.params.comment;
            teamsService.edit(teamId, name, comment)
                .then(function () {
                   context.redirect('#/catalog');
                })
        });
    });

    app.run('#/home');
});