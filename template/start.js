var cp = require('child_process');
// if you encounter a child_process error, make sure that grunt cli is installed.
var grunt = cp.spawn('grunt', ['--force', 'default', 'watch'])

grunt.stdout.on('data', function(data) {
	// relay output to console
	console.log("%s", data)
});

const opn = require('opn');

var express = require('express');

var path = require('path');

var app = express()

app.use(express.logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

opn('http://localhost:3000');

app.listen(3000);
