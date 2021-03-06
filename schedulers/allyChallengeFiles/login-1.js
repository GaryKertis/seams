 /**
 *curl 'https://securebanking.ally.com/IDPProxy/executor/session' -H 'ApplicationName: AOB' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' 
 * -H 'patron-id: olbWeb' -H 'ApplicationId: ALLYUSBOLB'  -H 'Content-Type: application/x-www-form-urlencoded' -H 'ApplicationVersion: 1.0' 
 * --data 'userNamePvtEncrypt=YOURUSERNAME&rememberMeFlag=false&passwordPvtBlock=YOURPASSWORD' --compressed
 *
 * curl 'https://securebanking.ally.com/IDPProxy/executor/session/consents' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' 
 * -H 'Accept: application/json, text/javascript, *\/*; q=0.01' -H 'Cookie: idp-jsessionid=Mmpj8JP6hTNzmBCcY2Qtyk1khD0nF-H-bBMpKyDEYl2S7BbFNlZh!748649212;' 
 * -H 'Connection: keep-alive' -H 'patron-id: olbWeb' -H 'CSRFChallengeToken: 244939929466227007195189140279564179' --compressed -v
 *
 * curl 'https://securebanking.ally.com/IDPProxy/executor/accounts' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' 
 * -H 'Accept: application/json, text/javascript, *\/*; q=0.01' -H 'Cookie: idp-jsessionid=Mmpj8JP6hTNzmBCcY2Qtyk1khD0nF-H-bBMpKyDEYl2S7BbFNlZh!748649212 ' -H 'Connection: keep-alive' 
 * -H 'patron-id: olbWeb' -H 'CSRFChallengeToken: 244939929466227007195189140279564179' --compressed
 *
 * curl 'https://securebanking.ally.com/IDPProxy/executor/accounts/29864092/transactions.csv?patron-id=olbWeb&fromDate=2015-11-01&toDate=2015-12-02&status=Posted' 
 * -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8' -H 'Cache-Control: no-cache' 
 * -H 'Cookie: idp-jsessionid=Mmpj8JP6hTNzmBCcY2Qtyk1khD0nF-H-bBMpKyDEYl2S7BbFNlZh!748649212' --compressed -v
 */

var querystring = require('querystring');
var http = require('https');
var fs = require('fs');
var csvTransformer = require("./lib/csv-transform.js");
var file = "/Users/garykertis/seams-upload/data/data1.csv";
var csv = require('csv');
var mongoose = require('mongoose');
var _ = require("lodash");
mongoose.disconnect(function() {
    mongoose.connect("mongodb://localhost:27017/test");
});
var max = require("./max.js");
var sessioncookie;
var challengetoken;
var accountId;

login()

function login() {
    // Build the post string from an object
    var post_data = process.argv[2];

    // An object of options to indicate where to post to
    var post_options = {
        host: 'securebanking.ally.com',
        port: '443',
        path: '/IDPProxy/executor/session',
        method: 'POST',
        headers: {
            'ApplicationName': 'AOB',
            'patron-id': 'olbWeb',
            'ApplicationId': 'ALLYUSBOLB',
            'ApplicationVersion': '1.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    // Set up the request
    var post_req = http.request(post_options, authenticate);

    // post the data
    post_req.write(post_data);
    post_req.end();

}


function authenticate(res) {
    res.setEncoding('utf8');
    console.log(res.headers);
	var body = "";
    res.on("data", function(chunk){
        body += chunk;
    }).on("end", function(){
        console.log(body);
    })
}

