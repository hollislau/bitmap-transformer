const fs = require('fs');

var bitmap = 'palette-bitmap.bmp';

var invertBitmap = function(file) {
  fs.readFile(file, function(err, data) {
    if (err) return console.log(err);
    for (var i = 54; i < 1077; i++) {
      data[i] = 255 - data[i];
    }
    fs.writeFile('inverted-palette-bitmap.bmp', data);
  });
};

invertBitmap(bitmap);
