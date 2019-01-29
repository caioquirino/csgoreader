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
      }
      csgoreader.listener.add(listener);
      csgoreader.commands.listDemoFiles();
    },
    start(file) {
      this.running = true;
      csgoreader.commands.start(file);
    }
  },
  mounted() {
    this.init()
  }
})

