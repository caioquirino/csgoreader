const demofile = require("demofile");
const fs = require('fs');

class CsgoDemoReader {

  constructor(eventListener) {
    this.eventListener = eventListener
  }


  start(file) {
    this._buffer = fs.readFileSync(`demos\\${file}`);
    this._demoFile = new demofile.DemoFile();
    const ev = this.eventListener
    this._demoFile.gameEvents.on("player_death", e => {
      ev("player_death", e);
    });


    this._demoFile.parse(this._buffer);
    console.log("STARTED")
  }
}


module.exports = CsgoDemoReader;