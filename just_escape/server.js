const express = require('express');
const app = express();
const {VM} = require('vm2');

const error = `
<pre style="font-family:'courier new', typewriter, matrix, monospace;">
┌─────────────────────────────────────────────────────────────┐
│┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\\ │\`~ ││
│├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
│├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
│├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
│└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
│      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
│      └───┴─────┴───────────────────────┴─────┴───┘          │
└─────────────────────────────────────────────────────────────┘
               Happy Hacking       auto coding
</pre>
`;


app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/index.php', function(req, res) {
    res.sendFile( __dirname + "/" + "php.html" );
});

app.get('/run.php',function(req,res){
    const code = req.query.code;

    try{
        if(!code) {
            res.sendFile( __dirname + "/" + "php.html" );
            return;
        }

        const blacklists = ['for', 'while', 'process', 'exec', 'eval', 'constructor', 'prototype', 'Function', '+', '"','\''];

        if(blacklists.map(v=>code.includes(v)).filter(v=>v).length !== 0) {
            res.send(error);
            return;
        }

        const result = new VM().run(code);

        res.send(result.toString());
    } catch(ex) {
        res.send(ex.toString());
    }

});

const server = app.listen(3000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
});
