//var fs = require("fs");
//var data = '';
//
////create a readable stream
//
//var readerStream = fs.createReadStream('input.txt');
//
////set the encoding to be utf8.
//readerStream.setEncoding('UTF8');
//
////Handle stream events --> data, and, and error
//readerStream.on('data', function (chunk) {
//  data += chunk;
//});
//
//readerStream.on('end', function () {
//  console.log(data);
//});
//
//readerStream.on('error', function (err) {
//  console.log(err.stack);
//});
//console.log("Program Ended");

var fs = require("fs");
var data = 'Simply Easy Learning';

var writerStream = fs.createWriteStream('output.txt');

writerStream.write(data, 'UTF8');

writerStream.end();

writerStream.on('finish', function () {
  console.log("Write completed.");
});

writerStream.on('error', function (err) {
  console.log(err.stack);
});

console.log("Program Ended");

var fs = require("fs");
var zlib = require('zlib');
 
//compress the file input.txt to input.txt.gz

fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

console.log("File Compressed");

var fs = require('fs');
var zlib = require('zlib');

//Decompress the file input.txt.gz to input.txt

fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));

console.log("File Decompressed.");