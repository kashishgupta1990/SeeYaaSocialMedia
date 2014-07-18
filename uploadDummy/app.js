var express = require('express'),
    app = express(),
    fs = require('fs');


var bodyParser = require("body-parser");


app.use(bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public/photos' }));
app.use(express.static(__dirname));



var server = app.post('/api/photos', function (req, res) {
    console.log('Upload Server Hit');
    console.log(req.files.image.path);

    fs.readFile(req.files.image.path, function (err, data) {

        console.log(__dirname);
        console.log(__dirname + "/upload");
        var newPath = __dirname + "/upload";

        fs.writeFile(newPath + "/kashish.jpg", data, function (err) {
            if(err){
                console.log(err);
                res.send(err);
            }
            else
            {
                res.send('done');
            }
        });
    });



});

server.listen('4000', function (err) {
    console.log('Server Listining on localhost:4000');
});