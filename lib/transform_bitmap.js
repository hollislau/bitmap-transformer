const fs = require('fs');

var transformBitmap = module.exports = exports = function(file, cb, newFileName) {
  fs.readFile(file, function(err, data) {
    if (err) return console.log(err);
    cb(54, 1077, data);
    fs.writeFile('./test/' + newFileName + '-palette-bitmap.bmp', data);
  });
};

transformBitmap.invert = function(startIndex, finishIndex, data) {
  var num = 1;
  for (var i = startIndex; i < finishIndex; i++) {
    if (num % 4 !== 0) data[i] = 255 - data[i];
    num++;
  }
};
