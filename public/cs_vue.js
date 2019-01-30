const app = new Vue({
  el: '#app',
  data: {
    running: false,
    players: [],
    demoFiles: []
  },
  methods: {
    init(data) {
      const listener = (event, payload) => {
        console.log(`Event=${event}, Payload=${JSON.stringify(payload)}`)
        if(event === 'listDemoFiles') {
          this.demoFiles = payload;
        }
        if(event === 'end_demo') {
          this.running = false;
        }
        if(event === 'player_joined') {
          this.players = this.players.concat([payload]);
        }
      }
      csgoreader.listener.add(listener);
      csgoreader.commands.listDemoFiles();
    },
    start(file) {
      this.players = [];
      this.running = true;
      csgoreader.commands.start(file);
    }
  },
  mounted() {
    this.init()
  }
})

