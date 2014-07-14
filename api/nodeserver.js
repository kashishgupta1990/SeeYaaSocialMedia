var db = require('./mongoapi.js'),
    config = require('../appConfig.json'),
    express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname + "/..", "public")));

//Parsing Body
 app.use(bodyParser());


var server = app.get('/', function (req, res) {
    res.send('Welcome To SeeYaa API');
});


//Get User Data
app.get('/user/:id?', function (req, res) {
    var id = req.params.id;
    var obj = {};
    if (id) {
        //Only One Data
        obj['_id'] = id;
        db.getUser(obj, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                var objString = JSON.stringify(result);
                res.send(objString);
            }
        });
    }
    else {
        //All Data
        db.getUser(obj, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                var objString = JSON.stringify(result);
                res.send(objString);
            }
        });
    }
});

//Save User Data
app.post('/user', function (req, res) {
    var obj = req.body;
    db.insertUser(obj, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });

});

//Delete User
app.delete('/user/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    if (id) {
        db.deleteUser(id, function (err, resutl) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(resutl);
            }
        })

    } else {
        res.send("Error: ID is undefined.");
    }
});

//Update User
app.put('/user/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    var obj = req.body;
    if (id) {
        //Only One Data
        db.updateUser(id, obj, function (err, resutl) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(resutl);
                res.send(resutl);
            }
        })
    }
    else {
        res.send("Error: ID is undefine.")
    }
});

//Start Server
server.listen(+config.nodePort, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Listening on Server " + config.nodeHost + " " + config.nodePort);
    }
});
