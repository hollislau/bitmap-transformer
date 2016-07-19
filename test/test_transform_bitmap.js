const expect = require('chai').expect;
const fs = require('fs');

const transformBitmap = require('../lib/transform_bitmap');

describe('creates a new bitmap file with the color inverted', function() {
  var colorOne = [];
  var colorNew = [];
  var colorRestore = [];

  before(function(done) {
    transformBitmap(__dirname + '/palette-bitmap.bmp', transformBitmap.invert, 'new');
    transformBitmap(__dirname + '/new-palette-bitmap.bmp', transformBitmap.invert, 'restored');
    fs.readFile(__dirname + '/palette-bitmap.bmp', function(err, data) {
      if(err) console.log(err);
      colorOne[0] = data[54];
      colorOne[1] = data[55];
      colorOne[2] = data[56];
      colorOne[3] = data[57];
      fs.readFile(__dirname + '/new-palette-bitmap.bmp', function(err, data) {
        if(err) console.log(err);
        colorNew[0] = data[54];
        colorNew[1] = data[55];
        colorNew[2] = data[56];
        colorNew[3] = data[57];
        fs.readFile(__dirname + '/restored-palette-bitmap.bmp', function(err, bitmapData) {
          if(err) console.log(err);
          colorRestore[0] = bitmapData[54];
          colorRestore[1] = bitmapData[55];
          colorRestore[2] = bitmapData[56];
          colorRestore[3] = bitmapData[57];
          done();
        });
      });
    });
  });

  it('the restored bitmap image should match the original bitmap image', function(done) {
    for (var i = 0; i < 3; i++) {
      expect(colorOne[i]).to.eql(colorRestore[i]);
      expect(colorNew[i]).to.eql(255 - colorOne[i]);
    }
    expect(colorOne[3]).to.eql(colorNew[3]).to.eql(colorRestore[3]);
    done();
  });
});
