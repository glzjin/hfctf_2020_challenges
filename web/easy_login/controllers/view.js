module.exports = {
    'GET /': async (ctx, next) => {
        ctx.status = 302;
        ctx.redirect('/home');
    },
    'GET /login': async (ctx, next) => {
        if(ctx.session.username) {
            ctx.status = 302;
            await ctx.redirect('/home');
        } else {
            await ctx.render('login');
            await next();
        }
    },
    'GET /register': async (ctx, next) => {
        if(ctx.session.username) {
            ctx.status = 302;
            await ctx.redirect('/home');
        } else {
            await ctx.render('register');
            await next();
        }
    },
    'GET /home': async (ctx, next) => {
        if(!ctx.session.username) {
            ctx.status = 302;
            await ctx.redirect('/login');
        } else {
            await ctx.render('home', {
                username: ctx.session.username,
            });
            await next();
        }
    }
};