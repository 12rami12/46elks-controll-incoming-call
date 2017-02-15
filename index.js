var https = require('https');
var querystring = require('querystring');
var prompt = require('prompt')
var stdin = require('stdin')
var readline = require('readline')
var rl = readline.createInterface(process.stdin, process.stdout);
var stdin = process.openStdin();

//Ask what you want to send, and remember your answer
rl.setPrompt('Vad vill du göra\nsms, ringa\n');

rl.prompt()
rl.on('line', function(line) {
if (line == "sms") {
  rl.setPrompt('Vad vill du skicka?\n');

  rl.prompt()
  rl.on('line', function(line) {
    var send = line;
    console.log("skickar: ", send)
    main(send)
    rl.prompt();
  });


  function main(send){
    //Log in to the API
    var username = '<API username>';
    var password = '<API password>';
    //What you want to send to the API
    var postFields = {
      from:    "Mio",
      to:      "+467000000",
      message: send
      }

    var key = new Buffer(username + ':' + password).toString('base64');
    var postData = querystring.stringify(postFields);
    //Find the right place in the API
    var options = {
      hostname: 'api.46elks.com',
      path:     '/a1/SMS',
      method:   'POST',
      headers:  {
        'Authorization': 'Basic ' + key
        }
      };

    var callback = function(response) {
      var str = ''
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        console.log(str);
      });
    }


    var request = https.request(options, callback);


    request.write(postData);


    request.end();
    }
}
else if(line == "ringa"){
  rl.setPrompt('Vem vill du ringa?\n');

  rl.prompt()
  rl.on('line', function(line) {
    var number = line;
    console.log("ringer:", number)
    mian(number)
    rl.prompt();
  });
  function mian(number){
  var username = '<API username>';
  var password = '<API password>';
  var postFields = {
    from:    "+4600000000",
    to:      number,
    voice_start: '{"connect":"+460000000"}',
    whenhangup: ""
    }

  var key = new Buffer(username + ':' + password).toString('base64');
  var postData = querystring.stringify(postFields);
  var options = {
    hostname: 'api.46elks.com',
    path:     '/a1/Calls',
    method:   'POST',
    headers:  {
      'Authorization': 'Basic ' + key
      }
    };

  var request = https.request(options);

  request.write(postData);

  request.end();

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  }
  }
}
});
