var express = require('express');
var adminRoutes = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'Immortals of Meluha',
        author: 'amish',
        bookId: 7913305
    },
    {
        title: 'The secret of the Nagas',
        author: 'amish'
    },
    {
        title: 'War and Peace',
        author: 'Tolstoy'
    }
];

var router = function(nav) {

    adminRoutes.route('/addBooks')
        .get(function(req,res){
            //add books to db when this route is called
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, result){
                    res.send(result);
                    db.close();
                });
            });
        });

    return adminRoutes;
};

module.exports = router;
