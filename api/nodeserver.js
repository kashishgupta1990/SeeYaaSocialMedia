var db = require('./mongoapi.js'),
    config = require('../appConfig.json'),
    mailSender = require('./BulkMailSend.js'),
    express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    keys = require("keygrip")(['a', 'b']),
    cookie = require("cookies").express;


app.use(express.static(path.join(__dirname + "/..", "public")));

//Parsing Body
app.use(bodyParser());

//Active Cookie
app.use(cookie(keys));

//REST API -------------------------------------------------------------------------
//Static index.html Page is Running

//Signup Conformation
app.get('/signupconformation/:id', function (req, res) {

    var id = req.params.id;
    console.log('GET /signupconformation/' + id);
    var obj = {status: true};
    var sentList = [];

    db.updateUser(id, obj, function (err, resutl) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {

            db.getUser({_id: id}, function (err, result) {
                //Sending EmailId And Password Successfully Mail
                sentList.push(result[0].email);

                mailSender.send(config.mail.emailId,
                    config.mail.password,
                    sentList,
                    "Welcome To See Yaa Social Network Site",
                        "Your EmailId: " + result[0].email + " Password: " + obj.password,
                        "Your EmailId: " + result[0].email + " Password: " + obj.password);

                res.send("Your Account Activated Successfully. Please Check Your Mail For ID and Password");
            });


        }
    })
});

//Securing API Request
app.use('/', function (req, res, next) {
    console.log(req.url);

    switch (req.url) {

        //public urls
        case '/css/bootstrap.css.map':
        case '/verifyAccount':
        case '/signuprequest':
        case '/signupconformation/:id':
            console.log('public allowed link');
            next();
            break;

        //secured urls
        default :
            console.log('Secured API links');
            var id = req.cookies.get('_id');

            var obj = {};
            obj["_id"] = id;

            db.getUser(obj, function (err, result) {
                delete result.password;
                if (err) {
                    console.log('error');
                    res.send(err);
                }
                else {
                    if (result.length == 0) {
                        res.send('You need authentication to use this API.')
                    }
                    else {
                        if (result[0]._id == id) {
                            next();
                        }
                        else {
                            res.send('You need authentication to use this API.')
                        }
                    }
                }
            });
    }
});

var server = app.get('/', function (req, res) {
    res.send('API HOME');
});

//SignUp Request Data
app.post('/signuprequest', function (req, res) {
    var obj = req.body;
    obj["status"] = false;
    obj["imgurl"] = "img/find_user.png";
    obj["password"] = +new Date();

    db.insertUser(obj, function (err, data) {
        var sentList = [];
        sentList.push(obj["email"]);
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(data);
            res.send(data);

            db.getUser({email: obj["email"]}, function (err, result) {

                if (err) {
                    res.send(err);
                }
                else {
                    console.log("Me " + result[0]._id);

                    //Sending Conformation Mail
                    mailSender.send(config.mail.emailId,
                        config.mail.password,
                        sentList,
                            "Conformation Mail From See Yaa Social Network Site" +
                            "Please Click the Link Below To Verify your Email Id " +
                            "http://" + config.nodeHost + ":" + config.nodePort + "/signupconformation/" + result[0]._id,
                            "Conformation Mail From See Yaa Social Network Site" +
                            "Please Click the Link Below To Verify your Email Id " +
                            "http://" + config.nodeHost + ":" + config.nodePort + "/signupconformation/" + result[0]._id);
                }
            });
        }
    });
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
                result.password = '';
                var objString = JSON.stringify(result);
                res.send(objString);
            }
        });
    }
    else {
        //All Data

        /*db.getUser(obj, function (err, result) {
         if (err) {
         res.send(err);
         }
         else {
         var objString = JSON.stringify(result);
         res.send(objString);
         }
         });*/
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
    console.log(obj);

    /* fs.readFile(req.files.image.path, function (err, data) {
     console.log(">>" + data);
     });*/

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

//Check EmailId and Password
app.post('/verifyAccount', function (req, res) {
    console.log('POST /verfyAccount');
    var obj = req.body;

    db.getUser(obj, function (err, data) {
        if (err) {
            console.log(err + "Error");
            res.send(err);
        } else {

            if (data.length == 0) {
                res.send('Invalid User')
            }
            else {
                res.cookies.set('_id', data[0]._id, { signed: false, httpOnly: false });
                res.send(data[0]._id);
            }
        }
    });
});


//------------END---------------------------------------------------------
