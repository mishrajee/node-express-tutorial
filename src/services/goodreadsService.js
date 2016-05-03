var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});



var goodreadsService = function(){

    //callback cb to call http and when done call cb
    var getBookById = function(id,cb){
        //handle goodread API to get book

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/'+ id +'?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
        };

        var callback = function(response){
            //http response comes in chunks, we need to add them

            var str = '';
            response.on('data',function(chunk){
                str+=chunk;
            });

            response.on('end',function(){
                console.log(str);
                parser.parseString(str,function(err,result){
                    //send book data from result which is in json to callback
                    cb(null,result.GoodreadsResponse.book);
                });
            });
        };



        http.request(options,callback).end();

    };

    return {
        getBookById: getBookById
    };


};

module.exports = goodreadsService;