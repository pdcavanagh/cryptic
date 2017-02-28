var express = require('express');
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");

var port = process.env.PORT;
if(!port) {
  port=3000;
}

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist'));

app.get('/crypt', function(req, res) {
	console.log('get received')
	//res.send(req.query);
	res.send(encrypt(req.query.message, req.query.key));
	//res.send(Object({'message': res.para}));
});

app.post('/crypt', function(req, res) {
	console.log('POST received')
	console.log(req.body);

	var message = req.body.message;
	var key = req.body.key;
	var encryptFlag = req.body.encrypt;

	console.log(message + " " + key);

	if(encryptFlag === 'on') {
		res.send(encrypt(message, key));		
	} else {
		res.send(decrypt(message, key));
	}

});

app.listen(port, function () {
	console.log('Server running at port ' + port);
});

function encrypt (mes, key) {
	// Encrypt 
	var ciphertext = CryptoJS.AES.encrypt(mes, key);
	console.log(ciphertext.toString());

	var encryptedMes = {
		'message': ciphertext.toString()
	}
	return encryptedMes;
}

function decrypt (mes, key) {
	// Decrypt 
	var bytes  = CryptoJS.AES.decrypt(mes, key);
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);

	var decryptedMes = {
		'message': plaintext
	}
	return decryptedMes;
}
