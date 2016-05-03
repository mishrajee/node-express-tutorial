var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var nav = [
    {
        Link : '/Books',
        Text:'Books'
    },
    {
        Link: '/Authors',
        Text: 'Authors'
    }
];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


//public folder will be statically available for all requests
app.use(express.static('public'));
//then for all request ot will look for the file in views

app.use(bodyParser.json());  //create req.body
app.use(bodyParser.urlencoded());
app.use(cookieParser('library'));
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);


//set views to proper directory
app.set('views','./src/views');
app.set('view engine', 'ejs');


app.use('/Books',bookRouter);
app.use('/Admin',adminRouter);
app.use('/Auth',authRouter);

app.get('/',function(req,res){
    res.render('index',{title: 'Hello from ejs',nav:[{Link : '/Books',Text:'Books'},{Link: '/Authors',Text: 'Authors'}]});

});


var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log('listening to port '+port+' ...');
});