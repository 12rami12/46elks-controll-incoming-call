var https = require('https');
var http = require('http');
var querystring = require('querystring');
var prompt = require('prompt')
var stdin = require('stdin')
var readline = require('readline')
var bodyParser = require('body-parser');
var Router = require('node-router');
var rl = readline.createInterface(process.stdin, process.stdout);
var stdin = process.openStdin();

var router = Router();
var route = router.push;

route('POST', bodyParser.urlencoded({extended: false}));
route('/', routeHandler);

var server = http.createServer(router).listen(5673);

function routeHandler(req, res, next) {
  var numberFrom = req.body.from
  console.log(numberFrom, 'ringer')
  if (numberFrom != '+46700000000'){
    var postfields = {
        hangup : 404
        }

    var postData = querystring.stringify(postFields);

    res.write(postData);

  }

}
