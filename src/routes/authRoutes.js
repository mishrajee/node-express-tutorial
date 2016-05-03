var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRoutes = express.Router();

var router = function(){
    authRoutes.route('/signUp')
        .post(function(req,res){
            console.log(req.body);
            //save to db (signUp)
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('users');
                var user ={
                    username: req.body.userName,
                    password: req.body.password
                }

                //ideally should check if user is present or not
                collection.insert(user,function(err,results){
                    req.login(results.ops[0],function(){
                        res.redirect('/auth/profile');
                    });

                });
            });


        });

    //authenticate with passport, callback funtion when succeed
    authRoutes.route('/signIn')
        .post(passport.authenticate('local',{
            failureRedirect: '/'
        }), function(req, res){
            res.redirect('/auth/profile');
        });


    authRoutes.route('/profile')
        .all(function(req,res,next){
            //should not reach /profile if user not auth
            if(!req.user){
                res.redirect('/');
            }
            next();
        })
        .get(function(req,res){
            res.json(req.user);
        });
    return authRoutes;

}

module.exports = router;