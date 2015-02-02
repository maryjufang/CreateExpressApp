'use strict';
var moment = require('moment');

function UserModel() { }

UserModel.prototype.query = function (req, queryStr, done) {
    req.getConnection(function (err, connection) {
        if (err) {
            done({ err: true, msg: 'database connect error' });
            return;
        }

        connection.query(queryStr, function (error, result, fields) {
            console.log(result);
            done(result);
            //console.log(error);
            //if (error || result[0][0].return_code == 1) {
            //    done([]);
            //} else {
            //    //console.log(result[1]);
            //    done(result[1]);
            //}
        });

    });
};

/*
 * Return list of person object when sid is provided
 */
UserModel.prototype.getUserList = function(req, done) {
    var queryStr = "select * from MaryUserTbl;";
    console.log("queryStr---" + queryStr);
    this.query(req, queryStr, done);
};

// getList, new, edit, delete

module.exports = new UserModel();