const app = new Vue({
  el: '#app',
  data: {
    players: [],
    demoFiles: []
  },
  methods: {
    init(data) {
      const listener = (event, payload) => {
        console.log(`Event=${event}, Payload=${JSON.stringify(payload)}`)
        if(event === 'listDemoFiles') {
          this.demoFiles = payload
        }
      }
      csgoreader.listener.add(listener);
      csgoreader.commands.listDemoFiles();
    }
  },
  mounted() {
    this.init()
  }
})

