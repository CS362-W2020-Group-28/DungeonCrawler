// var chai = require('chai');
var expect = chai.expect;
// var test = require("../scripts/player.js");
// console.log(test.health);

describe('Player', function() {

  var player = new Player();

  it('health should be 100%', function() {
    expect(player.health).to.equal(50);
  });
});
