var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

var localStrategyConfig = function(){
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password,done){
        //pull from db and check
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('users');
            collection.findOne({
                username: username
            },function(err, results){
                console.log(results);
                if(results && results.password === password){
                    var user = results;
                    done(null,user);
                }else {
                    done(null,false, {message: 'Bad Password'});
                }

            });
        });
    }));

}

module.exports = localStrategyConfig;