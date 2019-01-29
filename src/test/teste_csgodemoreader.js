const assert = require('assert');

const DemoReader = require('csgodemoreader').Reader;
const UserMessages = require('csgodemoreader').UserMessages;
const Teams = require('csgodemoreader').Teams;
const WeaponTypes = require('csgodemoreader').WeaponTypes;
const fs = require('fs');


describe('csgodemoreader', () => {

  it('test', () => {

    let buffer = fs.readFileSync("..\\demos\\match730_003322927147210768510_1184961054_137.dem");
    let demo = new DemoReader(buffer);

    //Round counter
    demo.on('csgo.round_start', _ => {
      console.log('Round ' + demo.getRound());
    });
    demo.on('csgo.round_end', a => {
      console.log('Winner: ' + (a.winner === 3 ? "TR": "CT"));
    });

    //Listening User Messages
    demo.on('umsg.' + UserMessages.WarmupHasEnded, _ => {
      console.log('Warmup has ended');
    });

    //End of reading demo
    demo.on('end', _ => {

      let scores = demo.getScores();

      for (let team_number in scores) {
        console.log(Teams[team_number] + ': ' + scores[team_number]);
      }

    });

    //Run reader
    demo.run();


  });

});