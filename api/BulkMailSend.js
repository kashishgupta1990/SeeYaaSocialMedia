exports = module.exports = (function () {
    var nodemailer = require('nodemailer'),
        async = require('async');

    var createMailOption = function (fromEmail, toEmail, Subject, Text, HTML) {
        return{ from: fromEmail,
            to: toEmail,
            subject: Subject,
            text: Text,
            html: HTML};
    };

    var init = function (emailId, Password, SendTo, Subject, Text, Html) {
        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: emailId,
                pass: Password
            }
        });

        var task = [];

        for (var x in SendTo) {
            task.push(
                (function (SSEND) {
                    return function (callback) {
                        smtpTransport.sendMail(createMailOption(emailId, SSEND, Subject, Text, Html), function (error, response) {
                            callback(error, response);
                        });
                    }
                })(SendTo[x]));
        }

        async.parallel(task, function (err, result) {
            console.log("Bulk Module " + err);
            console.log(result);
        })

    };

    return {
        send: init
    };

})();


