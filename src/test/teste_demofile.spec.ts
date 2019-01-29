const assert = require('assert');

const demofile = require("demofile");
const fs = require('fs');

describe('demofile', function() {
  this.timeout(1000000);

  it('test', (done) => {
    let buffer = fs.readFileSync("demos\\match730_003322927147210768510_1184961054_137.dem");

      const demoFile = new demofile.DemoFile();

      demoFile.gameEvents.on("player_death", e => {
        const victim = demoFile.entities.getByUserId(e.userid);
        const victimName = victim ? victim.name : "unnamed";

        // Attacker may have disconnected so be aware.
        // e.g. attacker could have thrown a grenade, disconnected, then that grenade
        // killed another player.
        const attacker = demoFile.entities.getByUserId(e.attacker);
        const attackerName = attacker ? attacker.name : "unnamed";

        const headshotText = e.headshot ? " HS" : "";

        console.log(`${attackerName} [${e.weapon}${headshotText}] ${victimName}`);
      });


    demoFile.on("end", () => {
      console.log("terminou");
      done()
    });

    demoFile.on("progress", (x) => {
      //console.log(x)
    });


    demoFile.entities.on("create", e => {
      // We're only interested in player entities being created.
      if (!e.entity || !e.entity.steamId) {
        return;
      }

      console.log("%s (%s) joined the game", e.entity.name, e.entity.steamId);
    });

    demoFile.parse(buffer);
  });

});


