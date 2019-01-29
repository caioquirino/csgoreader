const assert = require('assert');

const CsgoDemoReader = require('../main/CsgoDemoReader');

describe('minhaapii', function() {
  this.timeout(1000000);

  it('test', (done) => {

    const file = "..\\demos\\match730_003322927147210768510_1184961054_137.dem";

    const eventListener = (ev, payload) => {
      console.log(`EVENT=${ev}, PAYLOAD=${JSON.stringify(payload)}`)
    }

    const reader = new CsgoDemoReader(eventListener);
    reader.start(file);

  });

});