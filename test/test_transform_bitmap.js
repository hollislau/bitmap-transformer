const expect = require('chai').expect;
const fs = require('fs');

const transformBitmap = require('../lib/transform_bitmap');

describe('creates a new bitmap file with the color inverted', function() {
  var fileData = [];
  var restoredFileData = [];

  before(function(done) {
    transformBitmap(__dirname + '/palette-bitmap.bmp', transformBitmap.invert, 'new');
    transformBitmap(__dirname + '/new-palette-bitmap.bmp', transformBitmap.invert, 'restored');
    transformBitmap(__dirname + '/palette-bitmap.bmp', transformBitmap.grayScale, 'gray');
    fs.readFile(__dirname + '/palette-bitmap.bmp', function(err, data) {
      if(err) console.log(err);
      fileData.push(data.toString());
      fs.readFile(__dirname + '/restored-palette-bitmap.bmp', function(err, bitmapData) {
        if(err) console.log(err);
        restoredFileData.push(bitmapData.toString());
        done();
      });
    });
  });

  it('the restored bitmap image should match the original bitmap image', function(done) {
    expect(fileData.length).to.eql(1);
    expect(restoredFileData.length).to.eql(1);
    expect(fileData).to.eql(restoredFileData);
    done();
  });
});
