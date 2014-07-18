var mongoose = require('mongoose'),
    config = require('../appConfig.json');

var Source = mongoose.createConnection(config.dbHost, config.dbName);

Source.on("error", function (err) {
    console.log("Source DB " + err);
});

var UserSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String, unique: true},
    imgurl: {type: String, required: true},
    fullname: String,
    sex: String,
    age: String,
    mobilenumber: String,
    relationship: String,
    status: {type: Boolean, required: Boolean},
    friends: [
        {_id: {type: String, unique: Boolean}, status: Boolean}
    ],
    posts: [
        {datetime: Date, title: String, description: String}
    ]});

var UserModel = Source.model(config.dbCollection, UserSchema);

Source.once("open", function () {
    console.log("Source DB Connected ");
});

module.exports.insertUser =
    function insertUser(UserObject, callback) {
        var obj = new UserModel(UserObject);
        obj.save(function (err) {
            callback(err, "User Saved");
        });
    };

module.exports.getUser =
    function getUser(condition, callback) {
        UserModel.find(condition, {__v: 0}).exec(function (err, result) {
            callback(err, result);
        });
    };

module.exports.deleteUser =
    function deleteUser(id, callback) {
        UserModel.find({_id: id}).remove().exec(function (err) {
            callback(err, "User Deleted");
        })
    };

module.exports.updateUser =
    function updateUser(id, obj, callback) {
        UserModel.update({_id: id}, {$set: obj}, function (err, result) {
            callback(err, "Record Updated " + result);
        })
    };


/*updateUser('53c3a21e499dc7c423e90e02', {
 fullname: "Kashish Kumar Gupta"
 }, function (err, result) {
 console.log(err + result);
 });*/


/*
 deleteUser("53c3a21e499dc7c423e90e02", function (err, result) {
 console.log(result);
 });
 */


/*insertUser({
 username:"kashishgupta1990",
 password:"#sssleelel#",
 imgurl:"/image/profileid.jpg",
 fullname:"Kashish Gupta",
 sex:"M",
 age:"11-Oct-1990",
 mobilenumber:"9999749722",
 relationship:"Single",
 status:true,
 friends:['id1','id2','id3']
 }, function (err, result) {
 console.log(err + result);
 });*/
