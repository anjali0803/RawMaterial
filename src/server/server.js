var express = require("express");
 
var app = express();

app.use(express.static('../../build/'));
 
//make way for some custom css, js and images
// app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/js', express.static(__dirname + '/public/js'));
// app.use('/images', express.static(__dirname + '/public/images'));
 
var server = app.listen(3000, function(){
    var port = server.address('0.0.0.0').port;
    console.log("Server started at http://localhost:%s", port);
});