const handlers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', handlers.homeHandler);


        this.get('#/register', (ctx) => {
           ctx.loadPartials({
               header: 'templates/common/header.hbs',
               footer: 'templates/common/footer.hbs',
               navigation: 'templates/common/navigation.hbs',
           }).then(function () {
              this.partial('templates/forms/register.hbs');
           });
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let pass = ctx.params.pass;
            let repeatPass = ctx.params.repeatPass;

            if(pass != repeatPass){
                alert('Passwords do not match!');
            }
            else{
                auth.register(username, pass);
                ctx.redirect('#/index.html');
            }
        });

        this.get('#/login', function () {
            this.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                navigation: 'templates/common/navigation.hbs',
            }).then(function () {
                this.partial('templates/forms/login.hbs');
            });
        });

       this.post('#/login', (ctx) =>
       {
          let username = ctx.params.username;
          let password = ctx.params.pass;

          auth.login(username, password)
              .then((res) => {
                    auth.saveSession(res);
                    ctx.redirect('#/index.html');
              })
       });





    });

    app.run('#/index.html');
});