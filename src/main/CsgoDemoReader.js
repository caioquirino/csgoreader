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

    this._demoFile.on("end", e => {
      ev("end_demo", e);

      console.log("Finished.");
    });

    this._demoFile.entities.on("create", e => {
      // We're only interested in player entities being created.
      if (!e.entity || !e.entity.steamId) {
        return;
      }

      ev("player_joined", {name: e.entity.name, steamId: e.entity.steamId});
      console.log("%s (%s) joined the game", e.entity.name, e.entity.steamId);
    });

    this._demoFile.parse(this._buffer);
    console.log("STARTED")
  }
}


module.exports = CsgoDemoReader;